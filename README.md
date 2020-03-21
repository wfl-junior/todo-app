# Technologies used

1. Node.JS
2. Typescript
3. PostgreSQL
4. GraphQL
5. React

# Requirements

1. [**Node.JS**](https://nodejs.org/en/) installed
2. A [**PostgreSQL**](https://www.postgresql.org/) database \*
3. [**npm**](https://www.npmjs.com/) or [**yarn**](https://yarnpkg.com/) installed

\* - Although I am using **PostgreSQL** as my database, I am also using [**Typeorm**](https://typeorm.io/#/) for all the database interaction, that said, you could use any other database they support, check their [guide](https://typeorm.io/#/) for more information.

# Instructions

1. Create your database for this app
2. Open the project folder in your terminal
3. Install the dependencies with `npm install` or `yarn`
4. Go to the web folder with `cd web`
5. Install the dependencies with `npm install` or `yarn`
6. Go to the server folder with `cd ../server`
7. Install the dependencies with `npm install` or `yarn`
8. Rename `ormconfig.json.example` to `ormconfig.json`
9. Open `ormconfig.json` and fill in your database connection
10. Run `npm run schema:sync` or `yarn schema:sync` to build the database schema with typeorm

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

Note: you can change language by clicking on the flag on the top left corner

#### Current supported languages

1. en-us
1. pt-br

---

## Todo

1. Add drag and drop for lists and tasks
