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

**Optional parameters:** lastName (string), firstName (string), country (enum), dateOfBirth (date), gender (enum), bio (string), image (bytea), socialMedia (json).

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
    "lastName": "Alexander",
    "firstName": null,
    "country": null,
    "dateOfBirth": null,
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
    "login": "userName1",
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
    "delete": true
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

\*new token

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
    "newPassword": "newpassword"
}
```

**Response Body (JSON type):**

```JSON
    {
    "id": 1,
    "username": "userName1",
    "email": "example@example.com",
    "lastName": "Alexander",
    "firstName": null,
    "country": null,
    "dateOfBirth": null,
    "gender": null,
    "bio": null,
    "image": null,
    "socialMedia": null,
    "password": "$2a$10$Vx6tnWqj9EF0GKBVwWS0DOSIrDK6oJicmd/JvEFMyZjiAk08Bwkie"
}
```

#### 6. Get user profile

**Request type:** GET

**Route:** /api/profile

**Required parameters:** None.

**Required header:** Authorization (Bearer `HERE_JWT_TOKEN`).

[**Error**](#error-response)

**Response Body (JSON type):**

```JSON
    {
    "id": 1,
    "username": "userName1",
    "email": "example@example.com",
    "lastName": "Alexander",
    "firstName": null,
    "country": null,
    "dateOfBirth": null,
    "gender": null,
    "bio": null,
    "image": null,
    "socialMedia": null
}
```

#### 7. Get another user profile

**Request type:** GET

**Route:** /api/profile/id`number` **or** /api/profile/`username`

**Required parameters:** None.

[**Error**](#error-response)

**Response Body (JSON type):**

```JSON
    {
    "id": 1,
    "username": "userName1",
    "email": "example@example.com",
    "lastName": "Alexander",
    "firstName": null,
    "country": null,
    "dateOfBirth": null,
    "gender": null,
    "bio": null,
    "image": null,
    "socialMedia": null
}
```

#### 8. Change user profile

**Request type:** PUT

**Route:** /api/profile

**Optional parameters:** lastName (string), firstName (string), country (enum), dateOfBirth (date), gender (enum), bio (string), image (bytea), socialMedia (json).

**Required header:** Authorization (Bearer `HERE_JWT_TOKEN`).

[**Error**](#error-response)

**Request Body (JSON type):**

```JSON
{
    "lastName": "Alexander",
    "firstName": "Drotov",
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
    "lastName": "Alexander",
    "firstName": "Drotov",
    "country": null,
    "dateOfBirth": null,
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

#### 9. Checking if a username or email exists in a database

**Request type:** POST

**Route:** /api/user/auth-data-exists

**Required parameters:** username (string) or email (string).

[**Error**](#error-response)

**Request Body (JSON type):**

```JSON
{
    "email": "aaa@ddd.com"
}
```

**Response Body (JSON type):**

```JSON
{
    "exists": true
}
```

#### 10. Create room

**Request type:** POST

**Required header\*:** Authorization (Bearer `USER_JWT_TOKEN`). \* optional parameter.

**Route:** /api/room

**Required parameters:** name (string), date (Date),creator (string\*\*), interviewee (string\*\*\*), interviewer (string[]\*\*\*), watcher (string[]\*\*\*).

\*\* not required if the user is logged in, but if the field is filled, it is taken over by the creator.

\*\*\* email, username or ''.

[**Error**](#error-response)

**Request Body (JSON type):**

```JSON
{
    "name": "test-room",
    "date": "2014-04-05 05:00:00+02",
    "creator":"vovk@gmail.com",
    "interviewee": "sobaka@ffff.com",
    "interviewer": ["", "fiass1srs1tsd12", "aiss1s1@dssa.com"],
    "watcher": "dsds@dda.co"
}
```

**Response Body (JSON type):**

```JSON
{
    "name": "test-room",
    "date": "2014-04-05 05:00:00+02",
    "creator": {
        "username": "",
        "email": "vovk@gmail.com",
        "password": "S23v9p"
    },
    "interviewee": {
        "username": "",
        "email": "sobaka@ffff.com",
        "password": "x06v9p"
    },
    "interviewer": [
        {
            "username": "",
            "email": "",
            "password": "-zg6akv"
        },
        {
            "username": "fiass1srs1tsd12",
            "email": "",
            "password": "3t8lm6"
        },
        {
            "username": "fias1srs1ts12",
            "email": "",
            "password": "sow18j"
        }
    ],
    "watcher": {
        "username": "",
        "email": "dsds@dda.co",
        "password": "3uuvqc"
    }
}
```

#### 11. Delete room

**Request type:** DELETE

**Required header:** Authorization (Bearer `CREATOR_JWT_TOKEN`).

**Route:** /api/room/id`number` or /api/room/`roomname`

[**Error**](#error-response)

**Response Body (JSON type):**

```JSON
{
    "delete": true
}
```

#### 12. Change room date

**Request type:** PUT

**Route:** /api/room/id`number` or /api/room/`roomname`

**Required header:** Authorization (Bearer `CREATOR_JWT_TOKEN`).

**Required parameters:** date (string)

[**Error**](#error-response)

**Request Body (JSON type):**

```JSON
{
    "date": "2014-04-05 05:00:00+02"
}
```

**Response Body (JSON type):**

```JSON
{
    "changed": true
}
```

#### 13. Authorization user in room

**Request type:** POST

**Route:** /api/room/login

**Required parameters:** room (id or room name), password (string).

[**Error**](#error-response)

**Request Body (JSON type):**

```JSON
{
    "room": "test",
    "password": "123456"
}
```

**Response Body (JSON type):**

```JSON
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6InVzZXJOYW1lMSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNTE2MjM5MDIyfQ.6L_6G4xTG2ZWElesHV1syP1s50ZsJasit4pQNTUp4CQ"
}
```

#### 14. Change room date

**Request type:** PUT

**Route:** /api/room/user

**Required header:** Authorization (Bearer `USER_JWT_TOKEN`).

**Required parameters:** name (string)

[**Error**](#error-response)

**Request Body (JSON type):**

```JSON
{
    "name": "Orest"
}
```

**Response Body (JSON type):**

```JSON
{
    "changed": true
}
```

#### 15. Deleting a user in a room

**Request type:** DELETE

**Route:** /api/room/user

**Required header:** Authorization (Bearer `USER_JWT_TOKEN` or `CREATOR_JWT_TOKEN`)\*.

\* The user can remove himself from the room or the creator can remove any user.

**Required parameters:** role (string )\*\*, user (email or id)\*\*.

\*\* only for creator.

[**Error**](#error-response)

**Request Body (JSON type):**

```JSON
{
    "room": "test",
    "user": "dog@example.com"
}
```

**Response Body (JSON type):**

```JSON
{
    "delete": true
}
```

#### 16. Adding a new user to the room

**Request type:** POST

**Route:** /api/room/user

**Required header:** Authorization (Bearer `CREATOR_JWT_TOKEN`).

**Required parameters:** role (string ), user (email or username).

[**Error**](#error-response)

**Request Body (JSON type):**

```JSON
{
    "role": "interviewer",
    "user": "dog@example.com"
}
```

**Response Body (JSON type):**

```JSON
{
    "changed": true
}
```

#### 17. Adding profile image

**Request type:** POST

**Route:** /api/profile/image

**Required header:** Authorization (Bearer `USER_JWT_TOKEN`).

**Required body(form data):** file.

[**Error**](#error-response)

**Response Body (JSON type):**

```JSON
{
     "path": "pr-img-cahadm-jdtg8c-1644691494187.jfif"
}
```

#### 18. Profile image

**Request type:** GET

**Route:** /api/profile/image/`imgname`

[**Error**](#error-response)

#### 19. Checking if the room name exists

**Request type:** POST

**Route:** /api/room/room-name-exists

**Required parameters:** name (string).

[**Error**](#error-response)

**Request Body (JSON type):**

```JSON
{
    "name": "test-name"
}
```

**Response Body (JSON type):**

```JSON
{
    "exists": false
}
```

#### 20. Get room info

**Request type:** GET

**Required header:** Authorization (Bearer `USER_IN_ROOM_JWT_TOKEN` or `CREATOR_JWT_TOKEN`)

**Route:** /api/room

[**Error**](#error-response)

**Response Body (JSON type):\***

```JSON
{
    "name": "test-room",
    "userName": "Tom",
    "role": "creator",
    "date": "2022-02-04T13:02:00.000Z",
    "creator": {
        "name": "Tom",
        "email": "example@ddssa.com"
    },
    "interviewee": {
        "name": null,
        "email": "example@gmail.com"
    },
    "interviewer": [
        {
            "name": null,
            "email": null
        },
        {
            "name": "Eva",
            "email": "example@example.com"
        },
        {
            "name": null,
            "email": "email-test@gmail.com"
        },
        {
            "name": "Lisa",
            "email": null
        }
    ],
    "watcher": [
        {
            "name": null,
            "email": "name@site.com"
        }
    ]
}
}
```

\* creator

**Response Body (JSON type):\***

```JSON
    {
    "name": "test-room",
    "userName": "John",
    "role": "interviewee",
    "date": "2022-02-04T13:02:00.000Z",
    "creator": {
        "name": null,
        "email": "example@example.com"
    }

```

\* room user

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
