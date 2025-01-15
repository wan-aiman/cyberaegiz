# CyberAegiz - Running Locally with Docker

Follow these instructions to run the CyberAegiz website locally using Docker. This guide assumes you have Docker and Docker Compose installed on your system.

---

## Prerequisites

1. **Install Docker**: Download and install Docker Desktop from [here](https://www.docker.com/products/docker-desktop/).
2. **Clone the Repository**:
   ```bash
   git clone https://github.com/wan-aiman/cyberaegiz.git
   cd cyberaegiz
   ```

---

## Running the Application

1. **Build and Run the Containers**:
   In the root directory of the project (where the `docker-compose.yml` file is located), run:
   ```bash
   docker-compose up --build
   ```

2. **Verify the Containers**:
   Ensure that all services (MongoDB, server, and client) are running:
   ```bash
   docker ps
   ```

3. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Project Structure in Docker

- **MongoDB**:
  - A MongoDB database running on port `27017` within the container.
- **Backend (Server)**:
  - The backend Node.js server runs on port `5001`.
  - Connects to MongoDB using the environment variable `MONGO_URI`.
- **Frontend (Client)**:
  - React-based frontend application accessible at `http://localhost:3000`.

---

## Stopping the Application

To stop and remove the containers, run:
```bash
docker-compose down
```

---

## Seeding the Database

The `docker-compose.yml` is configured to run the database seeding script (`node seed.js`) automatically before starting the backend server. This ensures your database is prepopulated.

---

## Troubleshooting

1. **Port Conflicts**:
   Ensure the ports `27017`, `5001`, and `3000` are not being used by other applications. If needed, update the `docker-compose.yml` file to use different ports.

2. **Rebuilding Containers**:
   If you make changes to the source code, rebuild the containers:
   ```bash
   docker-compose up --build
   ```

3. **Logs**:
   Check logs for debugging:
   ```bash
   docker-compose logs
   ```

---

That's it! You now have CyberAegiz running locally using Docker. 🚀
