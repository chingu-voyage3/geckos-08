// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

`use strict`;

budgetApp.forms = {
	form        : document.querySelector(`.test-form`),

	fieldset    : document.querySelector(`.fieldset`),

	createLabel(obj, idx) {
		// Create label element
		const label = document.createElement(`label`);
		label.setAttribute(`for`, obj.name);

		// Create p element
		const p = document.createElement(`p`);
		p.innerText = obj.title;

		// Create div element
		const div = document.createElement(`div`);

		// Create currency span
		const span = document.createElement(`span`);
		span.innerText = `$`;

		// Create input element
		const input = document.createElement(`input`);
		input.setAttribute(`type`, `number`);
		input.setAttribute(`id`, obj.name);
		input.setAttribute(`placeholder`, `Amount`);
		input.setAttribute(`pattern`, `[1-9][0-9]*`);
		input.setAttribute(`name`, obj.name);
		input.setAttribute(`data-idx`, idx);
		input.setAttribute(`max-length`, `12`);
		input.setAttribute(`size`, `12`);

		// Create trash icon
		const i = document.createElement(`i`);
		i.className = budgetApp.categories[0].form.trashicon;

		div.appendChild(span);
		div.appendChild(input);
		div.appendChild(i);

		label.appendChild(p);
		label.appendChild(div);

		return label;
	},

	removeLabel(label) {
		// Get for attribute
		const forAttribute = label.getAttribute(`for`);

		// Remove if not `add-item` label
		if (forAttribute !== `add-item`) {
			label.remove();
		}
	},

	clearForm() {
		// Get label elements
		const labels = budgetApp.forms.fieldset.querySelectorAll(`label`);

		// Iterate through labels
		labels.forEach((label) => {
			budgetApp.forms.removeLabel(label);
		});
	},

	updateForm() {
		// Clear form
		budgetApp.forms.clearForm();

		// Get current category index
		const index = budgetApp.currentCategory;

		// Get category
		const category = budgetApp.categories[index];

		// Get form name and classes
		budgetApp.forms.form.setAttribute(`name`, category.form.name);
		budgetApp.forms.form.className = `${category.form
			.classlist} active-form`;

		// Get fieldset
		const fieldset = document.querySelector('.fieldset');

		// Set fieldset name and form attribute
		fieldset.setAttribute(`name`, category.classname);
		fieldset.setAttribute(`form`, `${category.classname}-form`);

		// Set legend name
		document.querySelector('.legend').innerText = category.name;

		// Get `add-item` label
		const addItemElement = document.querySelector(`[for=add-item]`);

		// Iterate through inputs
		category.inputs.forEach((obj, idx) => {
			// Create label
			let label = budgetApp.forms.createLabel(obj, idx);

			// Append to fieldset above addItem label
			if (addItemElement.parentNode) {
				addItemElement.parentNode.insertBefore(label, addItemElement);
			}
		});
	
		getInput();
	},
};
