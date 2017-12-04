# Bonsai Interview Test



## Install
1. Ensure `npm` is installed.
2. Ensure `meteor` is installed
3. `meteor npm install`

## Database setup (Mongo) on a Mac
1. Download and install MongoDB: `brew install mongodb`
    - create a directory to store your local DB `sudo mkdir -p /data/db`
    - run mongod (The process that hosts your local db) `sudo mongod` (Note: This process needs to run the entire time in the background while you are developing)
2. Run the app at least once `meteor npm run start`
3. Download and run 'Robo 3T' to explore the data that gets created

## Run
1. `meteor npm run start`
2. View at `http://localhost:3000/`

## Lint
1. `meteor npm run lint`
2. Before pushing linting is automatically run.
