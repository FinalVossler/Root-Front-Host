# File Upload:

User Upload care:
https://app.uploadcare.com/projects/8defbd46d51016dbca37/files/3148d1e2-22b0-49f3-84d5-6a14488a645e/?limit=100&ordering=-datetime_uploaded

# Todos:

- Write the custom entities for

  - The entire order
  - A specific product in the order
    And make sure that the entity could be added as a modifiable object to either:
  - The seller
  - The buyer
  - Both
    And make sure that the entity could be either:
  - A single modifiable object
  - Many addable objects (like for comments)

- Add the nothing to show in the orders' page when the user as no orders
- Add the order history page with their statuses (workflow)
- Add the seller order history page (Mes ventes) (getSellerOrders)
- Write an integration test for the getUserOrders endpoint
- Add order number field in the order model
- Then backend (getOrderTotal) needs to take only one currency into consideration when picking the price value for each product. If the languages for the prices are inconsistent, then throw an error during the price calculation
- Write an integration test for the "isPaymentSuccessful" endpoint in orders
- Create a utils function for a more readable product name in stripe
- Add number of days to shipping method
- Add billing address logic (same as shipping too?)
- Build the nothing to show component for the cart: import { GiIsland } from "react-icons/gi";
- Backend: Add the ability to update the payment method in the order service
- Create a view tab for a user's products in the profile page.
- Add the search entity in the header and the ability to configure it by model
- Support price conversion from dollar to euro depending on the selected language
- Write the payment methods cypress tests
- Write the shipping methods cypress tests
- Rename FileInptus to inputFiles for consistency with InputSelect

# https://www.vivamed.com/

1- Web site credentials

ambiebas-sempiterni\*2-inermus-centesimos

# Lokomotive
