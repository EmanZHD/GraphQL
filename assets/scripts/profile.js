import { Domain, routing } from "./utils.js"
import { injectNav, buildDashboard } from "./Templates.js"

const info = {}

const loading_info = () => {
    const elem = document.querySelector('.wlcom-section')
    const elem_xp = document.querySelector('.total span')
    const elem_project = document.querySelector('.project span')
    const elem_level = document.querySelector('.level span')
    const elem_ration = document.querySelector('.audit span')
    elem.innerHTML = `Welcome ${info.lastname} ${info.firstname}`
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
    console.log('UP====>', info.ratioUp)
    console.log('DOWN====>', info.ratioDown)
    console.log('done->', Math.round((info.ratioUp / info.ratioDown) * 10) / 10)
    info.ratio_total = Math.round((info.ratioUp / info.ratioDown) * 10) / 10
}
// -------------- load_profile func --------------
export const load_profile = () => {
    injectNav()
    buildDashboard()
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
        })
        .catch(err => routing('error'))
}