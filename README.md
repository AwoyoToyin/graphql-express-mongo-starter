# Apollo Server * Express * MongoDB * TS Starter

## Prerequisites

- [Node.js](https://nodejs.org/en/) v8
- [Yarn](https://yarnpkg.com/en/) Prefered
- [Prettier](https://prettier.io/) Prefered

## Getting Started

1. `git clone ` + repo URL
2. `cd` to repo
3. `yarn` - installing node packages

Start server

`yarn dev` - start development server

`yarn start` - start production server

To run eslint - find lint errors

`yarn lint`

## GraphQL Playground Queries & Mutations

### Mutations

SignUp
```
mutation signup($input: CreateUserInput!) {
  signup(input: $input) {
    _id
    username
    token
    createdAt
    updatedAt
  }
}

### Query Variables
{
  "input": {
    "firstname": "Afeez",
    "lastname": "Jerry",
    "username": "jerian",
    "email": "jerian@gmail.com",
    "phone": "090876545678",
    "password": "password"
  }
}
```

Login
```
mutation {
  login(
    username: "jerian"
    password: "password"
  ) {
    _id
    username
    token
  }
}
```

Create Todo
```
mutation createTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    _id
    content
    createdAt
    updatedAt
  }
}

### Query Variables
{
  "input": {
    "content": "My first todo item"
  }
}

HTTP HEADERS
{
  "Authorization": "Bearer __TOKEN__"
}
```

Update Todo
```
mutation updateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    _id
    content
  }
}

### Query Variables
{
  "input": {
    _id: "5a6437d5cacbed9e62630e13",
    "content": "My first todo item edited"
  }
}

HTTP HEADERS
{
  "Authorization": "Bearer __TOKEN__"
}
```

Delete Todo
```
mutation {
  deleteTodo(
    _id: "5a6437d5cacbed9e62630e13"
  ) {
    _id
  }
}

HTTP HEADERS
{
  "Authorization": "Bearer __TOKEN__"
}
```

###  Queries

Get Todo
```
query {
  Todo(
    _id: "5a6437d5cacbed9e62630e13"
  ) {
    _id,
    content
  }
}

HTTP HEADERS
{
  "Authorization": "Bearer __TOKEN__"
}
```

Get All Todos
```
query {
  allTodos {
    _id,
    content
  }
}

HTTP HEADERS
{
  "Authorization": "Bearer __TOKEN__"
}
```

## Better Error Handler

```
{
  "data": {
    "login": null
  },
  "errors": [
    {
      "message": "The provided credentials are invalid.",
      "name": "WrongCredentials",
      "time_thrown": "2018-05-14T22:34:26.241Z",
      "data": {}
    }
  ]
}
```
