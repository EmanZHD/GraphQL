import { routing } from "./utils.js"
import { verifyJWT } from "./login.js"



// -------------- initializeApp func --------------
const initializeApp = async () => {
    const isAuthenticated = await verifyJWT()
    routing(isAuthenticated ? "home" : "login")
}

document.addEventListener("DOMContentLoaded", initializeApp)
