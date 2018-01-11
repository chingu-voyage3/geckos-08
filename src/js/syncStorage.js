'use strict';

var budgetApp = budgetApp || {};

budgetApp.storage = (function(){
  let categoriesInitialized = false;
  let categories = [];
  let listeners = [];

  function init() {
    chrome.storage.sync.get('alreadyInitialized', (items) => {
      if (items.alreadyInitialized === true) {
        pullCategories([budgetApp.nav.createNav, budgetApp.forms.updateForm]);
      } else {
        chrome.storage.sync.set({alreadyInitialized: true});
        writeInitialCategories();
        budgetApp.nav.createNav();
        budgetApp.forms.updateForm();
      }
    })
  }

  function getCategoryByIndex(index){
    if (categories.length !== 0) {
      return categories[index];
    }

    return categories[index];
  }

  function getCategoryByName(name) {
    categories.forEach((category) => {
      if (category.name === name) {
        return category;
      } else {
        console.log(`Category ${name} not found`)
      }
    })
  }

  function getCategories() {
    return categories;
  }

  function addCategory(category) {
    categories.push(category);

    callListeners();
    syncCategories();
  }

  function deleteCategory(index) {
    categories.splice(index, 1);

    if (index === budgetApp.currentCategory){
        budgetApp.currentCategory = 0;
    }

    callListeners();
    syncCategories();
  }

  function addInput(categoryIndex, name, value) {
    categories[categoryIndex].inputs.push({
      name,
      value
    });

    callListeners();
    syncCategories();
  }

  function deleteInput(categoryIndex, inputIndex) {
    categories[categoryIndex].inputs.splice(inputIndex, 1);

    callListeners();
    syncCategories();
  }

  // adds a function to be called whenever categories or inputs are changed
  function addListener(name, callback) {
    listeners.push({
      name,
      callback
    });
  }

  function callListeners() {
    listeners.forEach((listener) => {
      listener.callback();
    });
  }

  function getcolors() {
    return [
			'#88d8b0',
			'#ffcc5c',
			'#ff6f69',
			'#ffeead',
			'#96ceb4',
			'#e1f7d5',
			'#ffbdbd',
			'#c9c9ff',
			'#ffffff',
			'#f1cbff'
		];
  }

  // deletes all chrome storage
  function clear() {
    chrome.storage.sync.clear(() => {

    });
  }


  /* takes optional callbacks I used to create nav and update form
  once categories are finished loading */
  // loads categories from chrome storage
  function pullCategories(callbacks) {
    chrome.storage.sync.get('categories', (item) => {
      categories = item.categories;
      callListeners();
      callbacks.forEach((callback) => {
        callback();
      })
    });
  }

  // saves categories to chrome storage
  function syncCategories() {
    chrome.storage.sync.set({categories}, () => {

    });
  }

  // adds default categories and writes them to chrome storage
  function writeInitialCategories() {
    categories = [
      {
        name: 'income',
        icon      : 'fa fa-money',
        inputs: [
          {
            name: 'salary',
            value: 2300
          },
          {
            name: 'freelance web dev',
            value: 550
          }
        ]
      },
      {
        name: 'housing',
        icon      : 'fa fa-home',
        inputs: [
          {
            name: 'rent',
            value: 1200
          },
          {
            name: 'housing insurance',
            value: 200
          },
          {
            name: 'housing utilities',
            value: 365
          },
          {
            name: 'cable / internet',
            value: 97
          },{
            name: 'maintenance',
            value: 142
          }
        ]
      },
      {
        name: 'Transportation',
        icon      : 'fa fa-car',
        inputs: [
          {
            name: 'Lease',
            value: 340
          },
          {
            name: 'Car Insurance',
            value: 110
          },
          {
            name: 'Gas',
            value: 185
          },
          {
            name: 'Maintenance',
            value: 60
          }
        ]
      },
      {
        name: 'Education',
        icon      : 'fa fa-graduation-cap',
        inputs: [
          {
            name: 'Tuition',
            value: 1500
          },
          {
            name: 'Supplies',
            value: 130
          },
          {
            name: 'Loans',
            value: 170
          }
        ]
      },
      {
        name: 'Loans & Credit Cards',
        icon      : 'fa fa-credit-card-alt',
        inputs: [
          {
            name: 'Loan Payment',
            value: 120
          },
          {
            name: 'Visa Payment',
            value: 75
          },
          {
            name: 'American Express Payment',
            value: 40
          }
        ]
      },
      {
        name: 'Savings & Investments',
        icon      : 'fa fa-bank',
        inputs: [
          {
            name: 'Retirement',
            value: 50
          },
          {
            name: 'Emergency',
            value: 25
          },
          {
            name: 'Stocks',
            value: 100
          },
          {
            name: 'Cryptocurrencies',
            value: 50
          }
        ]
      },
      {
        name: 'Miscellaneous',
        icon      : 'fa fa-paperclip',
        inputs: [
          {
            name: 'Clothing',
            value: 150
          },
          {
            name: 'Entertainment',
            value: 45
          },
          {
            name: 'Travel',
            value: 200
          },
          {
            name: 'Personal Care',
            value: 65
          },
          {
            name: 'Medical',
            value: 89
          },
          {
            name: 'Pet Supplies',
            value: 23
          },
          {
            name: 'Pet Food',
            value: 100
          }
        ]
      }
    ];

    syncCategories();
    callListeners();
  }

  return {
    init,
    getCategoryByIndex,
    getCategoryByName,
    getCategories,
    addCategory,
    deleteCategory,
    addInput,
    deleteInput,
    addListener,
    callListeners,
    getcolors,
    clear
  }
}())
