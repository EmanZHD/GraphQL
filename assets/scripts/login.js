import { routing, displayERror, Domain } from "./utils.js"

const credentials = {}

// -------------- verifyJWT func --------------
export const verifyJWT = async () => {
    const tocken = localStorage.getItem("tocken")
    // console.log('tocken =>', tocken)
    if (!tocken) return false
    try {
        const response = await fetch(`https://${Domain}/api/graphql-engine/v1/graphql`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tocken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `{
                        user {
                            id
                        }
                    }`
                })

            })
        if (!response.ok) {
            throw new Error('JWT verification failed')
        }
        return true
    } catch (error) {
        return false
    }
}

// -------------- setupLOgin func --------------
export const setupLOgin = () => {
    const loginForm = document.querySelector('#login-form')
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault()
            const formData = new FormData(event.target)
            credentials.username = formData.get('identifier')
            credentials.passwd = formData.get('password')

            if (!credentials.username || !credentials.passwd) {
                displayERror('Please enter both username and password`')
                return
            }
            try {
                await verifyCredentials();
            } catch (error) {
                // renderError(error.message || 'Login failed');
                // console.log('yyyy', error.error)
                displayERror(error.error[0])
                return
            }
        })
    }
}

// -------------- verifyCredentials func --------------
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
            displayERror(errorData.error)
            return
        }
        const data = await response.json()
        localStorage.setItem('tocken', data)
        routing("home")
    } catch (error) {
        displayERror('Invalid credentials---')
        return
    }
}

// -------------- LogOUt func --------------
export const LogOUt = (e) => {
    const nav = document.querySelector('nav')
    e.preventDefault()
    localStorage.removeItem('tocken')
    if (nav) { nav.remove() }
    routing('login')
}
