## Live Search, Stored in DB Upon Purchase:
![live_search](../master/gifsandpics/live_search.gif)
![search_to_db](../master/gifsandpics/search_to_db.png)
- Live search to filter products by brand and name
- If user adds item to cart after using the search, adds search to DB i.e. you can track what users search for when they are actually buying items.
## Scheduled DB backups:
![alt text](../master/gifsandpics/db_backup.gif)
- Individual:
  - `chmod +x db_backup.sh`
  - `./db_backup.sh`
- Scheduled:
  - `chmod +x /path/to/db_backup.sh`
  - `sudo EDITOR=/usr/bin/nano crontab -e`
  - add five column crontab schedule (everyday at 11:59PM is listed below) and path to shell script
  - `59 23 * * * path/to/db_backup.sh`
  - save
  - `crontab -l` to confirm it is running.
## User Cart, with Quantity Selection and Live Cart Total
![cart_total](../master/gifsandpics/cart_total.gif)
- Upon confirmation, removes items from Orders collection, saves cart total to User as `balance`
![user_balance](../master/gifsandpics/user_balance.png)
-
## User Signup, Login
  ![usersign](../master/gifsandpics/user_sign.png)
  ![userlogin](../master/gifsandpics/user_login.png)
  - stores password using bcrypt
## User Cart:
## Various Validations:
- product must have quantity > 0 for user to add to cart
- user can view products page, but must be signed-in to add to cart
- cart cannot make quantity less than 1
- various sign up validation
