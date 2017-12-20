'use strict';

const budgetInput = {

	links : [...document.querySelectorAll(`.budget-nav a`)],

	icons : [...document.querySelectorAll(`.budget-nav a i`)],

	forms : [...document.querySelectorAll(`.income-items form`)],

	numberInputs : [
		...document.querySelectorAll(`.income-items input[type="number"]`),
	],
  
	setActiveLink(e, anchor ) {
    let currentTarget = null;
    // For btn handler
    if( e === null) {
      currentTarget = anchor;
    } else {
      currentTarget = e.currentTarget;
    }

		budgetInput.links.forEach((link) => {
			link.classList.remove(`active-link`);
		});

		currentTarget.classList.add(`active-link`);

		budgetInput.forms.forEach((form) => {
			form.classList.remove(`active-form`);
		});

		budgetInput.forms.forEach((form) => {
			form.classList
				.item(0)
				.includes(currentTarget.parentNode.classList.item(1)) &&
				form.classList.add(`active-form`);
		});
	},
 
	preventInvalid(e) {
		let key = e.key;

		if (key == '.') {
			e.preventDefault();
		} else if (key == 'e') {
			e.preventDefault();
		} else if (key == '+') {
			e.preventDefault();
		} else if (key == '-') {
			e.preventDefault();
		}
	},

	setMaxNumberLength(e) {
		if (e.target.value.length >= 12) {
			e.preventDefault();
		}
	},

	validateNumberInput(e) {
		budgetInput.preventInvalid(e);
		budgetInput.setMaxNumberLength(e);
	},

  init() {

    budgetInput.links.forEach((link) => {
      link.addEventListener(`click`, budgetInput.setActiveLink);
    });

    budgetInput.numberInputs.forEach((numberInput) => {
      numberInput.addEventListener(`keypress`, budgetInput.validateNumberInput, 
      false);
    });
  }
   
};


