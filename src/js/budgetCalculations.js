// Store user input as entered
function getInput() {
	const categoryInputs = document.querySelectorAll('input[type=number]');

	for (var i = 0; i < Object.keys(categoryInputs).length; i++) {
		// Add listener to budget input fields
		categoryInputs[i].addEventListener('input', function() {
			let index = this.getAttribute('data-idx');

			// if input element's value is a num, update category's input, otherwise exit func
			if (this.value === ``) {
				budgetApp.storage.updateInputValue(
					budgetApp.currentCategory,
					index,
					0
				);
			} else if (!Number.isNaN(this.valueAsNumber)) {
				budgetApp.storage.updateInputValue(
					budgetApp.currentCategory,
					index,
					this.valueAsNumber
				);
			} else {
				console.log(`input wasn't a number`);
				return;
			}

			// Recalculate category total
			sumCategory();

			// update category totals & overall income & expense totals
			budgetApp.dataDisplayList.updateTotals();
			// redraw dataDisplayList
			budgetApp.dataDisplayList.draw();
		});
	}
}

// Sum all category inputs
function sumCategory() {
	const currentCategory = budgetApp.storage.getCategoryByIndex(
		budgetApp.currentCategory
	);
	currentCategory.total = 0;

	currentCategory.inputs.forEach(function(item) {
		currentCategory.total += item.value ? item.value : 0;
	});
}
