'use strict';

var budgetApp = budgetApp || {};

budgetApp.storage = (function() {
	let categoriesInitialized = false;
	let categories = [];
	let listeners = [];

	function init() {
		chrome.storage.sync.get('alreadyInitialized', (items) => {
			if (items.alreadyInitialized === true) {
				pullCategories([
					budgetApp.nav.createNav,
					budgetApp.forms.updateForm,
				]);
			} else {
				chrome.storage.sync.set({alreadyInitialized: true});
				writeInitialCategories();
				budgetApp.nav.createNav();
				budgetApp.forms.updateForm();
			}
		});
	}

	function getCategoryByIndex(index) {
		if (categories.length !== 0) {
			return categories[index];
		}

		return categories[index];
	}

	function getCategoryByName(name) {
		categories.forEach((category) => {
			if (category.name === name) {
				return category;
			} else {
				console.log(`Category ${name} not found`);
			}
		});
	}

	function getCategories() {
		return categories;
	}

	function addCategory(category) {
		categories.push(category);

		callListeners();
		syncCategories();
	}

	function deleteCategory(index) {
		categories.splice(index, 1);

		if (index === budgetApp.currentCategory) {
			budgetApp.currentCategory = 0;
		}

		callListeners();
		syncCategories();
	}

	function addInput(categoryIndex, name) {
		categories[categoryIndex].inputs.push({
			name,
			value : 0,
		});

		callListeners();
		syncCategories();
	}

	function updateInputValue(catIdx, idx, value) {
		// console.log(categories[catIdx].inputs[idx])
		categories[catIdx].inputs[idx].value = value;

		callListeners();
		syncCategories();
	}

	function deleteInput(categoryIndex, inputIndex) {
		categories[categoryIndex].inputs.splice(inputIndex, 1);

		callListeners();
		syncCategories();
	}

	// adds a function to be called whenever categories or inputs are changed
	function addListener(name, callback) {
		listeners.push({
			name,
			callback,
		});
	}

	function callListeners() {
		listeners.forEach((listener) => {
			listener.callback();
		});
	}

	function getcolors() {
		return [
			'#88d8b0',
			'#ffcc5c',
			'#ff6f69',
			'#ffeead',
			'#96ceb4',
			'#e1f7d5',
			'#ffbdbd',
			'#c9c9ff',
			'#ffffff',
			'#f1cbff',
		];
	}

	// deletes all chrome storage
	function clear() {
		chrome.storage.sync.clear(() => {});
	}

	/* takes optional callbacks I used to create nav and update form
  once categories are finished loading */
	// loads categories from chrome storage
	function pullCategories(callbacks) {
		chrome.storage.sync.get('categories', (item) => {
			categories = item.categories;
			callListeners();
			callbacks.forEach((callback) => {
				callback();
			});
		});
	}

	// saves categories to chrome storage
	function syncCategories() {
		chrome.storage.sync.set({categories}, () => {});
	}

	// adds default categories and writes them to chrome storage
	function writeInitialCategories() {
		categories = [
			{
				name   : 'Income',
				total  : 0,
				icon   : 'fa fa-money',
				inputs : [
					{
						name  : 'Salary',
						value : 0,
					},
					{
						name  : 'Freelance web dev',
						value : 0,
					},
				],
			},
			{
				name   : 'Housing',
				total  : 0,
				icon   : 'fa fa-home',
				inputs : [
					{
						name  : 'Rent',
						value : 0,
					},
					{
						name  : 'Housing Insurance',
						value : 0,
					},
					{
						name  : 'Housing Utilities',
						value : 0,
					},
					{
						name  : 'Cable / Internet',
						value : 0,
					},
					{
						name  : 'Maintenance',
						value : 0,
					},
				],
			},
			{
				name   : 'Transportation',
				total  : 0,
				icon   : 'fa fa-car',
				inputs : [
					{
						name  : 'Lease',
						value : 0,
					},
					{
						name  : 'Car Insurance',
						value : 0,
					},
					{
						name  : 'Gas',
						value : 0,
					},
					{
						name  : 'Maintenance',
						value : 0,
					},
				],
			},
			{
				name   : 'Education',
				total  : 0,
				icon   : 'fa fa-graduation-cap',
				inputs : [
					{
						name  : 'Tuition',
						value : 0,
					},
					{
						name  : 'Supplies',
						value : 0,
					},
					{
						name  : 'Loans',
						value : 0,
					},
				],
			},
			{
				name   : 'Loans & Credit Cards',
				total  : 0,
				icon   : 'fa fa-credit-card-alt',
				inputs : [
					{
						name  : 'Loan Payment',
						value : 0,
					},
					{
						name  : 'Visa Payment',
						value : 0,
					},
					{
						name  : 'American Express Payment',
						value : 0,
					},
				],
			},
			{
				name   : 'Savings & Investments',
				total  : 0,
				icon   : 'fa fa-bank',
				inputs : [
					{
						name  : 'Retirement',
						value : 0,
					},
					{
						name  : 'Emergency',
						value : 0,
					},
					{
						name  : 'Stocks',
						value : 0,
					},
					{
						name  : 'Cryptocurrencies',
						value : 0,
					},
				],
			},
			{
				name   : 'Miscellaneous',
				total  : 0,
				icon   : 'fa fa-paperclip',
				inputs : [
					{
						name  : 'Clothing',
						value : 0,
					},
					{
						name  : 'Entertainment',
						value : 0,
					},
					{
						name  : 'Travel',
						value : 0,
					},
					{
						name  : 'Personal Care',
						value : 0,
					},
					{
						name  : 'Medical',
						value : 0,
					},
					{
						name  : 'Pet Supplies',
						value : 0,
					},
					{
						name  : 'Pet Food',
						value : 0,
					},
				],
			},
		];

		syncCategories();
		callListeners();
	}

	return {
		init,
		getCategoryByIndex,
		getCategoryByName,
		getCategories,
		addCategory,
		deleteCategory,
		addInput,
		updateInputValue,
		deleteInput,
		addListener,
		callListeners,
		getcolors,
		clear,
	};
})();
