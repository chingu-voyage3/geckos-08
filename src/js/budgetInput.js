// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

('use strict');

budgetApp.input = {
	nav                 : document.querySelector('.budget-nav'),

	form                : document.querySelector('.test-form'),

	buttons             : [...document.querySelectorAll(`.nav-btn`)],

	preventInvalid(e) {
		const prohibitedKeys = [`.`, `+`, `-`, `e`];

		prohibitedKeys.includes(e.key) && e.preventDefault();
	},

	setMaxNumberLength(e) {
		if (e.target.value.length >= 12) {
			e.preventDefault();
		}
	},

  setMaxTextLength(e) {
    if (e.target.value.length >= 24) {
      e.preventDefault();
    }
  },

  validateNumberInput(e) {
		budgetApp.input.preventInvalid(e);
		budgetApp.input.setMaxNumberLength(e);
	},

  validateTextInput(e) {
    budgetApp.input.setMaxTextLength(e);
  },

  validateInput(e) {
    if( e.target.getAttribute('type') === 'text'){
      budgetApp.input.validateTextInput(e);
    } else {
      budgetApp.input.validateNumberInput(e);
    }
  },

	updateBtns() {
		// If at first category
		if (budgetApp.currentCategory === 0) {
			// Hide previous btn
			document.querySelector(`.previous`).classList.add(`hidden`);
			// Show next btn
			document.querySelector(`.next`).classList.remove(`hidden`);
			// If at last category before `Add Category`
		} else if (
			budgetApp.currentCategory ===
			budgetApp.categories.length - 1
		) {
			// Hide next btn
			document.querySelector(`.next`).classList.add(`hidden`);

			// Show previous btn
			document.querySelector(`.previous`).classList.remove(`hidden`);
		} else {
			// Show all
			budgetApp.input.buttons.forEach((button) => {
				button.classList.remove(`hidden`);
			});
		}
	},

	btnCheck(btn) {
		return btn.innerText;
	},

	btnHandler(e) {
		e.preventDefault();

		// Get btn
		const btn = e.target;

		// Check if next or previous
		const direction = budgetApp.input.btnCheck(btn);

		if (direction === 'Next') {
			// Set form to next
			let next = +budgetApp.currentCategory + 1;
			// Check for end of ul
			if (next > budgetApp.categories.length - 1) {
				budgetApp.currentCategory = budgetApp.categories.length - 1;
			} else {
				budgetApp.currentCategory = next;
			}
		} else {
			// Set form to previous
			let prev = +budgetApp.currentCategory - 1;

			// Check for beginning of ul
			if (prev < 0) {
				budgetApp.currentCategory = 0;
			} else {
				budgetApp.currentCategory = prev;
			}
		}

		// Update form
		budgetApp.forms.updateForm();

		// Update btn display
		budgetApp.input.updateBtns();

		// Get current category idx
		const idx = budgetApp.currentCategory;

		// Update side nav display
		budgetApp.nav.updateNavDisplay(idx);
	},

  getInputIdx(el) {
		return el.getAttribute('data-idx');
	},

	deleteInputData(name, idx) {
		// Get category idx
		const categoryIdx = budgetApp.forms.getCategoryIdx(name);

		// Delete input at idx for this category
		budgetApp.categories[categoryIdx].inputs.splice(idx, 1);
	},

	deleteInputHandler(e) {
		// Exit if event target is not trash icon
		if (e.target.className !== 'fa fa-trash') {
			return;
		}
		// Get input idx
		const inputIdx = budgetApp.input.getInputIdx(
      // Previous sibling of trash icon is input element
			e.target.previousElementSibling
		);

		// Get category name
		const name = e.target.closest('fieldset').getAttribute('name');

		// Delete input data
		budgetApp.input.deleteInputData(name, inputIdx);

		// Clear form
		budgetApp.forms.clearForm();

		// Update form
		budgetApp.forms.updateForm();
	},

};
