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
      <!-- Top Row -->
      <div class="dashboard-row">

        <!-- Stats Summary Card -->

        <!-- Activity Card -->
        <div class="dashboard-card activity">
        
          <h3>XP progression</h3>
          <div class="activity-tabs">
            <button class="active">XP growth per day</button>
          </div>

          <!--  <svg id="histogram" width="400" height="400" viewBox="0 0 600 400">-->
<!-- <svg id="xp-graph" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" width="100%">
  <line x1="50" y1="350" x2="700" y2="350" stroke="black" stroke-width="2"/> <!-- X-awxis -->
  <line x1="50" y1="350" x2="50" y2="10" stroke="black" stroke-width="2"/> <!-- Y-axis -->
  
  <!-- <text x="300" y="390" text-anchor="middle">X-axis</text>-->
  <!-- <text x="20" y="200" text-anchor="middle" transform="rotate(-90, 20, 200)">Y-axis</text> -->
  
  <!-- الأعمدة ستضاف هنا عبر JavaScript -->
 <!-- </svg> -->


<div class="xp-graph-container">
  <div class="graph-legend">
    <span class="you"></span>
  </div>
  <div class="graph-area" id="xp-graph"></div>

</div>


        </div>

      </div>
      
      <!-- Bottom Row -->
      <div class="dashboard-row">
        <!-- Analytics Card -->
        <div class="dashboard-card analytics">
          <h3>Technical skills</h3>

        <div class="svg-container">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <g id="bar-chart"></g>
        </svg>
    </div>
          <!--<table class="expenses-table">
            <tr>
              <td>Home</td>
              <td>$250</td>
            </tr>
            <tr>
              <td>Food</td>
              <td>$215</td>
            </tr>
            <tr>
              <td>Car</td>
              <td>$100</td>
            </tr>
            <tr>
              <td>Entertainment</td>
              <td>$370</td>
            </tr>
            <tr>
              <td>Beauty</td>
              <td>$115</td>
            </tr>
          </table> -->
        </div>
        
        <!-- Statistics Card -->
        <div class="dashboard-card statistics">
          <h3>Technologies</h3>
              <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
        <!-- Define the center and radius -->
        <g transform="translate(250, 250)" id="radar-chart">
            <!-- Background circles (for reference, like in the image) -->
            <circle cx="0" cy="0" r="40" fill="none" stroke="#444" stroke-width="1" />
            <circle cx="0" cy="0" r="80" fill="none" stroke="#444" stroke-width="1" />
            <circle cx="0" cy="0" r="120" fill="none" stroke="#444" stroke-width="1" />
            <circle cx="0" cy="0" r="160" fill="none" stroke="#444" stroke-width="1" />
            <circle cx="0" cy="0" r="200" fill="none" stroke="#444" stroke-width="1" />
        </g>
    </svg>
          <!--<div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">$10,000</span>
              <div class="stat-bar" style="height: 80%"></div>
            </div>
            <div class="stat-item">
              <span class="stat-value">$10,010</span>
              <div class="stat-bar" style="height: 65%"></div>
            </div>
            <div class="stat-item">
              <span class="stat-value">$10,011</span>
              <div class="stat-bar" style="height: 50%"></div>
            </div>
            <div class="stat-item">
              <span class="stat-value">$10,012</span>
              <div class="stat-bar" style="height: 30%"></div>
            </div>
          </div>
          <div class="months-axis">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
            <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
            <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
          <div class="progress-container">
            <h4>December income plan</h4>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 89%"></div>
            </div>
            <span class="progress-percent">89%</span>
          </div>-->
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


