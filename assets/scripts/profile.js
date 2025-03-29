import { Domain, routing } from "./utils.js"
import { injectNav, buildDashboard } from "./Templates.js"

const info = {}

const loading_info = () => {
    const elem = document.querySelector('.nav-left')
    const btn = document.createElement('button')
    btn.classList = 'nav-username'
    btn.innerHTML = `Welcome ${info.lastname} ${info.firstname}`
    elem.append(btn)
}

// -------------- count_XP func --------------
const count_XP = () => {
    info.xpTab = info.transaction.filter((elem) => elem.type === 'xp' && elem.event.object.type === "module").map(elem => elem.amount)
    let initialValue = 0
    info.xpAmount = info.xpTab.reduce((accumulator, currentValue) => accumulator + currentValue,
        initialValue,)
    info.xpAmount = info.xpAmount / 1000 + (info.xpAmount / 1000 > 1000 ? " MB" : " KB")
    console.log('here', info.xpAmount)
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
            // data.data.transaction.forEach(element => {
            //     console.log('transaction =>', element.type)
            // })
            info.transaction = data.data.transaction
            count_XP()
            // loading_info()
        })
        .catch(err => routing('error'))
}
