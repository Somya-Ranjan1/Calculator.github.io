class Calculator{
    constructor(previousOparandTextElement,currentOparandTextElement){
        this.previousOparandTextElement = previousOparandTextElement
        this.currentOparandTextElement = currentOparandTextElement
        this.clear()
    }
    clear(){
        this.currentOparand =''
        this.previousOparand =''
        this.operation = undefined
    }
    delete(){
        this.currentOparand = this.currentOparand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number==='.' && this.currentOparand.includes('.'))return
        this.currentOparand = this.currentOparand.toString() + number.toString()
    }
    chooseOperation(operation){
        if (this.currentOparand==='')return
        if(this.previousOparand!==''){
            this.compute()
        }
        this.operation = operation
        this.previousOparand = this.currentOparand
        this.currentOparand = ''
    }
    compute(){
        let computation 
        const previous = parseFloat(this.previousOparand)
        const current = parseFloat(this.currentOparand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = previous + current
                break 
            case '-':
                    computation = previous - current
                break
            case '×':
                computation = previous * current
                break
            case '÷':
                computation = previous / current
                break    
            default:
                return
        }
        this.currentOparand = computation
        this.operation = undefined
        this.previousOparand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

    updateDisplay(){
        this.currentOparandTextElement.innerHTML = this.getDisplayNumber(this.currentOparand)
        if (this.operation != null){
            this.previousOparandTextElement.innerHTML = 
            `${this.getDisplayNumber(this.previousOparand)} ${this.operation}`
        }else {
            this.previousOparandTextElement.innerHTML=''
        }
    }
}


const numberButton = document.querySelectorAll('[data-numbers]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const acButton = document.querySelector('[data-ac]')
const deleteButton = document.querySelector('[data-delete]')
const previousOparandTextElement =document.querySelector('[data-previous-oparand]')
const currentOparandTextElement =document.querySelector('[data-current-oparand]')

const calculator = new Calculator(previousOparandTextElement,currentOparandTextElement)

numberButton.forEach(button => {
    button.addEventListener('click' , ()=>{
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button=> {
    button.addEventListener('click' , () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click' , button=>{
    calculator.delete()
    calculator.updateDisplay()
})