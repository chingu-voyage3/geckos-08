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

            // Push data into chart data table
            var chartData = budgetApp.categories[budgetApp.currentCategory].inputs[this.getAttribute('data-idx')];

            budgetApp.dataManager.getCategory(budgetApp.currentCategory).name = budgetApp.categories[budgetApp.currentCategory].name;
            budgetApp.dataManager.getCategory(budgetApp.currentCategory).subcategories[this.getAttribute('data-idx')].name = chartData.title;
            budgetApp.dataManager.getCategory(budgetApp.currentCategory).subcategories[this.getAttribute('data-idx')].value = chartData.amt;
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



