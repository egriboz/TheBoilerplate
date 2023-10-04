# Use an official Node runtime as the base image
FROM node:18

# Create and set the working directory
WORKDIR /frontend

# Install dependencies
# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock /frontend/

# Set CI environment variable to true to ensure Yarn install runs in CI mode (optional)
RUN CI=true

# Install project dependencies using Yarn
RUN yarn

# Copy the current directory contents into the container at /frontend
COPY . /frontend/

# Build the app (replace with your build command if it's not "yarn build")
# This command will build the app for production to the build folder
RUN yarn build

# Start the app with hot reloading
# This command starts the development server with hot reloading enabled
CMD ["yarn", "dev"]
