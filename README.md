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
