# ag-grid-ng-forms
This is a fork project from https://github.com/seanlandsman/ag-grid-ng-forms

Blog: https://medium.com/ag-grid/using-angular-forms-with-ag-grid-1efe00265535

The original project, creates object of entity form where key is the order id and values are plain array. We have to match
the index to get the value correctly.

```json
{
"stock": {
    "1": [
      "Toyota",
      "Celica",
      35000
    ],
    "5": [
      "Ford",
      "Mondeo",
      32000
    ],
    "7": [
      "Porsche",
      "Boxter",
      72000
    ],
    "11": [
      "Seat",
      "Leon",
      32000
    ],
    "20": [
      "Honda",
      "CRV",
      35000
    ]
  }
}
```

For my usecase, I needed array of row objects. This project is the slight modification of the above article.

```json

{
  "stock": [
    {
      "orderNumber": 1,
      "make": "Toyota",
      "model": "Celica",
      "price": 35000
    },
    {
      "orderNumber": 5,
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000
    },
    {
      "orderNumber": 7,
      "make": "Porsche",
      "model": "Boxter",
      "price": 72000
    },
    {
      "orderNumber": 11,
      "make": "Seat",
      "model": "Leon",
      "price": 32000
    },
    {
      "orderNumber": 20,
      "make": "Honda",
      "model": "CRV",
      "price": 35000
    }
  ]
}

```
