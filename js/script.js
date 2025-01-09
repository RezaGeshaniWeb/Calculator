const btnCheck = document.querySelectorAll('.btn-check')
const btnNumber = document.querySelectorAll('.btn-num')
const btnRed = document.querySelectorAll('.red')
const input = document.querySelector('#inp')

let flag = true, num1 = 0, num2 = 0, oldOp = '', inputValue = ''

input.addEventListener('input', e => {
    let value = e.target.value
    let validValue = ''
    let count = 0

    for (let i = 0; i < value.length; i++) {
        const char = value[i]

        if (char >= '0' && char <= '9') {
            validValue += char
        } else if (char === '.') {
            if (count === 0) {
                validValue += char
                count++
            }
        }
    }

    if (validValue.startsWith('.')) {
        validValue = '0' + validValue
    }

    inputValue = validValue
    input.value = validValue
})

btnNumber.forEach(btn => {
    btn.addEventListener('click', e => {
        const value = e.target.innerText

        if (inputValue === '0' && value === '00') {
            return null
        } else if (inputValue === '0' && value !== '.') {
            inputValue = value
        } else if (value === '.' && inputValue.includes('.')) {
            return null
        } else {
            inputValue += value
        }

        input.value = inputValue
    })
})

btnCheck.forEach(btn => {
    btn.addEventListener('click', e => {
        if (flag) {
            num1 = parseFloat(inputValue)
            oldOp = e.target.innerText
            flag = !flag
            inpClear()
        } else {
            num2 = parseFloat(inputValue)
            let result
            switch (oldOp) {
                case '+':
                    result = num1 + num2
                    break
                case '-':
                    result = num1 - num2
                    break
                case '*':
                    result = num1 * num2
                    break
                case '/':
                    result = num1 / num2
                    break
                case '%':
                    result = num1 % num2
                    break
                default:
                    result = num2
                    break
            }
            num1 = result
            oldOp = e.target.innerText
            if (oldOp === '=') {
                input.value = num1.toString()
                inputValue = num1.toString()
            } else {
                inpClear()
            }
        }
    })
})

btnRed.forEach(btn => {
    btn.addEventListener('click', () => {
        num1 = 0
        num2 = 0
        flag = true
        inpClear()
    })
})

function inpClear() {
    inputValue = ''
    input.value = ''
    input.focus()
}