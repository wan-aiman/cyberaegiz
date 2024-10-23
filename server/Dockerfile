# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variables (optional, as they can be overridden by Docker Compose)
ENV PORT=5001

# Expose the port for the backend service
EXPOSE 5001

# Start the application
CMD ["npm", "run", "dev"]
