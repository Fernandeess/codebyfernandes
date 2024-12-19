# Stage 1: Build the Angular app
FROM node:22 AS build

# Define the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files and build the Angular app
COPY . .
RUN npm run build --watch

# Stage 2: Serve the Angular app
FROM node:22

# Define the working directory for the final image
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app/dist/codebyfernandes/browser /app/dist

# Install a lightweight HTTP server
RUN npm install -g http-server

# Expose the port Traefik will use to access the app
EXPOSE 80

# Start the HTTP server to serve the Angular files
CMD ["http-server", "dist", "-p", "80"]
