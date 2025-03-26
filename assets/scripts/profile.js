import { Domain, routing } from "./utils.js"


const injectNav = () => {
    const gridContainer = document.querySelector('.grid-container');
    const main = document.querySelector('main')
    const nav = document.createElement('nav')
    nav.innerHTML = `<div class="nav-left">
    <button class="nav-home">Home</button>
    <button class="nav-about">About</button>
    </div>
    <div class="nav-right">
    <button class="nav-log">Log Out</button>
    </div>`
    gridContainer.insertBefore(nav, main)
}

export const load_profile = () => {
    injectNav()
    const tocken = localStorage.getItem('tocken')
    const query = `{
        user{
            lastName
            firstName
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
            console.log(data.data.user[0].lastName)
        })
        .catch(err => routing('error'))
}