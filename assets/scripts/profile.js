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

const build_pointChart = () => {

}

const xp_tracker = () => {
    let accumulator = 0
    info.transaction.filter((elem) => elem.type === 'xp' && elem.event.object.type === "module")
        .forEach(elem => {
            XP_Progress[elem.createdAt] = elem.amount
            // console.log('eee', elem.createdAt, elem.amount)
        })
    // console.log('xppp', XP_Progress, Object.values(XP_Progress))
    const trackerXP = Object.entries(XP_Progress)
        .map(([key, value]) => {
            accumulator += value
            return {
                date: new Date(key),
                xp: accumulator / 1000,
            };
        })
    // .sort((a, b) => a.date - b.date);
    // console.log('test=>', trackerXP)
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

// algo back-end front-end prog stats tcp ai sys-admin game
const skills_tracker = () => {
    const test = info.transaction.filter(elem => {
        console.log('elem', elem.type)
        return elem.type.startsWith('skill_')
    }).map(elem => ({
        skill: elem.type.replace('skill_', ''),
        amount: elem.amount
    })).reduce((acc, curr) => {
        acc[curr.skill] = curr.amount
        return (acc)
    }, {})
    console.log('test=>', test)
    // { info.technicalSkills, info.remainingSkills } = categorize_SKills(test)
    const result = categorize_SKills(test);
    info.technicalSkills = result.technicalSkills;
    info.remainingSkills = result.remainingSkills;
    console.log('here', categorize_SKills(test))

}

const bar_graph = () => {
    const container = document.querySelector('.analytics')
    const svg = document.querySelector(".analytics svg");
    const chartGroup = document.querySelector(".analytics #bar-chart");
    console.log('ddsvg', svg)
    console.log('ddchartGroup', chartGroup)
    console.log('here info.technicalSkills', info.technicalSkills)

    const data = Object.entries(info.technicalSkills).map(([name, value]) => ({
        name,
        value
    }));

    // Get SVG dimensions from viewBox
    const viewBox = svg.getAttribute("viewBox").split(" ").map(Number);
    const svgWidth = viewBox[2];
    const svgHeight = viewBox[3];

    // Chart dimensions and margins
    const margin = { top: 20, right: 50, bottom: 40, left: 150 }; // Extra bottom margin for x-axis labels
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    // Translate the chart group to account for margins
    chartGroup.setAttribute("transform", `translate(${margin.left + 50}, ${margin.top})`);

    // Calculate bar height and spacing
    const numBars = data.length;
    const barHeight = chartHeight / numBars * 0.6; // 60% of the available space per bar
    const barSpacing = chartHeight / numBars * 0.4; // 40% spacing between bars
    const maxScaleValue = 100; // Treat values as out of 100 for percentage scaling

    // Dynamic font size based on SVG size
    const fontSize = Math.min(svgWidth, svgHeight) * 0.05;

    // Scale for bar lengths (100% = maxScaleValue = 100)
    const maxBarLength = chartWidth * 0.8; // 80% of chart width for the longest bar
    const scale = maxBarLength / maxScaleValue; // Scale factor: 1% = scale pixels

    // Draw x-axis with percentage scale
    const numTicks = 5; // Number of ticks (0%, 25%, 50%, 75%, 100%)
    for (let i = 0; i <= numTicks; i++) {
        const percentage = (i / numTicks) * 100; // Percentage (0, 25, 50, 75, 100)
        const x = (percentage / 100) * maxBarLength; // Position on the x-axis

        // Draw tick mark
        const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tick.setAttribute("x1", x);
        tick.setAttribute("y1", chartHeight);
        tick.setAttribute("x2", x);
        tick.setAttribute("y2", chartHeight + 10);
        tick.setAttribute("stroke", "#444");
        tick.setAttribute("stroke-width", "1");
        chartGroup.appendChild(tick);

        // Draw percentage label
        const tickLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tickLabel.setAttribute("x", x);
        tickLabel.setAttribute("y", chartHeight + 30);
        tickLabel.setAttribute("fill", "black");
        // tickLabel.setAttribute("font-size", fontSize);
        tickLabel.setAttribute("text-anchor", "middle");
        tickLabel.textContent = `${percentage}%`;
        chartGroup.appendChild(tickLabel);
    }

    // Draw bars and labels
    data.forEach((item, index) => {
        const y = index * (barHeight + barSpacing);
        const barLength = (item.value / maxScaleValue) * maxBarLength; // Scale the bar length as a percentage out of 100

        // Create a group for the bar to make it focusable
        const barGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        barGroup.setAttribute("class", `bar-group bar-group-${index}`);
        barGroup.setAttribute("tabindex", "0"); // Make the group focusable
        chartGroup.appendChild(barGroup);

        // Draw bar inside the group
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", "bar");
        rect.setAttribute("x", 0);
        rect.setAttribute("y", y);
        rect.setAttribute("width", barLength);
        rect.setAttribute("height", barHeight);
        rect.setAttribute("fill", "purple");
        barGroup.appendChild(rect);

        // Draw category label (on the left)
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", -10);
        label.setAttribute("y", y + barHeight / 2);
        label.setAttribute("fill", "black");
        // label.setAttribute("font-size", fontSize);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("dominant-baseline", "middle");
        label.textContent = item.name;
        chartGroup.appendChild(label);

        // Draw value (hidden by default, shown on hover)
        // const value = document.createElementNS("http://www.w3.org/2000/svg", "text");
        // value.setAttribute("class", `value-text value-${index}`); // Unique class for each value
        // value.setAttribute("x", barLength + 20);
        // value.setAttribute("y", y + barHeight / 2);
        // value.setAttribute("fill", "#fff");
        // value.setAttribute("font-size", fontSize);
        // value.setAttribute("text-anchor", "start");
        // value.setAttribute("dominant-baseline", "middle");
        // value.textContent = item.value;
        // chartGroup.appendChild(value);

        // Draw percentage (hidden by default, shown on focus)
        const percentage = (item.value / maxScaleValue) * 100; // Calculate percentage out of 100
        const percentageText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        percentageText.setAttribute("class", `percentage-text percentage-${index}`); // Unique class for each percentage

        percentageText.setAttribute("x", barLength + 20); // Position in front of the bar
        percentageText.setAttribute("y", y + barHeight / 2); // Slightly above the value
        percentageText.setAttribute("fill", "black");
        // percentageText.setAttribute("font-size", fontSize);
        percentageText.setAttribute("text-anchor", "start");
        percentageText.setAttribute("dominant-baseline", "middle");
        percentageText.textContent = `${percentage}%`;
        percentageText.style.opacity = 0

        chartGroup.appendChild(percentageText);

        barGroup.addEventListener("mouseover", () => {
            console.log('here', barGroup)
            document.querySelector(`.percentage-${index}`).style.opacity = 1
            barGroup.style.cursor = "pointer"
        })
        barGroup.addEventListener("mouseout", () => {
            console.log('here', barGroup)
            document.querySelector(`.percentage-${index}`).style.opacity = 0
        })

    })

    // Draw x-axis line
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", 0);
    xAxis.setAttribute("y1", chartHeight);
    xAxis.setAttribute("x2", chartHeight);
    xAxis.setAttribute("y2", chartHeight);
    xAxis.setAttribute("stroke", "#444");
    xAxis.setAttribute("stroke-width", "1");
    chartGroup.appendChild(xAxis);

    // Draw y-axis line
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", 0);
    yAxis.setAttribute("y1", 0);
    yAxis.setAttribute("x2", 0);
    yAxis.setAttribute("y2", chartHeight);
    yAxis.setAttribute("stroke", "#444");
    yAxis.setAttribute("stroke-width", "1");
    chartGroup.appendChild(yAxis);

}

const radar_chart = () => {
    const data = Object.entries(info.remainingSkills).map(([name, value]) => ({
        name,
        value
    }));
    const numAxes = data.length;
    const maxRadius = 200; // Maximum radius for 100%
    const angleStep = (2 * Math.PI) / numAxes; // Angle between axes
    const chartGroup = document.querySelector(".statistics #radar-chart");

    // Calculate points for the polygon
    let points = [];
    data.forEach((item, index) => {
        const angle = index * angleStep - Math.PI / 2; // Start from the top (subtract 90 degrees)
        const radius = (item.value / 100) * maxRadius; // Scale the value to the radius
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        points.push(`${x},${y}`);
    });

    // Draw the axes and labels
    data.forEach((item, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const x = maxRadius * Math.cos(angle);
        const y = maxRadius * Math.sin(angle);
        const labelX = (maxRadius + 21) * Math.cos(angle); // Offset for label
        const labelY = (maxRadius + 21) * Math.sin(angle);

        // Draw axis
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", "0");
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#444");
        line.setAttribute("stroke-width", "1");
        chartGroup.appendChild(line);

        // Draw label
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", labelX);
        text.setAttribute("y", labelY);
        text.setAttribute("fill", "black");
        // text.setAttribute("font-size", "14");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = item.name;
        chartGroup.appendChild(text);
    });

    // Draw the data polygon
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", points.join(" "));
    polygon.setAttribute("fill", "rgba(128, 0, 128, 0.5)"); // Purple fill with transparency
    polygon.setAttribute("stroke", "purple");
    polygon.setAttribute("stroke-width", "2");
    chartGroup.appendChild(polygon);
}

const categorize_SKills = (skills) => {
    const data = Object.entries(skills)
    const technical_Skills = ['algo', 'back-end', 'front-end', 'prog', 'stats', 'tcp', 'ai', 'sys-admin', 'game']
    return {
        technicalSkills: Object.fromEntries(
            data.filter(([skill]) =>
                technical_Skills.includes(skill))),
        remainingSkills: Object.fromEntries(
            data.filter(([skill]) =>
                !technical_Skills.includes(skill)))
    }
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
            skills_tracker()
            bar_graph()
            radar_chart()
        })
        .catch(err => routing('error'))
}