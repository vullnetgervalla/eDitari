# eDitari

## Setup
1. Download node and postgresql.
2. Get the `.env` file template below and place it in the `server` and `database` folders with the relevant values.
3. Run `npm run inst` in the terminal to download the necessary dependencies.
4. Run `npm run create-db` in the terminal to create the database.
5. Run `npm run generate-procedures` in the terminal to create the sql procedures.
6. Run `npm run inst` in the terminal to install the dependencies.

## Start the app
Run `npm start` to start the server and front-end.

### Env file template
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=SchoolDB
```
For the `.env` file in the server add the below lines with a random string of characters, for example
```
ACCESS_SECRET=TQagS8lreF2vbyqUvnJIqGqFgJs9e1XYiJvsS8mYrOKHF4IBDVoXEQRNb0uLuTLc5x5itjDW8qKaA0AsgKg
REFRESH_SECRET=HBBPh8BluBvBaLQjxz1IsiQVCFEs0OHimKf9rhzrATm69sXVIqmKarlkfrCPZUmi4nmiCCQt41N1q03buSw
```