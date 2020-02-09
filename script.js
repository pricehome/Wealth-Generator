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
