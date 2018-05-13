# Bonsai Interview Test Submission

Live version at https://gochoose.herokuapp.com/ on sleeper dyno
<br>Portfolio https://www.colinnebocat.ca/
<br>GitHub https://github.com/colinnebocat/
<br>Linkedin https://www.linkedin.com/in/colinnebocat/
<br>Word Multiplier https://www.wordmultiplier.com/

### Key Features
1. Structured data model and seeding program to normalize mock data with schema-ed collections
2. New homepage
3. New shop page layout with tags for sold out products
4. Filter to filter products out of shop based on user selection
5. Sort feature to sort filtered products based on user selection
6. Redux to hold filter/sort selections, filter results, cart items, other ui state
7. New product show page with quantity-limited add to cart button, links back to pre-defined filter states for brands or category
8. Cart page with editable item list, total quantities and order subtotal
10. Checkout feature activated when more than one product is added to cart
11. Optional store account creation. Customers don't have to create an account to order. Orders stored under email address only if no account desired.
11. Order placement upon valid email and credit card
12. Placed orders decrease ordered product stock
13. Admin page to view new orders with their product ids and quantitys for shiping, and stats for all docs in all collections
14. Admin functions to change order status or product published status
15. Clear responsive design using Reactstrap for mobile and web views

### Assumptions
- Mock data was not modified, but only vital props transfered to new data model
- Only approx 100 products are seeded in live version
- Credit card data will not be stored in our database. Credit card verification setup for using third-party processing like Stripe.
- Sold out items can be shown even though they can't be ordered so customers can see they are carried
- Product images don't match category
- Cutomers shouldn't have to hold an account to order. Orders can be retreived by emails and added to accounts later.
- Store employees need to see orders to package up and ship out orders
- No login for admin panel yet, although merchants have accounts
- Ship to only Canadian addresses

### Dev Notes
- First project using Meteor and Less
- Not official production version; debugging variations and consoles commented out, not removed
- Tried to follow folder structure/naming as much as possible
- Provided UI was pretty barebones so I just built my own
