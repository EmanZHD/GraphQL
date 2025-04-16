import { Domain, routing } from "./utils.js"
import { formatDate, toolTip_, categorize_SKills, createLIne, query_data, query_transaction } from "./profile_utils.js"
import { injectNav, buildDashboard, createStatsCard } from "./Templates.js"

const info = {}
const XP_Progress = {}
const setting = {}

// ----------------- loading_info func-----------------
const loading_info = () => {
    const elem = document.querySelector('.wlcom-section')
    const elem_xp = document.querySelector('.total span')
    const elem_project = document.querySelector('.project span')
    const elem_level = document.querySelector('.level span')
    const elem_ration = document.querySelector('.audit span')
    const user = document.querySelector('.you')
    user.innerHTML = `■ ${info.firstname[0]}${info.lastname.toLowerCase()}`
    elem.innerHTML = `Welcome,  ${info.lastname} ${info.firstname}!!`
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

// -------------- DrawAxes func --------------
const DrawAxes = (chartGroup) => {
    const xAxis = createLIne(0, setting.charWidth, setting.chartHeight, setting.chartHeight)
    chartGroup.appendChild(xAxis)

    const yAxis = createLIne(0, 0, 0, setting.chartHeight)
    chartGroup.appendChild(yAxis)
}

// ----------------- xp_tracker func-----------------
const xp_tracker = () => {
    const points = []
    let accumulator = 0
    info.transaction.filter((elem) => elem.type === 'xp' && elem.event.object.type === "module")
        .forEach(elem => {
            XP_Progress[elem.createdAt] = elem.amount
        })
    const trackerXP = Object.entries(XP_Progress)
        .map(([key, value]) => {
            points.push(value)
            accumulator += value
            return {
                date: new Date(key),
                xp: accumulator / 1000,
            }
        })
    info.points = points
    // console.log('here', trackerXP)
    // console.log('points', points)
    return trackerXP
}
// ----------------- build_pointChart func-----------------
const build_pointChart = () => {
    const trackerXP = xp_tracker()
    const container = document.querySelector('.graph-area')
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('id', 'xpChart')
    svg.setAttribute('viewBox', '0 0 1200 700')
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
    container.appendChild(svg)

    setting.width = 1200
    setting.height = 700
    setting.margin = { top: 30, right: 40, bottom: 50, left: 60 }
    setting.charWidth = setting.width - setting.margin.left - setting.margin.right
    setting.chartHeight = setting.height - setting.margin.top - setting.margin.bottom

    const chartGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    chartGroup.setAttribute('transform', `translate(${setting.margin.left}, ${setting.margin.top})`)
    chartGroup.setAttribute('class', 'svg-glb')
    svg.appendChild(chartGroup)

    const xScale = (date) => {
        const max_minDate = [trackerXP[0].date, trackerXP[trackerXP.length - 1].date]
        return ((date - max_minDate[0]) / (max_minDate[1] - max_minDate[0])) * setting.charWidth
    }

    const yScale = (xp) => {
        const maxXP = Math.max(...trackerXP.map(elem => elem.xp))
        return setting.chartHeight - (xp / maxXP) * setting.chartHeight
    }


    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
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


    trackerXP.forEach((elem, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        const x = xScale(elem.date)
        const y = yScale(elem.xp)

        circle.setAttribute('cx', x)
        circle.setAttribute('cy', y)
        circle.setAttribute('r', 3)
        circle.setAttribute('class', 'data-point')
        // console.log('------>', info.points[i])

        toolTip_(circle, elem, info.points[i])
        chartGroup.appendChild(circle)
    })
    DrawAxes(chartGroup)

    const legend1 = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    legend1.setAttribute('x', setting.charWidth - 10)
    legend1.setAttribute('y', 0)
    legend1.setAttribute('class', 'legend')
    legend1.setAttribute('text-anchor', 'end')
    legend1.textContent = `Total ${trackerXP[trackerXP.length - 1].xp} KB`
    chartGroup.appendChild(legend1)
}



// algo back-end front-end prog stats tcp ai sys-admin game
// ----------------- skills_tracker func-----------------
const skills_tracker = () => {
    const test = info.transaction.filter(elem => {
        return elem.type.startsWith('skill_')
    }).map(elem => ({
        skill: elem.type.replace('skill_', ''),
        amount: elem.amount
    })).reduce((acc, curr) => {
        acc[curr.skill] = curr.amount
        return (acc)
    }, {})
    // { info.technicalSkills, info.remainingSkills } = categorize_SKills(test)
    const result = categorize_SKills(test)
    info.technicalSkills = result.technicalSkills
    info.remainingSkills = result.remainingSkills

}

// ----------------- bar_graph func-----------------
const bar_graph = () => {
    const container = document.querySelector('.analytics')
    const svg = document.querySelector(".analytics svg")
    const chartGroup = document.querySelector(".analytics #bar-chart")

    const data = Object.entries(info.technicalSkills).map(([name, value]) => ({
        name,
        value
    }))

    const svgWidth = 800
    const svgHeight = 600
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`)

    const margin = { top: 20, right: 50, bottom: 40, left: 150 } // Extra bottom margin for x-axis labels
    const chartWidth = svgWidth - margin.left - margin.right
    const chartHeight = svgHeight - margin.top - margin.bottom

    chartGroup.setAttribute("transform", `translate(${margin.left + 50}, ${margin.top})`)

    const numBars = data.length
    const barHeight = chartHeight / numBars * 0.6 // 60% of the available space per bar
    const barSpacing = chartHeight / numBars * 0.4 // 40% spacing between bars
    const maxScaleValue = 100 // Treat values as out of 100 for percentage scaling

    // Scale for bar lengths (100% = maxScaleValue = 100)
    const maxBarLength = chartWidth * 0.8 // 80% of chart width for the longest bar
    const scale = maxBarLength / maxScaleValue // Scale factor: 1% = scale pixels

    // Draw x-axis with percentage scale
    const numTicks = 5 // Number of ticks (0%, 25%, 50%, 75%, 100%)
    for (let i = 0; i <= numTicks; i++) {
        const percentage = (i / numTicks) * 100 // Percentage (0, 25, 50, 75, 100)
        const x = (percentage / 100) * maxBarLength // Position on the x-axis

        const xAxis = createLIne(x, x, chartHeight, chartHeight + 10)
        chartGroup.appendChild(xAxis)

        const tickLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
        tickLabel.setAttribute("x", x)
        tickLabel.setAttribute("y", chartHeight + 30)
        tickLabel.setAttribute("fill", "black")
        tickLabel.setAttribute("text-anchor", "middle")
        tickLabel.textContent = `${percentage}%`
        chartGroup.appendChild(tickLabel)
    }

    data.forEach((item, index) => {
        const y = index * (barHeight + barSpacing)
        const barLength = (item.value / maxScaleValue) * maxBarLength // Scale the bar length as a percentage out of 100

        const barGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
        barGroup.setAttribute("class", `bar-group bar-group-${index}`)
        barGroup.setAttribute("tabindex", "0")
        chartGroup.appendChild(barGroup)

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute("class", "bar")
        rect.setAttribute("x", 0)
        rect.setAttribute("y", y)
        rect.setAttribute("width", barLength)
        rect.setAttribute("height", barHeight)
        rect.setAttribute("fill", "purple")
        barGroup.appendChild(rect)

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text")
        label.setAttribute("x", -10)
        label.setAttribute("y", y + barHeight / 2)
        label.setAttribute("fill", "black")
        label.setAttribute("text-anchor", "end")
        label.setAttribute("dominant-baseline", "middle")
        label.textContent = item.name
        chartGroup.appendChild(label)

        const percentage = (item.value / maxScaleValue) * 100 // Calculate percentage out of 100
        const percentageText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        percentageText.setAttribute("class", `percentage-text percentage-${index}`)

        percentageText.setAttribute("x", barLength + 20)
        percentageText.setAttribute("y", y + barHeight / 2) // Slightly above the value
        percentageText.setAttribute("fill", "black")
        percentageText.setAttribute("text-anchor", "start")
        percentageText.setAttribute("dominant-baseline", "middle")
        percentageText.textContent = `${percentage}%`
        percentageText.style.opacity = 0

        chartGroup.appendChild(percentageText)

        barGroup.addEventListener("mouseover", () => {
            document.querySelector(`.percentage-${index}`).style.opacity = 1
            barGroup.style.cursor = "pointer"
        })
        barGroup.addEventListener("mouseout", () => {
            document.querySelector(`.percentage-${index}`).style.opacity = 0
        })

    })

    const xAxis = createLIne(0, chartHeight, chartHeight, chartHeight)
    const yAxis = createLIne(0, 0, 0, chartHeight)

    chartGroup.appendChild(xAxis)
    chartGroup.appendChild(yAxis)

}

// ----------------- Draw_circles func-----------------
const Draw_circles = (elem) => {
    let i = 0
    while (i < 9) {
        // let radius = 80 + i * 40
        let radius = 20 + i * 20
        console.log('radius', radius);

        let e = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        e.setAttribute('cx', '0')
        e.setAttribute('cy', '0')
        e.setAttribute('r', `${radius}`)
        e.setAttribute('fill', 'none')
        e.setAttribute('stroke', '#444')
        e.setAttribute('stroke-width', '1')
        elem.appendChild(e)
        i++
    }
}

// ----------------- radar_chart func-----------------
const radar_chart = () => {
    const data = Object.entries(info.remainingSkills).map(([name, value]) => ({
        name,
        value
    }))
    const numAxes = data.length
    const maxRadius = 180 // Maximum radius for 100%
    const angleStep = (2 * Math.PI) / numAxes // Angle between axes
    const chartGroup = document.querySelector(".statistics #radar-chart")

    Draw_circles(chartGroup)
    // Calculate points for the polygon
    let points = []
    data.forEach((item, index) => {
        const angle = index * angleStep - Math.PI / 2 // Start from the top (subtract 90 degrees)
        const radius = (item.value / 100) * maxRadius // Scale the value to the radius
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)
        points.push(`${x},${y}`)
    })

    // Draw the axes and labels
    data.forEach((item, index) => {
        const angle = index * angleStep - Math.PI / 2
        const x = maxRadius * Math.cos(angle)
        const y = maxRadius * Math.sin(angle)
        const labelX = (maxRadius + 22) * Math.cos(angle) // Offset for label
        const labelY = (maxRadius + 22) * Math.sin(angle)

        // Draw axis
        const line = createLIne(0, x, 0, y)
        chartGroup.appendChild(line)

        // Draw label
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", labelX)
        text.setAttribute("y", labelY)
        text.setAttribute("fill", "black")
        text.setAttribute("text-anchor", "middle")
        text.setAttribute("dominant-baseline", "middle")
        text.textContent = item.name
        chartGroup.appendChild(text)
    })

    // Draw the data polygon
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
    polygon.setAttribute("points", points.join(" "))
    polygon.setAttribute("fill", "rgba(128, 0, 128, 0.5)") // Purple fill with transparency
    polygon.setAttribute("stroke", "purple")
    polygon.setAttribute("stroke-width", "2")
    chartGroup.appendChild(polygon)
}

// -------------- count_Project func --------------
const count_Project = () => {
    info.projectAmount = info.xpTab.length
}

// -------------- count_level func --------------
const count_level = () => {
    info.level = info.transaction.filter((elem) => elem.type === 'level' && elem.event.object.type === "module").length
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
    info.ratio_total = Math.round((info.ratioUp / info.ratioDown) * 10) / 10
}

const fetchData = async (query, dataProcessor) => {
    const token = localStorage.getItem('tocken')
    try {
        const response = await fetch(`https://${Domain}/api/graphql-engine/v1/graphql`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify({ query })
        })
        const data = await response.json()
        dataProcessor(data)
    } catch (err) {
        // console.error('test ', err)
        routing('error')
    }
}
// -------------- load_profile func --------------
export const load_profile = () => {
    injectNav()
    buildDashboard()
    createStatsCard()
    fetchData(query_data, (data) => {
        info.lastname = data.data.user[0].lastName
        info.firstname = data.data.user[0].firstName
        // loading_info()
    })
    fetchData(query_transaction, (data) => {
        info.transaction = data.data.transaction
        count_XP()
        count_Project()
        count_level()
        count_ratio()
        loading_info()
        build_pointChart()
        skills_tracker()
        bar_graph()
        radar_chart()
    })
}