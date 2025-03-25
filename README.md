import { login_form } from "./Templates.js"
import { getCurrentYearAsMax, routing } from "./utils.js"

const Domain = 'learn.zone01oujda.ma';
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const credentials = {};

// DOM Content Setup
const mainContent = () => {
    main.innerHTML = login_form;
    setupLoginForm();
};

const injectFooter = () => {
    footer.innerHTML = '';
    getCurrentYearAsMax();
};

// Page Rendering
export const renderLOgin = () => {
    mainContent();
    injectFooter();
};

export const renderHome = () => {
    let tocken = localStorage.getItem("tocken")
    let query = `
    {
   user{
    lastName
    firstName
  }
}`
    fetch(`https://${Domain}/api/graphql-engine/v1/graphql`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${tocken}`
        },
        body: JSON.stringify({ query })
    }).then(res => {
        return res.json()
    })
        .then(data => {

            if (data.error) throw data.error
            // profileName.textContent = data.data.user[0].lastName + " " + data.data.user[0].firstName
            console.log('----------->', data)
            main.innerHTML = `
            <div class="welcome-container">
                <h1>Welcome! ${data.data.user[0].lastName} ${data.data.user[0].firstName}
    } </h1>
                <p>You are successfully authenticated.</p>
                <button id="logout-btn" class="btn">Logout</button>
            </div>
        `;
            document.getElementById('logout-btn').addEventListener('click', logout);
        })
        .catch(err => {
            console.error(err)
        })

};
export const renderError = (message) => {
    main.innerHTML = `
        <div class="error-container">
            <h2>Error</h2>
            <p>${message}</p>
            <button id="retry-btn" class="btn">Try Again</button>
        </div>
    `;
    document.getElementById('retry-btn').addEventListener('click', renderLOgin);
};

// Authentication Functions
const setupLoginForm = () => {
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);

            credentials.username = formData.get('identifier');
            credentials.passwd = formData.get('password');

            if (!credentials.username || !credentials.passwd) {
                renderError('Please enter both username and password');
                return;
            }

            try {
                await verifyCredentials();
            } catch (error) {
                renderError(error.message || 'Login failed');
            }
        });
    }
};

const verifyCredentials = async () => {
    try {
        const response = await fetch(`https://${Domain}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.passwd}`),
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid credentials');
        }

        const data = await response.json();
        console.log('data=>', data)
        localStorage.setItem('tocken', data);
        routing("home");
    } catch (error) {
        throw error;
    }
};

const verifyJWT = () => {
    const tocken = localStorage.getItem('tocken');
    // if (!tocken) return false;
    let query = `
    {
  user {
    id
  }
}`
    fetch(`https://${Domain}/api/graphql-engine/v1/graphql`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${tocken}`
        },
        body: JSON.stringify({ query })
    }).then(res => res.json())
        .then(data => {
            if (data.errors) throw data.errors[0]
            if (data.data.user.length > 0 && data.data.user[0].id) {
                console.log('test')
                return true
            }
        }).catch(() => {
            return false
        })
    // let query = `{
    //     user {
    //         id
    //     }
    // }`
    // try {
    //     const response = await fetch(`https://${Domain}/api/graphql-engine/v1/graphql`, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${tocken}`,
    //             // 'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ query })
    //     });
    //     if (!response.ok) {
    //         console.log('JWTverif00')
    //         throw new Error('JWT verification failed');
    //         return false
    //     }
    //     const data = await response.json();
    //     console.log('JWTverif01=>', data)
    //     return true;
    // } catch (error) {
    //     return false;
    // }
};

const logout = () => {
    localStorage.removeItem('tocken');
    routing("login");
};

// Authorization Flow
const authorization = () => {
    const isAuthenticated = verifyJWT();
    routing(isAuthenticated ? "home" : "login");
};

// Initialize App
const initializeApp = () => {
    authorization();
};

document.addEventListener("DOMContentLoaded", initializeApp);
// const initializeApp = () => {
//     // verifyJWT()
//     authorization()
//     verifyCredentials()
// } 