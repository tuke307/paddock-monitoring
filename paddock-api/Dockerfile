# Stage 1: Build
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project except for excluded files in .dockerignore
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:18 AS production

# Set working directory
WORKDIR /app

# Copy necessary files for production
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist /app/dist
COPY --from=build /app/public /app/public
COPY --from=build /app/node_modules /app/node_modules

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
