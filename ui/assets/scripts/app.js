import { routing } from "./utils.js"
import { verifyJWT } from "./login.js"



// -------------- initializeApp func --------------
const initializeApp = async () => {
    const isAuthenticated = await verifyJWT()
    console.log('isAUthenti', isAuthenticated)
    routing(isAuthenticated ? "home" : "login")
}

document.addEventListener("DOMContentLoaded", initializeApp)
