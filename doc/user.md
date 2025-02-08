#user API spec

## Register User

Endpont : POST /API/User

Request Body :

```json
{
  "usernames": "iqbaLLaz",
  "password": "katasandi",
  "name": "iqbaLLazuardi"
}
```

Response Body (success) :

`````json
{
  "data": {
    "username": "iqbaLLaz",
    "name": "katasandi"
  }

}
Response Body (failure) :

```json
{
  "erros": "username must not be empty . . .",

}

## Login User

Endpont : POST /API/User/Login

Request Body :

```json
{
  "usernames": "iqbaLLaz",
  "password": "katasandi",
  "token": "iqbaLLazuardi"
}
```

Response Body (success) :

````json
{
  "data": {
    "username": "iqbaLLaz",
    "name": "katasandi",
    "token": "token uuid"
  }

}
Response Body (failure) :

```json
{
  "erros": "username or password wrong! . . .",

}
## Get User
Endpont : GET /API/User/Login

Response Body (success) :

````json
{
  "data": {
    "username": "iqbaLLaz",
    "name": "katasandi",
    "token": "token uuid"
  }

}
Response Body (failure) :

Request Header :
- X-API-TOKEN : token

```json
{
  "erros": "unauthorized! . . .",

}

## Update User
Endpont : PACTH /API/User/Login

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "usernames": "iqbaLLaz", // tidak wajib
  "password": "katasandi", // tidak wajib
}
```

Response Body (success) :

````json
{
  "data": {
    "username": "iqbaLLaz",
    "name": "katasandi",
  }

}
Response Body (failure) :

```json
{
  "erros": "Unauthorized! . . .",

}

## Logout User
Endpont : DELETE /API/User/Login

Request Header :
- X-API-TOKEN : token



Response Body (success) :

````json
{
  "data": "ok"


}
Response Body (failure) :

```json
{
  "erros": "Unauthorized! . . .",

}

`````
