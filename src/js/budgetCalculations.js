// Store user input as entered
function getInput() {
    const categoryInputs = document.querySelectorAll('input[type=number]');

    for (var i = 0; i < Object.keys( categoryInputs ).length; i++) {

        // Add listener to budget input fields
        categoryInputs[i].addEventListener("blur", function() {
            let index = this.getAttribute('data-idx');

            // if input element's value is a num, update category's input, otherwise exit func
            if (!Number.isNaN(this.valueAsNumber)) {
              budgetApp.storage.updateInputValue(budgetApp.currentCategory, index, this.valueAsNumber);
            } else {
              console.log('input wasnt num')
              return;
            }

            // Recalculate category total
            sumCategory();
        });
    }
}

// Sum all category inputs
function sumCategory() {
    const currentCategory = budgetApp.storage.getCategoryByIndex(budgetApp.currentCategory);
    currentCategory.total = 0;

    currentCategory.inputs.forEach(function(item){
        currentCategory.total += item.value ? item.value : 0;
    });
}
