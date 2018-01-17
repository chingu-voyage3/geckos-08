// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

('use strict');

// Tracker for current category
budgetApp.currentCategory = 0;

// Tracker for current currency
budgetApp.currency = 'USD';

// Event listeners
budgetApp.listeners = {
	updateNav       : budgetApp.nav.updateNav,
	addNavCategory  : budgetApp.nav.addNavCategory,
	addItem         : budgetApp.forms.addItemHandler,
	// trashIcon       : budgetApp.forms.trashIconHandler,
	btnHandler      : budgetApp.input.btnHandler,
	validateInput   : budgetApp.input.validateInput,
	drawDisplayList : budgetApp.dataDisplayList.draw,
	deleteCategory  : budgetApp.forms.deleteCategoryHandler,
	deleteInput     : budgetApp.input.deleteInputHandler,
	drawChart       : budgetApp.chartManager.draw,
	changeCurrency  : budgetApp.nav.changeCurrency,
};

(budgetApp.init = (listeners) => {
	// Register update nav listener
	budgetApp.nav.ul.addEventListener(`click`, listeners.updateNav);

	// Add navigation category
	budgetApp.nav.addCategoryLink.addEventListener(
		`click`,
		listeners.addNavCategory
	);

	// Register button listener
	budgetApp.input.buttons.forEach((btn) => {
		btn.addEventListener(`click`, listeners.btnHandler);
	});

	// Register input listeners
	budgetApp.input.form.addEventListener(
		`keypress`,
		listeners.validateInput,
		false
	);

	// Register update chart listener
	budgetApp.nav.ul.addEventListener('click', listeners.drawChart);

	// Register update display list listener
	budgetApp.nav.ul.addEventListener('click', listeners.drawDisplayList);

	// Register add item listener
	budgetApp.forms.addItemBtn.addEventListener(`click`, listeners.addItem);

	// Register delete link listener
	budgetApp.forms.deleteButton.addEventListener(
		`click`,
		listeners.deleteCategory
	);

	// Register storage listeners
	budgetApp.storage.addListener('chart', budgetApp.chartManager.draw);
	budgetApp.storage.addListener(
		'display list',
		budgetApp.dataDisplayList.draw
	);

	// Register trash icon listener
	//	budgetApp.forms.fieldset.addEventListener(`click`, listeners.trashIcon);

	// Delegating event to fieldset for new inputs
	budgetApp.forms.fieldset.addEventListener(`click`, listeners.deleteInput);

	[
		budgetApp.chartManager.barChartBtn,
		budgetApp.chartManager.pieChartBtn,
	].forEach((btn) => {
		btn.addEventListener('click', listeners.drawChart);
	});

	// Register currency dropdown
	budgetApp.nav.currencyDropdown.addEventListener(
		`change`,
		listeners.changeCurrency
	);

	budgetApp.storage.init();
}),
	(budgetApp.onReady = () => {
		// Initialize listeners
		budgetApp.init(budgetApp.listeners);
	});

// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
	budgetApp.onReady();
} else {
	document.addEventListener('DOMContentLoaded', budgetApp.onReady);
}
