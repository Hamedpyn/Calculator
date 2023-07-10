let $ = document,
    themeBtn = $.querySelector('#changingMode'),
    changingMode = $.querySelector('#theme'),
    body = $.body;

function lightAndDarkMode() {
    themeBtn.addEventListener("click", () => {
        // if body has the light mode remove it if it doesn't have it add the light mode class
        body.classList.toggle("lightMode");
        // if it has the light mode class
        if (body.classList.contains("lightMode")) {
            // add moon icon remove sun icon
            changingMode.classList.add("bxs-moon");
            changingMode.classList.remove("bxs-sun");
            // set local storage in application as light mode
            localStorage.setItem("theme", "lightMode");
            // if it doesn't have the light mode
        } else {
            // turn it to dark mode
            changingMode.classList.remove("bxs-moon");
            changingMode.classList.add("bxs-sun");
            // set local storage in application as dark mode
            localStorage.setItem("theme", "darkMode");
        }
    });
}
lightAndDarkMode()
// * saving the theme with local storage
// when the page has been load
this.addEventListener("load", () => {
    // get theme from the local storage
    let savingTheMode = localStorage.getItem("theme");
    // if theme was light mode
    if (savingTheMode === "lightMode") {
        // add light mode class to the body
        body.classList.add("lightMode");
        // add moon icon to the changing mode and del sun icon
        changingMode.classList.add("bxs-moon");
        changingMode.classList.remove("bxs-sun");
    }
});