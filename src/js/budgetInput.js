(function() {
	'use strict';

	const links = [...document.querySelectorAll(`.budget-nav a`)];

	const icons = [...document.querySelectorAll(`.budget-nav a i`)];

	const forms = [...document.querySelectorAll(`.income-items form`)];

	const numberInputs = [
		...document.querySelectorAll(`.income-items input[type="number"]`),
	];

	links.forEach((link) => {
		link.addEventListener(`click`, setActiveLink);
	});

	numberInputs.forEach((numberInput) => {
		numberInput.addEventListener(`keypress`, validateNumberInput, false);
	});

	function setActiveLink(e) {
		links.forEach((link) => {
			link.classList.remove(`active-link`);
		});

		e.currentTarget.classList.add(`active-link`);

		forms.forEach((form) => {
			form.classList.remove(`active-form`);
		});

		forms.forEach((form) => {
			form.classList
				.item(0)
				.includes(e.currentTarget.parentNode.classList.item(1)) &&
				form.classList.add(`active-form`);
		});
	}

	function preventDecimal(e) {
		var key = e.charCode ? e.charCode : e.keyCode;

		if (key == 46) {
			e.preventDefault();
		}
	}

	function setMaxNumberLength(e) {
		if (e.target.value.length >= 12) {
			e.preventDefault();
		}
	}

	function validateNumberInput(e) {
		preventDecimal(e);
		setMaxNumberLength(e);
	}
})();
