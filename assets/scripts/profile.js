import { Domain, routing } from "./utils.js"

export const load_profile = () => {
    console.log('nav',)
    const nav = document.querySelector('nav')
    nav.style.display = 'block'
    nav.innerHTML = `<div class="nav-left">
                <button class="nav-home">Home</button>
                <button class="nav-about">About</button>
            </div>
            <div class="nav-right">
                <button class="nav-log">Log Out</button>
            </div>`
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