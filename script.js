// #1 DOM Elements
const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

// #2 Init an array of objects (name & money) to hold the people
let data = []

// #4 Call function
getRandomUser()
getRandomUser()
getRandomUser()

// #3 Fetch random user and add money
async function getRandomUser() {
	const res = await fetch('https://randomuser.me/api')
	const data = await res.json()

	// #5 define what part of the data to access
	const user = data.results[0]

	// #6 construct newUser format
	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	}

	// #7 Add new object to data array
	addData(newUser)
}

// #14 Double Money event
function doubleMoney() {
	data = data.map(user => {
		return {...user, money: user.money * 2}
	})

	updateDOM()
}

// #16 Function for Sort by Richest Btn
function sortByRichest() {
	data.sort((a, b) => b.money - a.money)

	updateDOM()
}

// #18 Filter only millionaires
function showMillionaires() {
	data = data.filter(user => user.money > 1000000)

	updateDOM()
}

//  #20 reduce() for total
function calculateWealth() {
	const wealth = data.reduce((acc, user) => (acc += user.money), 0)

	// console.log(formatMoney(wealth))

	// #21 Create El to be posted to the DOM
	const wealthEl = document.createElement('div')
	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
		wealth
	)}</strong></h3>`
	main.appendChild(wealthEl)
}

// #8 Function to Add new obj to data arr
function addData(obj) {
	data.push(obj)

	// #9 Add the generated data to the DOM
	updateDOM()
}

//  #10 Create function to update the DOM
// the " = data " sets a default in the instance that nothing is passed in
function updateDOM(providedData = data) {
	// clear main div
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

	// take the provided data and loop through (*item is a taco)
	providedData.forEach(item => {
		// create a new element for each person
		const element = document.createElement('div')
		element.classList.add('person')
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
			item.money
		)}`

		main.appendChild(element)
	})
}

// #11 format money as $money
// Regex from StackOverflow
//  Takes in a number, adds the 2 decimal places and adds money sign
function formatMoney(number) {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// #12 Add Event LIstener to add a person
addUserBtn.addEventListener('click', getRandomUser)
// #13 Add EL for Double Money
doubleBtn.addEventListener('click', doubleMoney)
//  #15 Add EL for Sort()
sortBtn.addEventListener('click', sortByRichest)
//  #17 Add EL for Filter()
showMillionairesBtn.addEventListener('click', showMillionaires)
//  #19 Add EL for reduce() used to add everything together ***returns a single value
calculateWealthBtn.addEventListener('click', calculateWealth)
