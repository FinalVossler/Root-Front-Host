# File Upload:

User Upload care:
https://app.uploadcare.com/projects/8defbd46d51016dbca37/files/3148d1e2-22b0-49f3-84d5-6a14488a645e/?limit=100&ordering=-datetime_uploaded

# Todos:

- Complete the model field Sections creator API integration
- Transalte the text inside SectionsCreator
- Add the boolean field to make the configurer decide between a sections view or a basic view
- Showcase an entity based on its section configuration if the model is using a sections view

- When a price field is removed, and the model is saved as such, the new "undefined" value for the price field isn't
  being taken into consideration (update the ModelUpdateCommand to accept null in price and quantity and image fields)
- If a model is sellable, in the model editor, force the price and quantity fields to be required fields
- Make the field name unique (add backend validators, etc...)
- Add more explicit error messages to permission denied messages (for the user to know which elements he doesn't have access to and that's causing the error)
- Get orders and associated entities in one go in the orders' page.
- Add a magic button in the models page that shows a modal that's automatically filled with product model fields (in order to simplify the creation process of a custom product for the seller)
- Incomplete addresses permissions: implement own address deletion, update and read permissions (back and front)
- Add a field of type state tracking (Can be used for a product order status or the order status)

- Inside an entity, show the list of all the entities that have the concerned entity as a productId inside its orderAssociationConfig (like showing the comments of an entity)

- Add an additional backend verification for the shipping method for each product based on its available shipping methods
- Add the nothing to show in the orders' page when the user has no orders
- Build the nothing to show component for the cart: import { GiIsland } from "react-icons/gi";

- In integration tests, set the return of each call to the ReturnType of the corresponding controller method (to avoid silent failing tests when the controller contract is changed)
- Write an integration test for copying a model
- Write an integration test for when we delete a parent entity and have a random child entity assigned as the new parent.
- Write an integration test for generating variations
- Write an integration test for updating an entity by (1) someone who isn't an owner and then someone who is an owner (2)
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
- Backend: Add the ability to update the payment method in the order service
- Create a view tab for a user's products in the profile page.
- Add the search entity in the header and the ability to configure it by model
- Support price conversion from dollar to euro depending on the selected language
- Rename FileInptus to inputFiles for consistency with InputSelect
- Translate the date in the order title
- Add backend verifications for when a shipping method is about to be deleted. Block the deletion when it's used for an existing order
- Fix the field copy function. It can be simpler
- One of the strategies to improve performance is to convey the loading to the startup of the entire application.
  Load all elements with limited numbers at the beginning (like roles and models), and load the first page for each element for the rest

- 2 Mains problems: (1) Data redondancy between objects (would be good to have a frontend database like meteor or apollo client), and (2) cascade deleting and optional foreign keys (objects)
- Test performance when there is a thousand of products in the db
- replace all (element as IType) with the getElement function in both back and front

# https://www.vivamed.com/

1- Web site credentials

ambiebas-sempiterni\*2-inermus-centesimos

# Lokomotive
