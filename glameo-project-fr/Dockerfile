# Step 1: Build the application
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . ./

# Build the app for production
RUN npm run build

# Step 2: Serve the app
FROM nginx:alpine

# Copy the build from the previous stage to the Nginx server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default port
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
