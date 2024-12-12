# Income and Expense Tracker

A full-stack application to track income and expenses, visualize statistics, and manage personal finances effectively.

## Features

- **Create, Read, Update, Delete (CRUD):** Manage income and expenses.
- **Statistics Dashboard:** View summarized statistics (average, total, min, max).
- **Visualization:** Graphical representation of income and expenses.
- **Authentication:** Secure user login/signup with JWT.
- **Database:** MongoDB for storing and managing data.

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local or cloud instance)

---

## Environment Variables

The project uses the following environment variables, which need to be configured in a `.env` file in the root directory:

```env
MONGO_URI=<Your MongoDB Connection String>
PORT=<Port Number for the Server>
JWT_SECRET_KEY=<Your JWT Secret Key>
JWT_SECRET_TIME=<JWT Expiry Time, e.g., "7d">
```

### Clone the Repository
```
git clone <url>
cd income-expense-tracker
```

###  Install Dependencies
```
npm install (for server side)
cd server
npm install
```
###  Run the Application
```
npm run server
npm run dev
```
## API Endpoints

The following endpoints are available in the application:

### **Authentication**

| Method | Endpoint                | Description            |
|--------|-------------------------|------------------------|
| POST   | `/api/users/register`   | Register a new user    |
| POST   | `/api/users/login`      | Login user             |

---

### **Income**

| Method | Endpoint                | Description            |
|--------|-------------------------|------------------------|
| POST   | `/api/incomes`          | Create a new income    |
| GET    | `/api/incomes`          | Get all incomes        |
| GET    | `/api/incomes/:id`      | Get income by ID       |
| PUT    | `/api/incomes/:id`      | Update income by ID    |
| DELETE | `/api/incomes/:id`      | Delete income by ID    |

---

### **Expenses**

| Method | Endpoint                | Description             |
|--------|-------------------------|-------------------------|
| POST   | `/api/expenses`         | Create a new expense    |
| GET    | `/api/expenses`         | Get all expenses        |
| GET    | `/api/expenses/:id`     | Get expense by ID       |
| PUT    | `/api/expenses/:id`     | Update expense by ID    |
| DELETE | `/api/expenses/:id`     | Delete expense by ID    |

---

### **Statistics**

| Method | Endpoint         | Description                                  |
|--------|------------------|----------------------------------------------|
| GET    | `/api/stats`     | Get aggregated statistics for income and expenses |

---






### Customizing the README
1. Replace `<Your MongoDB Connection String>` with instructions or a placeholder value for `MONGO_URI`.
2. Update the **git clone** URL with your repository link.
3. Replace `Your Name` with your name and update the GitHub link.

### 

Let me know if you need further modifications!
