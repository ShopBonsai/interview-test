
# Leah's test submission

A.) Added ability to select a quantity to buy
  a.) show the quantity in stock
  b.) Validation: quantity to buy is greater than or equal to 1 and less than or equal to quantity in stock

B.) Added functions to buy Button
  a.) form order object and insert into Orders collection
  b.) increase shopping bag item count

C.) Added shopping bag function
  a.) shopping inline svg with icon-badge showing item count


# Bonsai Interview Test

Welcome to the creative interview test at Shop Bonsai.

This interview test simulates an environment that is similar to working at Shop Bonsai (very similar tech stack we run today).

Scenario:
You joined as the new member of a small start-up team. Together we are building a new app to sell cool 3rd party products! So far, the sales team worked tirelessly and managed to acquire over 50 merchants who each have different brands and products offerings. The developers have also been working hard and have created a home page and shop page to welcome the users and display the products of the newly acquired merchants.

Goal:
Your task is to add a new complete working feature that you feel will best demonstrate your capabilities as a team-member and have the largest positive impact on our customer. This implies that JUST updating the es-lint rules to include trailing commas, switching all space-characters in the code-base to tab-characters, and/or updating the .gitignore will score low. However, non-customer facing features such as validating data, unit-testing, creating a automatic-backups of the database, can score very high if done well.

Here are some ideas for features that are missing from the app:
 - Clicking Buy does SOMETHING! This should add data to the database in a meaningful way and communicate to the user that such an action took place.
 - Ability to select a quantity to buy. The quantity should be stored in the database in a meaningful way, this data should be retrieved and displayed somewhere for the user.
 - Add a profile page to display user-related data. This data should be stored in the database and retrieved.
 - Allow users to login using social media. A record of the user being logged in should be stored in the database, retrieved and displayed (perhaps on a special admin-only page).
 - Select multiple items to buy together. Which items get selected/submitted should be stored meaningfully in the database.
 - Add a cart object to display selected items the user wants to buy. Store this information meaningfully in the database.
 - Organize the shop page for better browsing experience, adding filters for brands/merchants/products.
 - Ability to 'like' an item. Store which items got liked in the database, retrieve this information.
 - Searching for product by name/brand/merchant. Store searches meaningfully in the database.
 - Add loading-images so the screen isn't empty while data is loading. Add page visits and loading times to the database in a meaningful way.
 - Add a react testing-framework and create a test. Record the results in separate database for the QA team!

The following should be noted:
1. Assume that if a piece of code/function is not working, it is a bug in the app (oh no!)
2. Work with the data as if it were real. (Do not manipulate/transform the mockData files)
3. You can make additional assumptions, please note them if they are critical to understanding the way a feature is implemented
4. You can add multiple small features or one large feature
5. Please document your changes well and make as many atomic commits as you feel are necessary for someone to track your changes

Of your submission, the following will be evaluated:
- Ability to work in a pre-existing React environment (front-end)
- Ability to use existing data in the database (back-end)
- Ability add/store/retrieve new data in the database (back-end)
- Completeness of feature, works as a user would expect such a feature to work
- Adopting and using best practices
- Coding style
- Attention to detail
- Clarity in communicating the feature implemented (I highly recommend taking pictures and gifs)

High scorers will be contacted via email within a week of acknowledgement of PR submission.
Thank you and good luck for everyone who applied and submitted a PR.

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

It should look like this initially:
![Home Page Default Look](https://raw.githubusercontent.com/ShopBonsai/interview-test/master/docs/homePage.png)

Clicking on 'Go Shopping' button should display the shop page:
![Shop Page Default Look and browse](https://raw.githubusercontent.com/ShopBonsai/interview-test/master/docs/shopPage.gif)

## Lint
1. `meteor npm run lint`
2. Before pushing linting is automatically run.
