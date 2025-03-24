const inputs = document.querySelectorAll(".input");

function addcl(){
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});
function getCurrentYearAsMax() {
    const currentYear = new Date().getFullYear();
    const footer = document.querySelector(".footer-content");
    footer.innerHTML = `
    <p>&copy;${currentYear} 01Oujda-GraphQL | Crafted with ❤ by
        <a href="https://learn.zone01oujda.ma/git/izahid">izahid</a>. All Rights Reserved.</p>
    `;
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", getCurrentYearAsMax);
