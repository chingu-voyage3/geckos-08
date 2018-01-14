// Store user input as entered
function getInput() {

    const categoryInputs = document.querySelectorAll('input[type=number]:not(#add-item-value)');

    for (var i = 0; i < Object.keys( categoryInputs ).length; i++) {

        // Add listener to budget input fields
        categoryInputs[i].addEventListener("blur", function() {
            let index = this.getAttribute('data-idx');

            // Add user input to budget category data
            budgetApp.categories[budgetApp.currentCategory].inputs[index].amt =
                !Number.isNaN(this.valueAsNumber) ? this.valueAsNumber : undefined;

            // Recalculate category total
            sumCategories();

            // Push data into chart data table
            let chartPath = budgetApp.dataManager.getCategory(budgetApp.currentCategory);
            let chartData = budgetApp.categories[budgetApp.currentCategory].inputs[index];

            chartPath.name = budgetApp.categories[budgetApp.currentCategory].name;
            chartPath.subcategories[index].name = chartData.title;
            chartPath.subcategories[index].value = chartData.amt || 0;
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
