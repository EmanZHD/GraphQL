// ----------------- formatDate func-----------------
export const formatDate = (date) => {
    return date.toLocaleDateString('default', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
export const query_data = `{
        user {
            lastName
            firstName
            email
            createdAt
            discordId
        }
    }`
export const query_transaction = `{
        transaction {
            createdAt
            amount
            type
            event {
                object {
                    name
                    type
                }
            }
        }
    }`
// ----------------- toolTip_ func-----------------
export const toolTip_ = (circle, elem, xp) => {
    const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "title")
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('dominant-baseline', 'middle')
    text.setAttribute('class', 'tooltip-text')

    const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
    tspan1.setAttribute('x', 0)
    tspan1.setAttribute('dy', -10)
    tspan1.textContent = formatDate(elem.date)

    const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
    tspan2.setAttribute('x', 0)
    tspan2.setAttribute('dy', 20)
    xp = xp / 1000
    tspan2.textContent = `${xp > 1000 ? "+" + xp + " MB" : "+" + xp + " KB"
        }`
    text.appendChild(tspan1)
    text.appendChild(tspan2)

    tooltip.appendChild(text)

    circle.appendChild(tooltip)
}

// ----------------- categorize_SKills func-----------------
export const categorize_SKills = (skills) => {
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

// ----------------- createLIne func-----------------
export const createLIne = (x1, x2, y1, y2) => {
    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line")
    axis.setAttribute("x1", x1)
    axis.setAttribute("y1", y1)
    axis.setAttribute("x2", x2)
    axis.setAttribute("y2", y2)
    axis.setAttribute("stroke", "#444")
    axis.setAttribute("stroke-width", "1")
    return axis
}