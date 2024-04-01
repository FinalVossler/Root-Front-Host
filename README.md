# File Upload:

User Upload care:
https://app.uploadcare.com/projects/8defbd46d51016dbca37/files/3148d1e2-22b0-49f3-84d5-6a14488a645e/?limit=100&ordering=-datetime_uploaded

# Todos:

- Add the ability to copy an entity
- Add the RUD permissions for own elements for each element, and manage them in the application
- Add the ability to assign a field as a variation field in the model editing form (condition: The field should be of type selector)
- Add the magic button to generate as many variations as options in variation fields in the entity editor form => Implement entity parent foreign key in each entity
- Add a magic button in the models page that shows a modal that's automatically filled with product model fields

- Add the ability to edit the status for the seller (clickable state tracking bullets)

- Show the redirection button to an order or a product in an entity's page. (if the entity has this information)
- Inside an entity, show the list of all the entities that has the concerned entity as a productId inside its orderAssociationConfig (like showing the comments of an entity)

- Add an additional backend verification for the shipping method for each product based on its available shipping methods
- Add the nothing to show in the orders' page when the user has no orders

- Write an integration test for copying an entity
- Write an integration test for the getUserOrders endpoint
- Write a get user sales integration test
- Write an integration test for the getOrderAssociatedEntities endpoint
- Write an integration test for the "isPaymentSuccessful" endpoint in orders

- Write the payment methods cypress tests
- Write the shipping methods cypress tests
- Many cypress tests to write on the cart, payment and orders

- The backend (getOrderTotal) needs to take only one currency into consideration when picking the price value for each product. If the languages for the prices are inconsistent, then throw an error during the price calculation
- Create a utils function for a more readable product name in stripe
- Add number of days to shipping method
- Add billing address logic (same as shipping too?)
- Build the nothing to show component for the cart: import { GiIsland } from "react-icons/gi";
- Backend: Add the ability to update the payment method in the order service
- Create a view tab for a user's products in the profile page.
- Add the search entity in the header and the ability to configure it by model
- Support price conversion from dollar to euro depending on the selected language
- Rename FileInptus to inputFiles for consistency with InputSelect
- Add the "show in side menu" option for a model

- Add backend verifications for when a shipping method is deleted (make sure to delete it for orders too => make the shipping method options )
- Add backend verification for when an entity is deleted (make sure to delete it for orders too => make the product optional)

- 2 Mains problems: (1) Data redondancy between objects (would be good to have a frontend database like meteor or apollo client), and (2) cascade deleting and optional foreign keys (objects)
- Test performance when there is a thousand of products in the db

# https://www.vivamed.com/

1- Web site credentials

ambiebas-sempiterni\*2-inermus-centesimos

# Lokomotive
