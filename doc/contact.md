# contact API spec

## Create contact

Endpoint : POST/API/contacts

Request Header :

- X-API-TOKEN : token

request body :

```json
{
  "firstName": "iqbal",
  "lastName": "lazuardi",
  "email": "iqbal@gmail.com",
  "phone": "0812312312"
}
```

Request Body (success ) :

```json
"data": {
  "id": 1,
  "firstName": "iqbal",
  "lastName": "lazuardi",
  "email": "iqbal@gmail.com",
  "phone": "0812312312"
}
```

Request Body (failure ) :

```json
{
  "error": "firstName must be not empty"
}
```

## Get contact

Endpoint : GET/api/contacts/:id

Request Body (success ) :

```json
"data": {
  "id": 1,
  "firstName": "iqbal",
  "lastName": "lazuardi",
  "email": "iqbal@gmail.com",
  "phone": "0812312312"
}
```

Request Body (failure ) :

````json
{
  "error": "not found!"
}

## Update contact

Endpoint : PUT/API/contacts/:id

Request Header :

- X-API-TOKEN : token

```json
{
  "firstName": "iqbal",
  "lastName": "lazuardi",
  "email": "iqbal@gmail.com",
  "phone": "0812312312"
}
````

Request Body (success ) :

```json
"data": {
  "id": 1,
  "firstName": "iqbal",
  "lastName": "lazuardi",
  "email": "iqbal@gmail.com",
  "phone": "0812312312"
}
```

Request Body (failure ) :

```json
{
  "error": "firstName must be not empty"
}
```

## Remove contact

Endpoint : DELETE/API/contacts/:id

Request Header :

- X-API-TOKEN : token

Request Body (success ) :

```json
"data": "ok"
```

Request Body (failure ) :

```json
{
  "error": "not found"
}
```

## Search contact

Endpoint : GET/api/contacts/

Query parameter :

- name :string, contact first name or contact last name | optional
- phone : string, contact phone number | optional
- email : string, email | optional
- page : number, default 1
- size : number, defaul 10

Request Header :

- X-API-TOKEN : token

Requst Body (success ) :

```json
"data":[
  {
      "id": 1,
      "firstName": "iqbal",
      "lastName": "lazuardi",
      "email": "iqbal@gmail.com",
      "phone": "0812312312"
  },
    {
      "id": 2,
      "firstName": "iqbal",
      "lastName": "lazuardi",
      "email": "iqbal@gmail.com",
      "phone": "0812312312"
  },
  "pagging":{
    "currentPage" : 1,
    "totalPage":10,
    "size":10
  }
]

```

Requst Body (failed):

```json
{
  "errors": "unauthorized"
}
```
