1. Download the repository 
2. In terminal write :- npm install
3. Do not change env file because in env file MONGO_URI have my atlas database in this database already admin have available
4. for start the project:- npm start
5. for test the api use postman 
6. first register user 
7. admin credential :- username:- dhruvit & password:- 1865 
8. first login admin then it will generate token then for admin that token give to the Authorization section.

In Database one admin user is already created with username: admin & password: 1865.

user can register with username & password then JWT token is generated and stored in database. 
note:- admin can not register.
API:- http://localhost:3000/api/auth/register method: POST
body => {
    "username": "harsh",
    "password": "1865"
}
user and admin can login with username & password then JWT token is generated and stored in database and that token expires in 1 hour after that user need to login again.
API:- http://localhost:3000/api/auth/login method: POST
body => {
    "username": "harsh",
    "password": "1865"
}

Note:- if user and admin is register or login then generate one JWT token that token give to the Authorization section Auth type Bearer token then all api is run beacuse backend is fully authenticated.

admin can create invoice with customer details, invoice date, due date, items, tax rates, discount, username.
API:- http://localhost:3000/api/invoices method: POST
 body =>   {
    "customerDetails": {
      "name": "harsh patel",
      "address": "Bhavnagar",
      "email": "john.doe@example.com",
      "phone": "555-1234"
    },
    "invoiceDate": "2023-10-01",
    "dueDate": "2023-10-31",
    "items": [
      { "name": "Widget", "quantity": 5, "unitPrice": 9.99 },
      { "name": "Gadget", "quantity": 4, "unitPrice": 19.99 }
    ],
    "taxRates": [5, 10],
    "discount": 0,
    "username": "harsh"
  }
Admin can get all invoices.
API:- http://localhost:3000/api/invoices method: GET    

Admin can get a specific invoice by id.
API:- http://localhost:3000/api/invoices/:id method: GET

Admin can update a specific invoice by id.
API:- http://localhost:3000/api/invoices/:id method: PUT

body =>   {
    "customerDetails": {
      "name": "harsh patel",
      "address": "Bhavnagar",
      "email": "john.doe@example.com",
      "phone": "555-1234"
    },
    "invoiceDate": "2023-10-01",
    "dueDate": "2023-10-31",
    "items": [
      { "name": "Widget", "quantity": 5, "unitPrice": 9.99 },
      { "name": "Gadget", "quantity": 4, "unitPrice": 19.99 }
    ],
    "taxRates": [5, 10],
    "discount": 0,
    "username": "harsh"
  }

Admin can delete a specific invoice by id.
API:- http://localhost:3000/api/invoices/:id method: DELETE

Admin can update payment status of a specific invoice by id.
API:- http://localhost:3000/api/invoices/:id/payment-status method: PATCH

body => {
    "paymentStatus":"overdue"
}

Admin can download a specific invoice by id.
API:- http://localhost:3000/api/invoices/:id/download method: GET

Admin can filter invoices by payment status.
API:- http://localhost:3000/api/invoices?status=paid method: GET    

user can get that own all invoices.
API:- http://localhost:3000/api/invoices method: GET

user can get that own a specific invoice by id.
API:- http://localhost:3000/api/invoices/:id method: GET

user can download that own a specific invoice by id.
API:- http://localhost:3000/api/invoices/:id/download method: GET
