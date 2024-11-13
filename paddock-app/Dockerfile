# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install global expo-cli (required for builds)
RUN npm install -g expo-cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the web version
RUN npx expo export -p web

# Serve stage
FROM node:18-alpine AS serve

# Copy build files from previous stage
WORKDIR /app
COPY --from=build /app/dist /app

# Expose port 3000
EXPOSE 3000

# Run `serve` to serve the static files
CMD ["npx", "serve", "-s", "/app", "-l", "3000"]