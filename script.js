// Todas las operaciones

function suma(a, b) {
	return a + b
}

function resta(a, b) {
	return a - b
}

function dividir(a, b) {
	return a / b
}

function multiplicar(a, b) {
	return a * b
}

// Procesos

function notDiv(val) {
	if (val == 'noDiv') {
		pError.innerHTML = 'You cannot divide a number by 0.'
		fOp = ''
		fSp = ''
		oper = ''
	} else if (val == 'noDa' && display.textContent == '0') {
		pError.innerHTML = 'You need to put some numbers.'
	} else {
		pError.innerHTML = 'You need to put any operator.'
	}
}

function appNum(number) {
	if (newNum) {
		display.textContent = ''
		newNum = false
	}
	if (display.textContent.toString().length == 8) {
		pError.innerHTML =
			'You cannot put more numbers, it will break the calculator.'
		return
	}
	if (display.textContent === '0') {
		display.textContent = ''
		display.textContent += number
	} else {
		display.textContent += number
	}
}

function clearCal() {
	display.textContent = '0'
	fOp = ''
	sOp = ''
	oper = ''
	pError.innerHTML = ''
}

function changeSim() {
	if (display.textContent == '0') return
	let change = display.textContent.toString()
	display.textContent = `-${change}`
}

function backN() {
	if (display.textContent.toString().length == 1) {
		display.textContent = '0'
		pError.innerHTML = ''
	} else {
		display.textContent = display.textContent.toString().slice(0, -1)
		pError.innerHTML = ''
	}
}

function resolve(val1, val2, oper) {
	val1 = Number(val1)
	val2 = Number(val2)
	switch (oper) {
		case '+':
			return suma(val1, val2)
		case '-':
			return resta(val1, val2)
		case 'X':
			return multiplicar(val1, val2)
		case '/':
			return val2 === 0 ? notDiv('noDiv') : dividir(val1, val2)
		default:
			notDiv('noDa')
			break
	}
}

function resultado() {
	if (oper == '') return
	sOp = display.textContent
	if (resolve(fOp, sOp, oper).toString().length > 8) {
		pError.innerHTML = 'We have cap the max of numbers on screen to be 8.'
		display.textContent = resolve(fOp, sOp, oper).toString().slice(0, 8)
	} else {
		display.textContent = resolve(fOp, sOp, oper)
	}
	newNum = true
	oper = ''
}

function setOp(val) {
	if (oper != '') {
		resultado()
		return
	}
	fOp = display.textContent
	oper = val
	newNum = true
}

function givekey(e) {
	if (e.key >= 0 && e.key <= 9) appNum(e.key)
	if (e.code == 'Backspace') backN()
	if (e.code == 'Enter') resultado()
	if (e.code == 'NumpadAdd') setOp('+')
	if (e.code == 'NumpadSubtract') setOp('-')
	if (e.code == 'NumpadMultiply') setOp('X')
	if (e.code == 'NumpadDivide') setOp('/')
	if (e.code === 'Backquote') clearCal()
	if (e.code === 'NumpadDecimal') addDot()
}

function addDot() {
	let varia = display.textContent.toString()
	display.textContent = `${varia}.`
}

// Get importantes

const btn = Array.from(document.getElementsByClassName('nums'))
const pError = document.getElementById('error')
const display = document.getElementById('display-res')
const equal = document.getElementById('equal')
const reset = document.getElementById('reset')
const changS = document.getElementById('chanS')
const dot = document.getElementById('dot')
const opers = Array.from(document.getElementsByClassName('oper'))
const backnum = document.getElementById('back')

let fOp = ''
let sOp = ''
let oper = ''
let newNum = false

// Clicks

backnum.addEventListener('click', () => backN())
equal.addEventListener('click', () => resultado())
changS.addEventListener('click', () => changeSim())
reset.addEventListener('click', () => clearCal())
btn.forEach(button =>
	button.addEventListener('click', () => appNum(button.textContent))
)
opers.forEach(button =>
	button.addEventListener('click', () => setOp(button.textContent))
)
window.addEventListener('keydown', givekey)
dot.addEventListener('click', addDot)
