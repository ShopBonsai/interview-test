# Bonsai Interview Test

 
Here are some features that are implemented to the app:
 - Clicking Buy does SOMETHING! This should add data to the database in a meaningful way and communicate to the user that such an action took place.
 - Ability to select a quantity to buy. The quantity should be stored in the database in a meaningful way, this data should be retrieved and displayed somewhere for the user.
 - Add a profile page to display user-related data. This data should be stored in the database and retrieved.
 - User Authenication
 - Select multiple items to buy together. Which items get selected/submitted should be stored meaningfully in the database.
 - Add a cart object to display selected items the user wants to buy. Store this information meaningfully in the database.

## Install
1. Ensure `npm` is installed.
2. Ensure `meteor` is installed
3. `meteor npm install`


## Run
1. `meteor npm run start`
2. View at `http://localhost:3000/`

It should look like this initially:
![Home Page Default Look](https://raw.githubusercontent.com/ShopBonsai/interview-test/master/docs/homePage.png)

Clicking on 'Go Shopping' button should display the shop page:
![Shop Page Default Look and browse](https://raw.githubusercontent.com/ShopBonsai/interview-test/master/docs/shopPage.gif)

User Login and Register
![User login](https://media.giphy.com/media/OjGbQembXt4Os2wpf3/giphy.gif)

Add items to cart
![add item to shopping cart](https://media.giphy.com/media/3ksOnfH0Txs7EZI0vn/giphy.gif)

Edit user profile
![edit user profile](https://media.giphy.com/media/iDJl5BnXtVNeAy08AG/giphy.gif)



## Lint
1. `meteor npm run lint`
2. Before pushing linting is automatically run.
