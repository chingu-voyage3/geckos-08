// Store user input as entered
function getInput() {

    const categoryInputs = document.querySelectorAll('input[type=number]');

    for (var i = 0; i < Object.keys( categoryInputs ).length; i++) {
        
        // Add listener to budget input fields
        categoryInputs[i].addEventListener("blur", function() {

            // Add user input to budget category data
            budgetApp.categories[budgetApp.currentCategory].inputs[this.getAttribute('data-idx')].amt = 
                !Number.isNaN(this.valueAsNumber) ? this.valueAsNumber : undefined;

            // Recalculate category total
            sumCategories();
        });
    }
}

// Sum all category inputs
function sumCategories() {
    const currentAmount = budgetApp.categories[budgetApp.currentCategory];

    currentAmount.total = 0;

    currentAmount.inputs.forEach(function(item){

        currentAmount.total += item.amt ? item.amt : 0;
        
    });
}

