# loan-car-system-1

## Running App
- Open Terminal / Command Prompt
- git clone https://github.com/RijalArul/loan-car-system-1.git
- cd loan-car-system-1
- npm install
- nodemon bin/www

## Automate Migration DB Model / Entity
- create database first in Postgres
- npx sequelize-cli db:migrate

## List Endpoint & Explanation

### Endpint Login
- Desc:

Endpoint that users can be login, that user just input the username

- URL:

http://localhost:3000/users/login

- Body:
  
username: string

