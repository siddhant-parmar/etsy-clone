# CMPE 273 - Lab 1 Assignment: Using REST (NodeJS) and ReactJS

This lab assignment covers developing REST services using Node.js (Express) and ReactJS.

You need to develop a “Prototype of Etsy application”. This prototype will be a web application
using React and Node. Refer to the Etsy website and see how it functions.

### You need to implement the following features in your application.
- Signup (name, email id, password)
- Log in
- Log out

### A User should be able to do the following functionalities:
Profile Page/ Favorites Page- Basic:
1. The “Favorite Items” section should be displayed as in Etsy.
2. Edit button should take the user to update the profile page.
3. Users should be able to perform a name search on their favourite items.
Profile Page - Update:
1. Display complete profile of a customer (basic details, about, profile picture)
2. Upload profile picture
3. Update basic details (name, date of birth, city)
4. Update Contact Information (email id, phone number)
5. Full address ( mandatory )
6. The country should be a dropdown with the list of countries to select from and should not
be entered manually.
Sell on Etsy Page - First time:
1. Collect name of the shop which must be unique and its availability can be checked
by the button beside it.
Once the shop is named, the user should be redirected to the shop home page,
Shop Home Page:
It consists of the following details,
1. Shop name
2. Shop image
3. Shop owner details
4. List of all the items in the shop along with their sales count.
5. Only for Owner:
a. Edit shop image option
b. Add a new item and edit an already existing item [in a popup window]
c. Display total sales of all the items in that particular shop
Adding and editing an item to a shop:
● Should open a pop-up window that will accept the below details
a. Name of the item
b. Photo
c. Category (Clothing, Jewellery, Entertainment, Home Decor, Art)
i. An owner should be able to create a new category if required.
d. Description
e. Price
f. Quantity available
i. Show “out of stock” if users try to order more than the available
quantity.
● Edit should allow the user to modify existing details for an item.
○ Once an item is edited, past orders should stay intact.
Dashboard – Landing page:
1. Navbar consisting
a. Logo
b. Search Bar
c. Favourites Page navigation
d. User Profile
e. Cart
2. List the shopping items that have been posted by other users. Must include a
name, image of the item, favourite button and price.
3. Users should be able to click on an item and be redirected to the shopping item
overview page.
4. The footer shows the country and currency. Currency should be editable
(dropdown with various currency types).
Searching Landing Page:
1. Items can be searched by item name using the search bar in the navbar.
2. Once clicked on the search button, search results should be displayed.
3. Each search result should have the image of the item, the name of the item, and
the price
4. The items should be filterable by price range.
5. The items should be sortable by price, quantity, sales count.
6. Check box to exclude out of stock items.
Shopping Item Overview page:
1. Should consist of an image of the item, add the item to the favorites option, shop
name (hyperlinked to the shop home page), sales count, name of the item, price,
description, select quantity, and option to add to the cart.
Cart Page:
1. Shows the list of all the items added to the cart.
2. Must display the name, quantity, price of the item.
3. Items from multiple shops can be added to the cart at the same time.
4. Display appropriate total price while checking out.
5. After clicking proceed to checkout, the order must be placed and you should be
redirected to the “My Purchases” page.
6. Each order that is successfully placed should have an auto-generated order id for
future references.
My Purchases page:
1. My purchases page must consist of a list of all the purchases made by the user.
Must include an image of the item, name, shop name, quantity, price, date of
purchase.
Notes:
1. An item can be added and removed from favorites.
2. The selected currency must be shown all over the application.
3. Before placing an order or creating a shop, the user must add a full address to the
profile.
4. Every service should have proper exception handling and every input field should
have proper validation.
5. Password values should be encrypted.
6. All images are just for reference. Please follow the instructions written.
7. When the currency is changed, the conversion factor for prices and totals can be
ignored.
8. After an item is ordered, the available quantity for that item should change
accordingly.
ESLint should be used in your code following the Airbnb style guide.
The application should be deployed on the cloud (E.g. Heroku, AWS EC2)
A simple, attractive, and responsive client attracts good marks.
Testing
1. Testing of the backend server should be done using JMeter and Mocha.
2. The React testing library should be used to test at least 3 views/pages.
Following tasks to be tested using JMeter:
Test the server for 100, 200, 300, 400, and 500 concurrent users with and without
connection pooling. Draw the graph with the average time and include it in the report.
Following tasks to be tested using Mocha:
Implement five randomly selected REST web service API calls using Mocha. Display the
output in the report.
Questions
1. Compare the results of graphs with and without in-built MySQL connection pooling of the
database. Explain the result in detail and describe the connection pooling algorithm if you
need to implement connection pooling on your own. (3 pts)
2. What are the ways to improve SQL Performance? List at least 3 strategies. Explain
why those strategies improve the performance. (2 pts)
Git Repository
o In your Git repository, create two sub-folders, one for Frontend and one for Backend. Place
all your source code in respective Folders.
o Add a proper description for every commit describing what code changes are added.
o Regular commits to your repository are mandatory. (Penalty of 3 marks if missed).
o Do not submit dependencies or supporting libraries (e.g. node_modules) (including
them causes deduction of 2 marks).
o All the dependencies should be included in the package.json file.
o The Readme file of your repository should contain the steps to run the application.
Project Report
o Introduction: State your goals and purpose of the system
o System Design: Describe your chosen system design
o Results: Screen captures of testing results and important screens of the application.
o Performance: What was the performance? Analyze results and explain why you are getting
those results.
o Git Commit history – screen capture
o Answers to the questions.
Submission
Please upload your report (John_Lab1_Report.doc) on Canvas before the deadline.
(Number of pages in Report should be below 30)
