# ag-grid-ng-forms [![Build Status](https://travis-ci.com/manojp1988/ag-grid-ngForm.svg?branch=master)](https://travis-ci.com/manojp1988/ag-grid-ngForm) [![Maintainability](https://api.codeclimate.com/v1/badges/8ef87ed48ad3a75ae940/maintainability)](https://codeclimate.com/github/manojp1988/ag-grid-ngForm/maintainability)

This is a fork project from https://github.com/seanlandsman/ag-grid-ng-forms

Blog: https://medium.com/ag-grid/using-angular-forms-with-ag-grid-1efe00265535

# Horizontal Table

| Name  | Age | Gender | Phone     |
| ----- | --- | ------ | --------- |
| John  | 23  | M      | 2323434   |
| Peter | 25  | M      | 342343214 |
| Rose  | 23  | F      | 11134314  |

The original project, creates object of entity form where key is the order id and values are plain array. We have to match
the index to get the value correctly.

```json
{
  "stock": {
    "1": ["Toyota", "Celica", 35000],
    "5": ["Ford", "Mondeo", 32000],
    "7": ["Porsche", "Boxter", 72000],
    "11": ["Seat", "Leon", 32000],
    "20": ["Honda", "CRV", 35000]
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

# Vertical Table

Sample app to show how angular forms can be utilized to create vertical table. Here rows will static, where each row is a property. And user will be able to add new columns. The JSON Structure will still be the same as above.

| Name   | John   | Peter   | Rose  |
| ------ | ------ | ------- | ----- |
| Age    | 23     | 25      | 23    |
| Gender | M      | M       | F     |
| Phone  | 141341 | 3141413 | 34314 |
