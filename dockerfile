# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Set environment variables for the backend
ENV FRONTEND_URL=http://localhost:3000
ENV ROUTES_FILE_PATH=routes.txt

# Build the TypeScript application
RUN npm run build

# Expose port 3001 to the host machine
EXPOSE 3001

# Start the NestJS application
CMD ["npm", "run", "start:prod"]