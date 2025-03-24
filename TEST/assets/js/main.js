const inputs = document.querySelectorAll(".input");
const toggleIcon = document.querySelector(".show-hide")
function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});
function togglePassword() {
    const passwordInput = document.getElementById('passwordInput');
    const eyeIcon = document.querySelector('.show-hide i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}
function getCurrentYearAsMax() {
    const currentYear = new Date().getFullYear();
    const footer = document.querySelector(".footer-content");
    footer.innerHTML = `
    <p>&copy;${currentYear} 01Oujda-GraphQL | Crafted with ❤ by
    <a href="https://learn.zone01oujda.ma/git/izahid">izahid</a>. All Rights Reserved.</p>
    `;
    toggleIcon.addEventListener('click', togglePassword())
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", getCurrentYearAsMax);
