# Bonsai Interview Test

The goal is to create the single page provided in the `/docs/` folder of this repository. This is intentionally stripped down to allow for better inspection of your core skills and intuition.


The single page should look like the following:

![Main Page](https://raw.githubusercontent.com/ShopBonsai/interview-test/master/docs/return-page.png)

The following should be noted:
1. The back button does not need to work.
2. The `1 of 3` does not need to be hooked up to anything.
3. All other numbers and values on the screen should be hooked up to the real data being pulled in.
4. An `order` contains several `merchantOrders` which will each have a heading separating them, in the mock-up you can see this listed as `Seller A`.
3. The footer listing `Terms and Conditions >` does not need to lead anywhere. If you want bonus points you can create a new api method for generating a `Returns` collection document. And, have that footer create the document.
4. The `Talk to Someone` button should open the help modal. (/docs/help-modal.png)
5. The `Call Us` button does not need to work.
6. The `Close` button should work.
7. The quantity button should open the quantity selection drawer from the right side. (/docs/quantity-drawer.png)
8. The `back arrow` button on the quantity drawer should close the drawer.

**Updates based on the answers to my questions:**
1. 'Help Modal': it should be a pop-up, it should not fill all screen;
2. 'Return Quantity': the user should be able to select the quantity and click 'Apply Changes'. After that, numbers '2 of 4' (the ones near the Seller A), should change to his selected value (X of 4);
3. 'Return Quantity' and 'Checkbox': when the user selects the quantity from the drawer, the checkbox should become checked and overall quantity should recalculate;
4. 'Return Quantity' and 'Checkbox': when the user deselects the checkbox (which was previously checked), return quantity should become '0 of X' and overall quantity should recalculate;
5. 'Checkbox': if the user goes to the page, does not select anything from the drawer and just clicks on the checkbox (which is not checked), the highest possible value for that item should be selected and overall quantity should recalculate.


### Help Modal
![Help Modal](https://raw.githubusercontent.com/ShopBonsai/interview-test/master/docs/help-modal.png)

### Quantity Drawer
![Quantity Drawer](https://raw.githubusercontent.com/ShopBonsai/interview-test/master/docs/quantity-drawer.png)

The following will be considered:
- Understanding of frameworks, especially React.
- Attention to detail
- Coding style

## Install
1. Ensure `npm` is installed.
2. Ensure `meteor` is installed
3. `meteor npm install`

## Run
1. `meteor npm run start`
2. View at `http://localhost:3000/`

It should look like this initially:
![How the page should look by default.](https://i.imgur.com/Pbv4l9W.png)

## Lint
1. `meteor npm run lint`
2. Before pushing linting is automatically run.
