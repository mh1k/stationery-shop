# Stationery Shop

This project is a Stationery Shop API built with Node.js, Express, TypeScript, and MongoDB - using Mongoose. The API manages stationery products and orders while ensuring data validation.

---

### **Features :**

1. **Product Management**
 - Add Data, update data, get all data, get single data, and delete stationery product data.
 - Filter products by category.
  
2. **Order Management**
 - Place orders(create order) for products with inventory control.
 - Automatically update product and stock while placing an order.
 - Revenue Calculation using aggregation
  
3. **Data Validation and Error Handling**
 - validation for product and order data using Mongoose schema validation.
 - error messages for validation failures, if data is not found, and other issues.

---

### **Technology Used**
 - Node.js
 - Express
 - Typescript
 - MongoDB
 - Mongoose
 - Eslint
 - Prettier
 - ts-node-dev

---

### **Folder Structure**
**Feature-Based Pattern (Modular)**
```
stationery-shop/
│
├── src/
│   ├── app/
│   │   ├──── config/
│   │   │     ├──── index.ts
│   │   │
│   │   ├──── modules/
│   │   │     ├─── product/
│   │   │     │   ├── product.interface.ts
│   │   │     │   ├── product.model.ts
│   │   │     │   ├── product.routes.ts
│   │   │     │   ├── product.service.ts
│   │   │     │   └── product.controller.ts
│   │   │     ├── order/
│   │   │     │   ├── order.interface.ts
│   │   │     │   ├── order.model.ts
│   │   │     │   ├── order.routes.ts
│   │   │     │   ├── order.service.ts
│   │   │     │   └── order.controller.ts
│   │   
│   ├── app.ts
│   └── server.ts
│
├── node modules
├── .env
├── .pretierignore
├── .orettierrc
├── eslint.config.ms
├── tsconfig.json
├── package-lock.json
└── package.json

```
---

### Setup Instruction for run the project locally

1. Clone the Repository
    ```
   git clone https://github.com/mh1k/stationery-shop.git
   cd stationery-shop
   ```
2. Install Dependencies
   ```
   npm install
   ```
3. Environment Variables
   create a **`.env`** in project root and add the this
   ```
   NODE_ENV = delvelopment
   PORT=5000
   DATABASE_URL= mongoDB URI
   ```
4. Run the application in the development Mode
   ```
   npm run start:dev
   ```
5. Access the api
   when server is running, API will accessible at
   ```
   http://localhost:5000
   ```
***
### **Development Command - Custom Script**
in **`package.json`** file

```
 "scripts": {
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write src",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "start:pro": "node dist/server.js",
  },
```
| command                 | details                                                                             |
|-------------------------|-----------------------------------------------------------------------------|
|**`npm run start:dev`**  | run the application using ts-node-dev. by using this we can run .ts file| 
|**`npm run start:pro`**  | run the application .js file using node |
|**`npm run lint`**       | find out the error using eslint |
|**`npm run lint:fix`**   | find out the error and fix the error using eslint |
|**`npm run format`**     | using prettier format the code |

---
### **Available Endpoints**
**Product Endpoints**

| method      | endpoint                               | deatails    |
|-------------|----------------------------------------|-------------|
| POST        | **`/api/products`**                    | create a product |
| GET         | **`/api/products?serachTerm=(name/brand/category)`** | get all product by query or without query |
| GET         | **`/api/products/productID`**          | get single product by product id |
| PUT         | **`/api/products/productID`**          | update the product by product id |
| DELETE      | **`/api/products/productID`** | delete the product by product id |

**Order Endpoints**

| method      | endpoint                               | deatails    |
|-------------|----------------------------------------|-------------|
| POST        | **`/api/orders`**                    | create a order/ placed order |
| GET         | **`/api/orders`** | get all orders |
| DELETE         | **`/api/orders/:orderID`** | delete the product by order Id |
| GET         | **`/api/products/revenue`**          | calculation the orders revenue |

---

### Thank you 🙂 Stay positive, keep learning, and always strive for excellence 
