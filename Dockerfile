# Use Node.js 16 as the base image
FROM node:16-alpine

# Install build tools for bcrypt
RUN apk add --no-cache make gcc g++ python3

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Create a directory for the database if it doesn't exist
RUN mkdir -p /usr/src/app/data

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]