# Food Order App:
> This is a food order App built with react, we used the concepts of components, state, useEffect, Http requests and more.
## Step By Step of How We built It:

### 1. Header Component:
> Created header component consisting of image, text and our cart.

### 2. Created Meals Component and Fetched Meals from the server:
> Used the ```fetch()``` method to fetch our meals, we manage and keep track of the fetch meals by using state, if an error occurs during the fetching we also handled.

### 3. Mapped through Each Loaded Meals from the server:
> Inside the Meals component return method we mapped over the loaded meals from the server using ```map()``` to return a jsx for a each meal.
 
### 4. MealItem Component:
> We created The MealItem component which is responsible for rendering each meal's details, including an image, price, description, and a button to add the meal to a cart. That's the component we return after mapping over each loaded meal from the server and we give it meal prop ```meal={meal}``` which we destructured inside the component.

### 7. Formatted Our Currency To USD:
> We formatted our currency using the ```Intl.NumberFormat``` built in javascript object that allows you to format numbers based on a specific locale and formatting options

### 8. Custom Button Component:
> We created a custom Button Component, and configured it to cater for all kinds of buttons, text only (clickable buttons) and other buttons, we also made sure it recieve all other props and recieve more classes from outside the component.

### 9. We got Started with Cart Context:
>

### 10. Finished The Context and Used It With useReducer:

# To Run The App:
> Clone it or download. <br>
> ```cd``` to the project folder then run ```npm install``` to install all dependencies. <br>
> then run ```npm run dev``` to start the development server. <br>
> ```cd``` to backend folder and run ```npm start``` to start the backend server.
