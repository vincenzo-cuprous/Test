# Use a Node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the static files
RUN npm run build

# Expose the port your Express.js app is running on (e.g., 3000)
EXPOSE 3000

# Set the command to start the Express.js app
CMD ["npm", "start"]