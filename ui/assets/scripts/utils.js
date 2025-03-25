import { footer_templ, login_form, logo_templ } from "./Templates.js"
import { setupLOgin, LogOUt } from "./login.js"

export const Domain = 'learn.zone01oujda.ma'
const main = document.querySelector('main')
const footer = document.querySelector('footer')

// ----------------- alert_popup func-----------------
export function getCurrentYearAsMax() {
    const currentYear = new Date().getFullYear();
    document.querySelector('footer').innerHTML = footer_templ
    const footer = document.querySelector(".footer-content");
    footer.innerHTML = `
    <p>&copy;${currentYear} 01Oujda-GraphQL | Crafted with ❤ by
    <a href="https://learn.zone01oujda.ma/git/izahid">izahid</a>. All Rights Reserved.</p>
    `
}

// ----------------- injectFooter func-----------------
const injectFooter = () => {
    footer.innerHTML = ''
    getCurrentYearAsMax()
}

const injectLOgo = () => {
    const global = document.querySelector('.grid-container')
    const graphImgDiv = document.createElement('div')
    graphImgDiv.className = 'graph-img'
    graphImgDiv.innerHTML = '<img src="assets/img/graphql-opened.svg" alt="GraphQL Logo">'
    global.insertBefore(graphImgDiv, global.firstChild);
}

// ----------------- mainContent func-----------------
const mainContent = () => {
    main.innerHTML = login_form
    setupLOgin()
}

// ----------------- renderHome func-----------------
const renderHome = () => {
    const logo_img = document.querySelector('.graph-img')
    if (logo_img) {
        logo_img.remove()
    }
    main.innerHTML = `<h1>You are successfully authenticated</h1>
    <button class="logout-btn">Logout</button>
    `
    document.querySelector('.logout-btn').addEventListener('click', (e) => LogOUt(e))
}

// ----------------- renderError func-----------------
const renderError = (err) => {
    main.innerHTML = `Ooops, ERROR in ${err}`
}

// ----------------- renderLOgin func-----------------
const renderLOgin = () => {
    injectFooter()
    injectLOgo()
    mainContent()
    // setupLOgin()
}

// ----------------- routing func-----------------
export const routing = (template) => {
    switch (template) {
        case ('home'):
            // renderHome()
            renderHome()
            break
        case ('error'):
            renderError()
            break
        case ('login'):
            renderLOgin()
            // injectLOgo()
            togleINputs()
    }
}

// ----------------- displayERror func-----------------
export const displayERror = (error) => {
    console.log('test error', error)
    document.getElementById('identifier').value = '';
    document.getElementById('password').value = '';
    const loginForm = document.querySelector('#login-form')
    const err = document.querySelector('.error-message')
    if (err) {
        err.remove()
    }
    const errorDiv = document.createElement('div')
    errorDiv.className = 'error-message'
    errorDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${error}`
    loginForm.insertBefore(errorDiv, loginForm.querySelector('#loginButton'))
}

// ----------------- alert_popup func-----------------
export const alert_popup = (alertSetting) => {
    const popup_chat = document.querySelector(`.box`)
    const popup_alert = document.querySelector(`.error-box`)
    popup_alert.style.display = 'flex';
    popup_alert.innerHTML = alert_tmpl
    document.querySelector('.err-mssg').innerHTML = `${alertSetting.errMssg}`
}

// ----------------- togleINputs func-----------------
export const togleINputs = () => {
    const inputs = document.querySelectorAll(".input");
    const toggleIcon = document.querySelector(".show-hide")
    function addcl() {
        let parent = this.parentNode.parentNode;
        parent.classList.add("focus");
    }

    function remcl() {
        let parent = this.parentNode.parentNode;
        if (this.value == "") {
            parent.classList.remove("focus");
        }
    }

    inputs.forEach(input => {
        input.addEventListener("focus", addcl);
        input.addEventListener("blur", remcl);
    });
}