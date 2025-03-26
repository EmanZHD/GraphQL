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

export const buildDashboard = () => {
    const main = document.querySelector('.profile main');
    main.innerHTML = `
    <div class="dashboard">
      <!-- Top Row -->
      <div class="dashboard-row">
        <!-- Income Summary Card -->
<div class="dashboard-card income-summary">
  <div class="section total">
    <div class="vertical-text">
      <strong>TOTAL</strong>
      <span>676.3 KB</span>
      <span></span>
    </div>
  </div>
  <div class="section audit">
    <div class="vertical-text">
      <strong>AUDIT</strong>
      <span>RATIO 1.5</span>
    </div>
  </div>
  <div class="section project">
    <div class="vertical-text">
      <strong>PROJECTS</strong>
      <span>28</span>
    </div>
  </div>
  <div class="section level">
    <div class="vertical-text">
      <strong>LEVEL</strong>
      <span>25</span>
    </div>
  </div>
</div>
        
        <!-- Activity Card -->
        <div class="dashboard-card activity">
          <h3>Activity</h3>
          <div class="activity-tabs">
            <button class="active">Income</button>
            <button>Spending</button>
          </div>
          <div class="chart-container">
            <div class="chart-y-axis">
              <span>20k</span>
              <span>15k</span>
              <span>10k</span>
              <span>8k</span>
              <span>4k</span>
              <span>2k</span>
              <span>0k</span>
            </div>
            <div class="chart-bars">
              <!-- Bars will be generated via JS -->
            </div>
            <div class="chart-x-axis">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Row -->
      <div class="dashboard-row">
        <!-- Analytics Card -->
        <div class="dashboard-card analytics">
          <h3>Analytics</h3>
          <div class="analytics-item">
            <span class="highlight">38%</span>
            <span class="trend-up">71 + 16%</span>
          </div>
          <div class="analytics-item">
            <h4>Total expenses</h4>
            <span class="amount">$1,050</span>
          </div>
          <table class="expenses-table">
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
          </table>
        </div>
        
        <!-- Statistics Card -->
        <div class="dashboard-card statistics">
          <h3>Statistics</h3>
          <div class="stats-grid">
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
          </div>
        </div>
      </div>
    </div>
  `;

    // Call this after login success or when building the dashboard
    generateChartBars();
};

// Helper function to generate random chart bars
const generateChartBars = () => {
    const barsContainer = document.querySelector('.chart-bars');
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const heights = [85, 60, 75, 40, 65, 30, 50]; // percentages

    barsContainer.innerHTML = days.map((day, i) =>
        `<div class="chart-bar" style="height: ${heights[i]}%" data-day="${day}"></div>`
    ).join('');
};