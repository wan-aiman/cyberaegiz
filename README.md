# Running CyberAegiz Locally

This guide provides instructions to run the **CyberAegiz** website locally using two methods: an **easy method** with Docker and a **manual method** with Node.js and React.

---

## **Important Notes**
- Some features may require **API keys** or **database connection keys**, which are not included in the repository for security reasons.
- If you encounter issues or need access to these keys, contact us via Telegram at [t.me/wanaimanw](https://t.me/wanaimanw). 

--- 

## **Method 1: Easy Method (Using Docker)**

Docker simplifies the process of setting up and running the project by creating containers for all services (backend, frontend, and database). Follow the steps below:

### **Prerequisites**
1. Install [Docker Desktop](https://www.docker.com/get-started)

### **Steps**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/wan-aiman/cyberaegiz.git
   cd cyberaegiz
   ```

2. **Run the application**:
   Execute the following command in the root directory:
   ```bash
   docker-compose up --build
   ```
   This will:
   - Set up MongoDB as the database.
   - Run the backend server on port `5001`.
   - Start the frontend React application on port `3000`.

3. **Access the application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

4. **Stopping the application**:
   To stop the running containers, use:
   ```bash
   docker-compose down
   ```

### **Note**
- Some features (e.g., **Phishing Detection** and **Security Awareness Training**) may not work due to missing API keys and database connection keys for security reasons.
- If you need these keys, feel free to contact us via Telegram at [t.me/wanaimanw](https://t.me/wanaimanw).

---

## **Method 2: Manual Method (Using Node.js and React)**

For those who prefer setting up manually without Docker, follow the steps below.

### **Prerequisites**
1. Install [Node.js](https://nodejs.org/) (LTS version recommended).
2. Install [MongoDB](https://www.mongodb.com/try/download/community) and start the MongoDB service.
3. Install [npm](https://www.npmjs.com/) (comes with Node.js).

### **Steps**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/wan-aiman/cyberaegiz.git
   cd cyberaegiz
   ```

2. **Set up the backend (server)**:
   - Navigate to the server folder:
     ```bash
     cd server
     ```
   - Install required packages:
     ```bash
     npm install
     ```
   - Seed the database:
     ```bash
     node seed.js
     ```
   - Start the server:
     ```bash
     node server.js
     ```

3. **Set up the frontend (client)**:
   - Open a new terminal and navigate to the client folder:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

4. **Access the application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### **Stopping the application**
- Stop the Node.js server by pressing `Ctrl + C` in the terminal where it’s running.
- Stop the React development server by pressing `Ctrl + C` in its terminal.

---

We hope this guide helps you set up and explore **CyberAegiz** effectively. Let us know if you have any questions or need further assistance! 😊
