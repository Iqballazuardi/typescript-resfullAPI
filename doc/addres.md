# addres api spec

##create addres

Endpoint header: POST/api/addres
-X-API-TOKEN: token

request body :

```json
{
  "street": "jalan",
  "city": "city",
  "province": "province",
  "country": "country",
  "postalCode": "postalCode"
}
```

request body (success) :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "city",
    "province": "province",
    "country": "country",
    "postalCode": "postalCode"
  }
}
```

response body (failure) :

```json
{
  "error": "postal code not found"
}
```

##get addres

Endpoint header: GET/api/addres/:idAddres
-X-API-TOKEN: token

request body (success) :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "city",
    "province": "province",
    "country": "country",
    "postalCode": "postalCode"
  }
}
```

response body (failure) :

```json
{
  "error": "addres not found"
}
```

##update addres

Endpoint header: PUT/api/addres/:idAddres
-X-API-TOKEN: token

request body :

```json
{
  "street": "jalan",
  "city": "city",
  "province": "province",
  "country": "country",
  "postalCode": "postalCode"
}
```

request body (success) :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "city",
    "province": "province",
    "country": "country",
    "postalCode": "postalCode"
  }
}
```

response body (failure) :

```json
{
  "error": "addres not found"
}
```

##remove addres

Endpoint header: DELETE/api/addres/:idAddres
-X-API-TOKEN: token

request body (success) :

```json
{
  "data": "ok"
}
```

response body (failure) :

```json
{
  "error": "addres not found"
}
```

##list addres

Endpoint header: GET/api/addres/:idAddres/addresList
-X-API-TOKEN: token

request body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan",
      "city": "city",
      "province": "province",
      "country": "country",
      "postalCode": "postalCode"
    },
    {
      "id": 2,
      "street": "jalan",
      "city": "city",
      "province": "province",
      "country": "country",
      "postalCode": "postalCode"
    }
  ]
}
```

response body (failure) :

```json
{
  "error": "contact is not found"
}
```
