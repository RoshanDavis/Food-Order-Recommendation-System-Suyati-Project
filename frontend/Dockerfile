# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all files from the current directory to the container
COPY . .



# Start a web server to serve the built frontend
CMD ["npm", "start"]