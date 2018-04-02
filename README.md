# Bonsai Interview Test

## Main Features

### Authentication
* Register
Register page that allows new users to access Shop Bonsai.
* Login
Shop Bonsai only allows logged-in users to access its store.

### Shop Page
* Choose quantity
User is able to input quantity by clicking on caret symbol or typing a desired quantity.
* Add to cart
User is able to add as many products his/her wish in the cart.
Added products is automatically and permanentely saved in database. 
This feature allows a user to continue his/her shopping later.
* Add more to cart
User is able to add more quantity of a product in the cart by clicking on the already added button.
Products' quantities are automatically updated in database when a user clicks on the already added button.
* Green button addressing added products
When user adds a product, the button change its content to already added and its color to green.
* Red button addressing sold out products
When quantity in stock is zero, the button change its content to sold out, its color to red, and its on click event is disabled.
* Added check-out button 
Button that redirects a user with his/her ordered products to the Cart page.

### Cart Page
* Show ordered products with its name, quantity, and price
User is able to see in details product's name, quantity, and unit price.
* Show sub-total, tax, and total
User is able to see the sub-total, tax, and total of his/her purchase.

## Screenshots

### Welcome / Login Page
![Welcome/Login](*)

### Register Page
![Register](*)

### Shop
![Shop](*)

### Shop - Already Added Product
![Shop-Already-Added](*)

### Shop - Sold Out Product
![Shop-Sold-Out](*)

### Cart
![Cart](*)


## Known Bugs
* There is no logout button
Impact: it's required to clean the browser cache manually before logging in with another user. 
* Refresh Shop Page after registering a new user 
Impact: a new user will not have his/her order saved in database. After refreshing the page the object will be available to save the new order.

## Possible Improvements
* Input quantity is not limited to the total amount in stock.
* User is not able to remove a product from his/her cart.
* There is no alert message warning a user when he/she clicks on already added button.
* Show current user's name on navigation bar.
* Validation for all user's inputs.
* More features...

## Install
1. Ensure `npm` is installed.
2. Ensure `meteor` is installed
3. `meteor npm install`

## Database setup (Mongo) on a Mac
1. Download and install MongoDB: `brew install mongodb`
    - create a directory to store your local DB `sudo mkdir -p /data/db`
    - run mongod (The process that hosts your local db) `sudo mongod` (Note: This process needs to run the entire time in the background while you are developing)
2. Run the app at least once `meteor npm run start`

## Run
1. `meteor npm run start`
2. View at `http://localhost:3000/`
