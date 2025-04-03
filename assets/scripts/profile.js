import { Domain, routing } from "./utils.js"
import { injectNav, buildDashboard, createStatsCard } from "./Templates.js"

const info = {}
const XP_Progress = {}

const loading_info = () => {
    const elem = document.querySelector('.wlcom-section')
    const elem_xp = document.querySelector('.total span')
    const elem_project = document.querySelector('.project span')
    const elem_level = document.querySelector('.level span')
    const elem_ration = document.querySelector('.audit span')
    const user = document.querySelector('.you')
    user.innerHTML = `■ ${info.firstname[0]}${info.lastname.toLowerCase()}`
    elem.innerHTML = `Welcome, ${info.lastname} ${info.firstname}!!`
    elem_xp.innerHTML = `${info.xpAmount}`
    elem_project.innerHTML = `${info.projectAmount}`
    elem_level.innerHTML = `${info.level}`
    elem_ration.innerHTML = `${info.ratio_total}`
}

// -------------- count_XP func --------------
const count_XP = () => {
    let initialValue = 0
    info.xpTab = info.transaction.filter((elem) => elem.type === 'xp' && elem.event.object.type === "module").map(elem => elem.amount)
    info.xpAmount = info.xpTab.reduce((accumulator, currentValue) => accumulator + currentValue,
        initialValue,)
    info.xpAmount = info.xpAmount / 1000 + (info.xpAmount / 1000 > 1000 ? " MB" : " KB")
}
// const formatDate = (date) => {
//     const day = date.getDate();
//     const month = date.toLocaleString("default", { month: "short" });
//     return `${day} ${month}`;
// };
const formatDate = (date) => {
    return date.toLocaleDateString('default', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const toolTip_ = (circle, elem) => {
    const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "title")
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('class', 'tooltip-text');

    const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan1.setAttribute('x', 0);
    tspan1.setAttribute('dy', -10);
    tspan1.textContent = formatDate(elem.date);

    const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan2.setAttribute('x', 0);
    tspan2.setAttribute('dy', 20);
    tspan2.textContent = `+${elem.xp.toFixed(1)} XP`;

    text.appendChild(tspan1);
    text.appendChild(tspan2);

    tooltip.appendChild(text)

    circle.appendChild(tooltip)
}
const setting = {}

const DrawAxes = (chartGroup) => {
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', 0);
    xAxis.setAttribute('y1', setting.chartHeight);
    xAxis.setAttribute('x2', setting.charWidth);
    xAxis.setAttribute('y2', setting.chartHeight);
    xAxis.setAttribute('class', 'axis');
    chartGroup.appendChild(xAxis);

    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', 0);
    yAxis.setAttribute('y1', 0);
    yAxis.setAttribute('x2', 0);
    yAxis.setAttribute('y2', setting.chartHeight);
    yAxis.setAttribute('class', 'axis');
    chartGroup.appendChild(yAxis);
}

const xp_tracker = () => {
    let accumulator = 0
    info.transaction.filter((elem) => elem.type === 'xp' && elem.event.object.type === "module")
        .forEach(elem => {
            XP_Progress[elem.createdAt] = elem.amount
            console.log('eee', elem.createdAt, elem.amount)
        })
    console.log('xppp', XP_Progress, Object.values(XP_Progress))
    const trackerXP = Object.entries(XP_Progress)
        .map(([key, value]) => {
            accumulator += value
            return {
                date: new Date(key),
                xp: accumulator / 1000,
            };
        })
    // .sort((a, b) => a.date - b.date);
    console.log('test=>', trackerXP)
    const container = document.querySelector('.graph-area')
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('id', 'xpChart')
    svg.setAttribute('viewBox', '0 0 800 500')
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    container.appendChild(svg)

    setting.width = 800
    setting.height = 500
    setting.margin = { top: 30, right: 40, bottom: 50, left: 60 }
    setting.charWidth = setting.width - setting.margin.left - setting.margin.right
    setting.chartHeight = setting.height - setting.margin.top - setting.margin.bottom

    const chartGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    chartGroup.setAttribute('transform', `translate(${setting.margin.left}, ${setting.margin.top})`);
    chartGroup.setAttribute('class', 'svg-glb')
    svg.appendChild(chartGroup)


    //calculat scales
    const xScale = (date) => {
        const max_minDate = [trackerXP[0].date, trackerXP[trackerXP.length - 1].date]
        return ((date - max_minDate[0]) / (max_minDate[1] - max_minDate[0])) * setting.charWidth
    }

    const yScale = (xp) => {
        const maxXP = Math.max(...trackerXP.map(elem => elem.xp))
        return setting.chartHeight - (xp / maxXP) * setting.chartHeight
    }


    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let areaData = trackerXP.map((d, xp) => {
        const x = xScale(d.date)
        const y = yScale(d.xp)
        return `${xp === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    areaData += ` L ${xScale(trackerXP[trackerXP.length - 1].date)} ${setting.chartHeight} L ${xScale(trackerXP[0].date)} ${setting.chartHeight} Z`
    areaPath.setAttribute('d', areaData)
    areaPath.setAttribute('class', 'area-fill')
    chartGroup.appendChild(areaPath)


    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    let points_path = trackerXP.map((d, xp) => {
        const x = xScale(d.date)
        const y = yScale(d.xp)
        return `${xp === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    path.setAttribute('d', points_path)
    path.setAttribute('class', 'trend-line')
    chartGroup.appendChild(path)


    trackerXP.forEach(elem => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        const x = xScale(elem.date)
        const y = yScale(elem.xp)

        circle.setAttribute('cx', x)
        circle.setAttribute('cy', y)
        circle.setAttribute('r', 3)
        circle.setAttribute('class', 'data-point')

        toolTip_(circle, elem)
        chartGroup.appendChild(circle)
    })
    DrawAxes(chartGroup)

    const legend1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    legend1.setAttribute('x', setting.charWidth - 10);
    legend1.setAttribute('y', 0);
    legend1.setAttribute('class', 'legend');
    legend1.setAttribute('text-anchor', 'end');
    legend1.textContent = `Total ${trackerXP[trackerXP.length - 1].xp} KB`;
    chartGroup.appendChild(legend1);
}



// -------------- count_Project func --------------
const count_Project = () => {
    info.projectAmount = info.xpTab.length
}

// -------------- count_level func --------------
const count_level = () => {
    info.level = info.transaction.filter((elem) => elem.type === 'level' && elem.event.object.type === "module").length
    console.log('level=>', info.level)
}

// -------------- count_ratio func --------------
const count_ratio = () => {
    let init = 0
    info.ratioUp = info.transaction.filter((elem) => elem.type === 'up' && elem.event.object.type === 'module')
        .map(elem => elem.amount)
        .reduce((acc, curent) => acc + curent, init)
    info.ratioDown = info.transaction.filter((elem) => elem.type === 'down' && elem.event.object.type === 'module')
        .map(elem => elem.amount)
        .reduce((acc, curent) => acc + curent, init)
    // console.log('UP====>', info.ratioUp)
    // console.log('DOWN====>', info.ratioDown)
    // console.log('done->', Math.round((info.ratioUp / info.ratioDown) * 10) / 10)
    info.ratio_total = Math.round((info.ratioUp / info.ratioDown) * 10) / 10
}
// -------------- load_profile func --------------
export const load_profile = () => {
    injectNav()
    buildDashboard()
    createStatsCard()
    const tocken = localStorage.getItem('tocken')
    const query = `{
        user{
            lastName
            firstName
            email
            createdAt
            discordId
        }
            }`
    fetch(`https://${Domain}/api/graphql-engine/v1/graphql`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tocken}`
            },
            body: JSON.stringify({ query })
        }
    ).then(response => response.json())
        .then(data => {
            info.lastname = data.data.user[0].lastName
            info.firstname = data.data.user[0].firstName
            console.log('testtttt=>', data)
            console.log(`username`, data.data.user[0].firstName, info.firstname)
            loading_info()
        })
        .catch(err => routing('error'))
    const query_xp = `{
        transaction{
            createdAt
            amount
            type
            event{
                object{
      	            name
                    type
                }
            }
            }
    }
    `
    fetch(`https://${Domain}/api/graphql-engine/v1/graphql`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tocken}`
            },
            body: JSON.stringify({ query: query_xp })
        }
    ).then(response => response.json())
        .then(data => {
            info.transaction = data.data.transaction
            count_XP()
            count_Project()
            count_level()
            count_ratio()
            loading_info()
            xp_tracker()
        })
        .catch(err => routing('error'))
}