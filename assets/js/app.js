// ! DOM Selectors
let $ = document,
    // theme button
    themeBtn = $.querySelector('#themeBtn'),
    // changing mode [ themeBtn i ]
    changingMode = $.querySelector('#changingMode'),
    // body
    body = $.body,
    // all numbers
    numbers = $.querySelectorAll('.numbers'),
    // text area
    answerInput = $.querySelector('#answerInput'),
    // [ - + * / ]
    mathOperation = $.querySelectorAll('.differentStyle'),
    // delete all btn [ AC ]
    deleteAllBtn = $.querySelector('#deleteAllBtn'),
    // delete last btn [ DEL ]
    deleteLastBtn = $.querySelector('#deleteLastBtn'),
    // equal btn [ = ]
    equalBtn = $.querySelector('.equal'),
    // dot btn [ . ]
    dotBtn = $.querySelector('#dot'),
    // [ x! , log , sin , cos  ]
    mathOperator = $.querySelectorAll('.math-operators'),
    // counter
    count = 0;


// * adding numbers to the answerInput bu clicking on them
// * adding dot btn
function choosingNumbers() {
    numbers.forEach(item => {
        // by clicking on each number
        item.addEventListener('click', () => {
            // add the number to the answerInput
            addingToInput(item.textContent)
            count = 0
        })
    })
    //  by clicking on dotBtn
    dotBtn.addEventListener('click', () => {
        // if count = 1 and answerInput wasn't empty
        if (count < 1 && answerInput.value != '') {
            //  add dotBtn to answerInput
            answerInput.value += dotBtn.textContent
            count = 1
        }
    })
}

// * adding the math operators [ - + * / ]
function choosingOperators() {
    mathOperation.forEach(item => {
        // by clicking on each operators
        item.addEventListener('click', () => {
            // if count < 1 and answerInput wasn't empty and get data-math from html
            if (count < 1 && answerInput.value != '' && item.getAttribute('data-math')) {
                // add it to answerInput
                addingToInput(item.getAttribute('data-math'))
                count++
                // if count < 1 and answerInput wasn't empty and data-math was [ - ]
            } else if (count < 1 && item.getAttribute('data-math') == '-') {
                // add it to answerInput
                addingToInput(item.textContent)
                count++
                // if count < 1 and answerInput wasn't empty and data-math was [ + ]
            } else if (count < 1 && item.getAttribute('data-math') == '+') {
                // add it to answerInput
                addingToInput(item.textContent)
                count++
            }
        })
    })
}

// * for writing less codes
function addingToInput(element) {
    answerInput.value += element
}

// * for writing less codes
function changeAnswerInput(element) {
    answerInput.value = element
}

// deleting all value of answerInput by clicking on [ AC ]
deleteAllBtn.addEventListener('click', () => {
    answerInput.value = ''
})

// calculating the answer by eval by clicking on equalBtn
equalBtn.addEventListener('click', calculatingTheAnswer)
function calculatingTheAnswer() {
    answerInput.value = eval(answerInput.value)
}

// deleting last value of answerInput by clicking on [ DEL ]
deleteLastBtn.addEventListener('click', deletingLastBtn)
function deletingLastBtn() {
    answerInput.value = answerInput.value.slice(0, -1)
}

// * calculating [ sin , cos , log10 , factorial ]
function mathOperators() {
    mathOperator.forEach(item => {
        // by clicking on each operator
        item.addEventListener('click', () => {
            // if it was Sin
            if (item.textContent == 'sin') {
                // show Sin of the answerInputValue
                changeAnswerInput(Math.sin(answerInput.value))
                // if it was Cos
            } else if (item.textContent == 'cos') {
                // show Cos of the answerInputValue
                changeAnswerInput(Math.cos(answerInput.value))
                // if it was Log10
            } else if (item.textContent == 'log10') {
                // show Log10 of the answerInputValue
                changeAnswerInput(Math.log10(answerInput.value))
                // if it was x! [ factorial ]
            } else if (item.textContent == 'x!') {
                // show FACTORIAL of the answerInputValue
                changeAnswerInput(factorial(answerInput.value))
            }
        })
    })
}

// * factorial function
function factorial(num) {
    //  if the number was 0
    if (num == 0) {
        // show 1 in answerInput
        return 1
        //  if it wasn't 0 [ for example ( 5 ) ]
    } else {
        // Multiply the number by one smaller than itself to reach the number 1
        // 5 * 4 * 3 * 2 * 1
        return factorial(num - 1) * num
    }
}
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

// * for loading after other codes
$.addEventListener('DOMContentLoaded', () => {
    choosingOperators()
    choosingNumbers()
    lightAndDarkMode()
    mathOperators()
})
// keyboard events
$.addEventListener('keydown', e => {
    // if key == back space
    if (e.key == 'Backspace') {
        // delete the last value from answerInput
        deletingLastBtn()
        //  if key == enter
    }else if(e.key == 'Enter'){
        // calculate the answer and show it in answerInput
        calculatingTheAnswer()
        // if key code was between 48 to 57 ( 0 to 9 ) 
    }else if(e.keyCode >= 48 && e.keyCode <= 57){
        // add it to answerInput
        addingToInput(e.key)
    }
})