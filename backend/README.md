# Working with the backend part

## How to start?

1. You need to install [NodeJS](https://nodejs.org/en/download/) on your workstation.
2. Go to the root folder of the server and write in the console `npm i`. This is required to install all dependencies.
3. After installing all the dependencies, you only need to start the server itself using the command `npm run start`.
4. He works! Port 3000 👂 you.

## How can I connect my database?

In the src folder, find the ormconfig.ts file and configure it for your database data. The project uses data types specific to PostgreSQL, so the project may not work correctly on other DBMS.
After configuring for your database, just write `npm run db:migrate` in the console to deploy all tables and dependencies.

## Requests and responses to the server

#### 1. User Registration

User registration on the platform.
**Request type:** POST
**Route:** /api/user
**Required parameters:** email (string), username(string), password (string).
**Optional parameters:** last_name (string), first_name (string), country (enum), date_of_birth (date), gender (enum), bio (string), image (bytea), socialMedia (json).
[**Error**](#error-response)
**Request Body (JSON type):**

```JSON
{
    "username": "userName1",
    "email": "example@example.com",
    "password": "123456"
}
```

**Response Body (JSON type):**

```JSON
{
    "username": "userName1",
    "email": "example@example.com",
    "password": "$2a$10$48I04efNweqqKQm4coWL0UqikuEsSNktP2svycr.FmoGV0/aMTjM2",
    "last_name": "Alexander",
    "first_name": null,
    "country": null,
    "date_of_birth": null,
    "gender": null,
    "bio": null,
    "image": null,
    "socialMedia": null,
    "id": 1
}
```

#### 2. User authorization

**Request type:** POST
**Route:** /api/user/login
**Required parameters:** login (email or username), password (string).
[**Error**](#error-response)
**Request Body (JSON type):**

```JSON
{
    "login": "userName1"
    "password": "123456"
}
```

**Response Body (JSON type):**

```JSON
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InVzZXJOYW1lMSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTE2MjM5MDIyfQ.6L_6G4xTG2ZWElesHV1syP1s50ZsJasit4pQNTUp4CQ"
}
```

#### 3. Account deletion

**Request type:** DELETE
**Route:** /api/user
**Required parameters:** None.
**Required header:** Authorization (Bearer `HERE_JWT_TOKEN`).
[**Error**](#error-response)
**Response Body (JSON type):**

```JSON
{
    "raw": [],
    "affected": 1
}
```

#### 4. Change username or email

**Request type:** PUT
**Route:** /api/user/change/username **or** /api/user/change/email
**Required parameters:** email (string) **or** username (string).
**Required header:** Authorization (Bearer `HERE_JWT_TOKEN`).
[**Error**](#error-response)
**Request Body (JSON type):**

```JSON
{
    "username": "userName2"
}
```

**Response Body\* (JSON type):**

```JSON
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InVzZXJOYW1lMSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTE2MjM5MDIyfQ.6L_6G4xTG2ZWElesHV1dyP1s50ZsJasit4pqNTUp4CQ"
}
```

#### 5. Change password

**Request type:** PUT
**Route:** /api/user/change/password
**Required parameters:** oldPassword (string) or newPassword (string).
**Required header:** Authorization (Bearer `HERE_JWT_TOKEN`).
[**Error**](#error-response)
**Request Body (JSON type):**

```JSON
{
    "oldPassword": "123456",
    "newPassword": "newpassword",
}
```

**Response Body (JSON type):**

```JSON
    {
    "id": 1,
    "username": "userName1",
    "email": "example@example.com",
    "last_name": "Alexander",
    "first_name": null,
    "country": null,
    "date_of_birth": null,
    "gender": null,
    "bio": null,
    "image": null,
    "socialMedia": null,
    "password": "$2a$10$Vx6tnWqj9EF0GKBVwWS0DOSIrDK6oJicmd/JvEFMyZjiAk08Bwkie"
}
```

#### 6. Get user profile

**Request type:** GET
**Route:** /api/user/profile
**Required parameters:** None.
**Required header:** Authorization (Bearer `HERE_JWT_TOKEN`).
[**Error**](#error-response)
**Response Body (JSON type):**

```JSON
    {
    "id": 1,
    "username": "userName1",
    "email": "example@example.com",
    "last_name": "Alexander",
    "first_name": null,
    "country": null,
    "date_of_birth": null,
    "gender": null,
    "bio": null,
    "image": null,
    "socialMedia": null
}
```

#### 7. Get another user profile

**Request type:** GET
**Route:** /api/user/profile/id`number` **or** /api/user/profile/username
**Required parameters:** None.
[**Error**](#error-response)
**Response Body (JSON type):**

```JSON
    {
    "id": 1,
    "username": "userName1",
    "email": "example@example.com",
    "last_name": "Alexander",
    "first_name": null,
    "country": null,
    "date_of_birth": null,
    "gender": null,
    "bio": null,
    "image": null,
    "socialMedia": null
}
```

#### 8. Change user profile

**Request type:** PUT
**Route:** /api/profile
**Optional parameters:** last_name (string), first_name (string), country (enum), date_of_birth (date), gender (enum), bio (string), image (bytea), socialMedia (json).
**Required header:** Authorization (Bearer `HERE_JWT_TOKEN`).
[**Error**](#error-response)
**Request Body (JSON type):**

```JSON
{
    "last_name": "Alexander",
    "first_name": "Drotov",
    "socialMedia": {
        "linkedIn": "petrov",
        "facebook": "petrol",
        "github": "petrik"

    }
}
```

**Response Body (JSON type):**

```JSON
    {
    "id": 1,
    "username": "userName1",
    "email": "example@example.com",
    "last_name": "Alexander",
    "first_name": "Drotov",
    "country": null,
    "date_of_birth": null,
    "gender": null,
    "bio": null,
    "image": null,
    "socialMedia": {
        "linkedIn": "petrov",
        "facebook": "petrol",
        "github": "petrik"

    }
}
```

#### Error response

Gets JSON with two parameters:

1. statusCode - error code in HTTP format.
2. message - humanly understandable cause of the error.

**Response Body (JSON type):**

```
{
    "statusCode": 422,
    "message": "A user with the same username already exists."
}
```
