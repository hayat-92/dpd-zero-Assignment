# Backend System for API Implementation (Node.js with Sequelize and MySQL)

This repository contains the code for a backend system that implements the APIs described in the API Documentation section. The system is built using **Node.js** as the framework, **MySQL** as the database, and **Sequelize** as the ORM for data handling.

## Table of Contents
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Instructions to Run the Code](#installation)
- [Instructions to Set Up the Code](#configuration)
- [Testing](#running-the-code)
- [Docker Compose](#docker-compose)
## Getting Started

To get started with this backend system, follow the instructions below.

## API Documentation

### 1. User Registration

**Endpoint**: `POST /auth/register`

Register a new user with the following request:

```json
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "secure_password123",
  "full_name": "John Doe",
  "age": 30,
  "gender": "male"
}
```

Success Response:
```json 
{
  "status": "success",
  "message": "User successfully registered!",
  "data": {
    "user_id": "12345",
    "username": "example_user",
    "email": "user@example.com",
    "full_name": "John Doe",
    "age": 30,
    "gender": "male"
   }
}
```
Error Response:
```json
{
  "status": "error",
  "code": "INVALID_REQUEST",
  "message": "Invalid request. Please provide all required fields: username, email, password, full_name."
}
```


### 2. Generate Token

**Endpoint**: `POST /auth/token`

Generate a new access token with the following request:

```json
{
  "username": "example_user",
  "password": "secure_password123"
}
```

Success Response:
```json 
{
  "status": "success",
  "message": "Access token generated successfully.",
  "data": {
    "access_token": "<TOKEN>",
    "expires_in": 3600
  }
}
```

### 3. Store Data

**Endpoint**: `POST /data/store`

Store a key-value pair in the database with the following request:

```json
{
  "keyN": "unique_key",
  "valueN": "data_value"
}
```

Success Response:
```json 
{
  "status": "success",
  "message": "Data stored successfully."
}
```
### 4. Retrieve Data

**Endpoint**: `GET /data/retrieve/{key}`

Retrieve the value associated with a specific key.

Success Response:
```json 
{
  "status": "success",
  "data": {
    "keyN": "unique_key",
    "valueN": "data_value"
  }
}
```
### 5. Update Data

**Endpoint**: `PUT /data/update/{key}`

Update the value associated with an existing key with the following request:

```json
{
  "valueN": "new_data_value"
}
```

Success Response:
```json 
{
  "status": "success",
  "message": "Data updated successfully."
}
```
### 6. Delete Data

**Endpoint**: `DELETE /data/delete/{key}`

Delete a key-value pair from the database.

Success Response:
```json 
{
  "status": "success",
  "message": "Data deleted successfully."
}
```
## Database Schema
#### The database schema includes tables for user registration and storing key-value data.
- **User table**: Stores user information (username, email, password, full name, age, gender).
- **Data table**: Stores key-value pairs and associates them with users.

## Instructions to Run the Code
Clone this repository to your local machine.
```
git clone https://github.com/hayat-92/dpd-zero-Assignment.git
```
Install the required dependencies.
```
npm install
```
Set up your MySQL database and update the database configuration in config/config.js.\
#### Start the Node.js server.
```
npm start
```
The API should now be accessible at http://localhost:3000/.

## Instructions to Set Up the Code
Before running the code, you need to configure some settings:
- Set up your MySQL database and update the database configuration in config/db.js.
- Configure any other environment-specific settings in the config/jwt.js file.
## Testing
To test the functionality of the backend system, you can use the provided test.py script. Follow these steps to run the tests:
- Ensure you have Python installed on your machine.
- Navigate to the project's root directory.
- Run the test script:
```
python test.py
```

## Docker Compose
A Docker Compose file (docker-compose.yml) is provided in the repository to simplify deployment. To use it:
- Install Docker and Docker Compose.
- Navigate to the project's root directory where the docker-compose.yml file is located.
- Build and run the Docker containers:
```
docker-compose up
```
The API should now be accessible at http://localhost:3000/. \
#### To stop the containers use below command.
```
docker-compose down
```
