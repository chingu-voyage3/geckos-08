'use strict';

var budgetApp = budgetApp || {};

budgetApp.storage = (function(){
  let categories = [];
  let categoriesInitialized = false;

  // testing listeners for updates to other files when cats or inputs chagnes
  let listeners = [];

  function addListener(name, callback) {
    console.log(`Storage added listener: ${name}`)
    listeners.push({
      name,
      callback
    });
  }

  function callListeners() {
    console.log('Calling storage listener callbacks')
    listeners.forEach((listener) => {
      listener.callback();
    });
  }

  function getCategoryByIndex(index){
    if (categories.length !== 0) {
      return categories[index];
    }

    return categories[index];
  }

  function getCategoryName(name) {
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

  function addCategory(name) {
    let newCategory = {
      name,
      inputs: []
    };
    categories.push(newCategory)

    callListeners();
    syncCategories();
  }

  // push new input into category at index
  function addInput(categoryIndex, name, value) {
    categories[categoryIndex].inputs.push({
      name,
      value
    });

    callListeners();
    syncCategories();
  }

  function removeCategory(index) {
    categories.splice(index, 1);

    syncCategories();
  }

  // removes by name, could use index
  function removeInput(categoryIndex, inputName) {
    categories[categoryIndex].inputs.forEach((input) => {
      if (input.name === inputName) {
        let index = categories.indexOf(input);
        categories.splice(index, 1);
      }
    });

    syncCategories();
  }

  function writeInitialCategories() {
    categories = [
      {
        name: 'income',
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
  }

  function pullCategories() {
    chrome.storage.sync.get('categories', (item) => {
      console.log('Categories synced from storage');
      categories = item.categories;
    });
  }

  function syncCategories() {
    // sync categories
    chrome.storage.sync.set({categories}, () => {
      console.log('Categories synced to storage')
    });
  }

  function clear() {
    chrome.storage.sync.clear(() => {
      console.log('storage cleared')
    });
  }

  return {
    writeInitialCategories,
    pullCategories,
    getCategories,
    getCategoryByIndex,
    clear,
    addInput,
    removeCategory,
    syncCategories,
    addListener
  }
}())

//chrome.storage.sync.set({'initialCategories': false});

// FIX this should only be called if cats not initialized
budgetApp.storage.writeInitialCategories();

budgetApp.storage.pullCategories();
