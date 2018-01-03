// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

`use strict`;

budgetApp.forms = {
	form                  : document.querySelector(`.test-form`),

	fieldset              : document.querySelector(`.fieldset`),

	deleteLink            : document.querySelector(`.delete-category`),

  addItemLabel          : document.querySelector(`label[for='add-item']`),

  addItemInput          : document.querySelector(`input.add-item`),

  addItemBtn            : document.querySelector(`button[type='submit']`),

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
		input.setAttribute(`name`, obj.name);
		input.setAttribute(`data-idx`, idx);

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

		// Set fieldset name and form attribute
		budgetApp.forms.fieldset.setAttribute(`name`, category.classname);
		budgetApp.forms.fieldset.setAttribute(
			`form`,
			`${category.classname}-form`
		);

		// Set legend name
		document.querySelector('.legend').innerText = category.name;

		// Iterate through inputs
		if (category.inputs.length > 0) {
			category.inputs.forEach((obj, idx) => {
				// Create label
				let label = budgetApp.forms.createLabel(obj, idx);

				// Append to fieldset above addItem label
				if (budgetApp.forms.addItemLabel.parentNode) {
					budgetApp.forms.addItemLabel.parentNode.insertBefore(
						label,
						budgetApp.forms.addItemLabel
					);
				}
			});
		}
	},

	deleteCategoryData(idx) {
		budgetApp.categories.splice(idx, 1);
	},

	getCategoryIdx(name) {
		let categoryIdx = 0;

		budgetApp.categories.forEach((category, idx) => {
			if (category.classname === name) {
				categoryIdx = idx;
			}
		});

		return categoryIdx;
	},

	triggerPrevBtn() {
    budgetApp.input.buttons[0].click();
	},

	deleteCategoryHandler(e) {
		// Don't redirect to href
		e.preventDefault();
		// Don't trigger listeners.trashIcon
		e.stopPropagation();

		// Show alert
		swal({
			title      : 'Are you sure?',
			text       :
				'Once deleted, you will not be able to recover this category!',
			icon       : 'warning',
			buttons    : true,
			dangerMode : true,
		}).then((willDelete) => {
			if (willDelete) {
				// Get name of category
				const name = e.target.closest('fieldset').getAttribute('name');

				// Get category index
				const categoryIdx = budgetApp.forms.getCategoryIdx(name);

				// Delete category data
				budgetApp.forms.deleteCategoryData(categoryIdx);

				// Delete nav
				budgetApp.nav.deleteNav();

				// Recreate nav
				budgetApp.nav.createNav();

				// Success message
				swal('Poof! Your category has been deleted.', {
					icon : 'success',
				});

				// Set current category to previous
				budgetApp.forms.triggerPrevBtn();
			} else {
				swal('Your category is safe!');
			}
		});
	},

  nameFormat( str ) {
    // Split into array of words
    const words = str.split(' ');

    // Filter out special characters
    const filteredWords = words.map( word => {
      return word.replace(/\W+/g, '').toLowerCase();
    });

    // Compose name
    let name =  filteredWords.join(`-`)

    // Remove extra `-` character
    if( name.endsWith('-') ) {
      name = name.substr( 0, name.length-1);
    }

    return name;
  },

  addItemHandler( e ) {
    // Prevent submit refresh
    e.preventDefault();

    // Don't bubble up `click` event
    e.stopPropagation();

    // Get input value
    const inputValue = budgetApp.forms.addItemLabel.querySelector(`input`).value;

    // Exit if no value
    if ( inputValue.length == 0 ) {
      return;
    }

    // Create name value
    const name = budgetApp.forms.nameFormat( inputValue );

    // Get current category
    const category = budgetApp.categories[budgetApp.currentCategory];

    // Create new input obj
    const input = {
      name  : `${category.classname}-${name}`,
      title : `${inputValue}`
    };

    // Add input obj category inputs
    category.inputs.push( input );

    // Update form
    budgetApp.forms.updateForm();

    // Clear input field
    budgetApp.forms.addItemInput.value = ``;
  },

};






