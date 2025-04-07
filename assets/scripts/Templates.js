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

export const injectNav = () => {
  const gridContainer = document.querySelector('.grid-container')
  const main = document.querySelector('main')
  const nav = document.createElement('nav')
  nav.innerHTML = `<div class="nav-left">
    <button class="nav-home"><img src="assets/img/logo.png" alt="">-Oujda</button>
    <button class="nav-about">Gitea</button>
    </div>
    <div class="nav-right">
    <button class="nav-log">Log Out</button>
    </div>`
  gridContainer.insertBefore(nav, main)
}

const stat = [
  { type: 'total', label: 'TOTAL XP', value: '676.3 KB' },
  { type: 'audit', label: 'Audit Ratio', value: '1.5' },
  { type: 'project', label: 'PROJECTS', value: '28' },
  { type: 'level', label: 'LEVEL', value: '25' }
]

export const createStatsCard = () => {
  const dashboardRows = document.querySelectorAll('.dashboard-row')
  const card = document.createElement('div')
  card.className = `dashboard-card user-stats`
  stat.forEach(elem => {
    const section = document.createElement('div')
    section.className = `section ${elem.type}`

    const content = document.createElement('div')
    content.className = 'content'

    const label = document.createElement('strong')
    label.textContent = elem.label

    const value = document.createElement('span')
    // value.textContent = elem.value

    content.append(label)
    content.append(value)
    section.append(content)
    card.append(section)
  })
  dashboardRows[0].prepend(card)
}

export const buildDashboard = () => {
  const main = document.querySelector('.profile main')
  main.innerHTML = `
    <div class="wlcom-section"></div>
    <div class="dashboard">
        <!-- 1st Row -->
        <div class="dashboard-row">

            <!-- Activity Card -->
            <div class="dashboard-card activity">
                <h3>XP progression</h3>
                <div class="activity-tabs">
                    <button class="active">XP growth per day</button>
                </div>

                <div class="xp-graph-container">
                    <div class="graph-legend">
                        <span class="you"></span>
                    </div>
                    <div class="graph-area" id="xp-graph"></div>
                </div>
            </div>

        </div>

        <!-- 2nd Row -->
        <div class="dashboard-row">

            <!-- Analytics Card -->
            <div class="dashboard-card analytics">
                <h3>Technical skills</h3>
                <div class="svg-container">
                    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                        <g id="bar-chart"></g>
                    </svg>
                </div>
            </div>

            <!-- Statistics Card -->
            <div class="dashboard-card statistics">
                <h3>Technologies</h3>
                <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
                    <!-- Define the center and radius -->
                    <g transform="translate(250, 250)" id="radar-chart">
                        <!-- Background circles (for reference, like in the image) -->
                        <!--<circle cx="0" cy="0" r="40" fill="none" stroke="#444" stroke-width="1" />
                        <circle cx="0" cy="0" r="80" fill="none" stroke="#444" stroke-width="1" />
                        <circle cx="0" cy="0" r="120" fill="none" stroke="#444" stroke-width="1" />
                        <circle cx="0" cy="0" r="160" fill="none" stroke="#444" stroke-width="1" />
                        <circle cx="0" cy="0" r="200" fill="none" stroke="#444" stroke-width="1" />-->
                    </g>
                </svg>
            </div>

        </div>
    </div>
  `

  // Call this after login success or when building the dashboard
  generateChartBars()
}

// Helper function to generate random chart bars
const generateChartBars = () => {
  // const barsContainer = document.querySelector('.chart-bars')
  // const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  // const heights = [85, 60, 75, 40, 65, 30, 50] // percentages

  // barsContainer.innerHTML = days.map((day, i) =>
  //   `<div class="chart-bar" style="height: ${heights[i]}%" data-day="${day}"></div>`
  // ).join('')
}


