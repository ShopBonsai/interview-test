# Bonsai Interview Test

Key Features Added:
    1. Added a custom login/register page and connected it to the Meteor user API. Could in theory have use the built in version, but I did not like how it would fit into the UI.
    2. Added a fully functional cart page for each user and connected it to Mongo. The database stores the cart data for each existing userID and CRUD operations are able to be performed using the React UI connecting to server methods. Checkout is currently not implemented, but the idea would be to take the amounts and update the merchants collection in Mongo to reflect current stock. Would then move the data into the orders collection to track historic puchasing for that user.
    3. Populated the top NavBar for better navigation through the various pages.