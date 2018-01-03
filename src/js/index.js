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
	updateNav           : budgetApp.nav.updateNav,
	addNavCategory      : budgetApp.nav.addNavCategory,
  addItem             : budgetApp.forms.addItemHandler,
	btnHandler          : budgetApp.input.btnHandler,
	validateInput       : budgetApp.input.validateInput,
	drawDisplayList     : budgetApp.dataDisplayList.draw,
	deleteCategory      : budgetApp.forms.deleteCategoryHandler,
	deleteInput         : budgetApp.input.deleteInputHandler,
};

(budgetApp.init = (listeners) => {
	// Register update nav listener
	budgetApp.nav.ul.addEventListener(`click`, listeners.updateNav);

	// Add navigation category
	budgetApp.nav.addCategoryForm.addEventListener(
		`submit`,
		budgetApp.nav.addNavCategory
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
	// errors if added to listeners cause script type is module, loaded after doc finished parsing
	budgetApp.nav.ul.addEventListener('click', budgetApp.chartManager.draw);

	// Register update display list listener
	budgetApp.nav.ul.addEventListener('click', listeners.drawDisplayList);


  // Register add item listener
  budgetApp.forms.addItemBtn.addEventListener(`click`, listeners.addItem);

	// Register delete link listener
	budgetApp.forms.deleteLink.addEventListener(`click`, listeners.deleteCategory);

	// Register trash icon listener
	// Delegating event to fieldset for new inputs
	budgetApp.forms.fieldset.addEventListener(`click`, listeners.deleteInput);
}),

(budgetApp.onReady = () => {
  // Create nav
  budgetApp.nav.createNav();

  // Update form to show first nav category
  budgetApp.forms.updateForm(0);

  // Initialize listeners 
  budgetApp.init(budgetApp.listeners);
});

// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
	budgetApp.onReady();
} else {
	document.addEventListener('DOMContentLoaded', budgetApp.onReady);
}
