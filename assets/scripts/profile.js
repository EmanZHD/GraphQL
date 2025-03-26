import { Domain, routing } from "./utils.js"
import { injectNav, buildDashboard } from "./Templates.js"

export const load_profile = () => {
    injectNav()
    buildDashboard()
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