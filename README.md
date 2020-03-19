# Technologies used

1. Node.JS
2. Typescript
3. PostgresSQL
4. GraphQL
5. React

# Requirements

1. [**Node.JS**](https://nodejs.org/en/) installed
2. A [**PostgresSQL**](https://www.postgresql.org/) database
3. [**npm**](https://www.npmjs.com/) or [**yarn**](https://yarnpkg.com/) installed

# Instructions

1. Create your database for this app
2. Open the project folder in your terminal
3. Install the dependencies with `npm install` or `yarn`
4. Go to the server folder with `cd server`
5. Rename `ormconfig.json.example` to `ormconfig.json`
6. Open `ormconfig.json` and fill in your database connection
7. Run `npm run schema:sync` or `yarn schema:sync` to build the database schema with typeorm

## Now you can either use only the GraphQL Playground or use the React app

By default this application will use the port **4000**.

To change it open src/index.ts in your text editor of choice, look for `const PORT` and alter its value.

### To run only the server

1. Start the server with `npm start` or `yarn start`
2. Wait until you see the "Server running..." message
3. Open the given link in your browser
4. Enjoy!

### To run the React app

1. Go back to the root folder with `cd ..`
2. Start the App with `npm start` or `yarn start`
3. Wait until the app opens in your browser
4. Enjoy!

---

## Todo

1. Add drag and drop for lists and tasks
