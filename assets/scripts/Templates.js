export const login_form = `
            <form id="login-form">
                <h2 class="title">
                    <div class="logo-container">
                        <img src="assets/img/logo.png" alt="">
                        <span>Oujda-Gph</span>
                    </div>
                </h2>

                <!-- Login welcom -->
                <div class="login-welcome">
                    <span class="line"></span>
                    <p>Login to your account</p>
                    <span class="line"></span>
                </div>
                <!-- Input Username -->
                <div class="input-div first">
                    <div class="icon">
                        <i class="fa-regular fa-user"></i>
                    </div>
                    <div class="username">
                        <h5>Email or Username</h5>
                        <input type="text" class="input" id="identifier" name="identifier" required>
                    </div>
                </div>
                <!-- Input Password -->
                <div class="input-div second">
                    <div class="icon">
                        <i class="fas fa-lock"></i>
                    </div>
                    <div class="pass">
                        <h5>Password</h5>
                        <input type="password" class="input" id="password" name="password" required>
                    </div>
                    <div class="show-hide">
                        <i class="fas fa-eye-slash"></i>
                    </div>
                </div>

    <button type="submit" class="btn" id="loginButton">
        <span class="btn-text">Login</span>
        <span class="spinner hidden" id="spinner"></span>
    </button>
                <!-- <input type="submit" class="btn" value="Login"> -->
            </form>
`
export const footer_templ = `
    <div class="footer-content"></div>
`
export const logo_templ = `
        <div class="graph-img">
            <img src="assets/img/graphql-opened.svg" alt="">
        </div>
`