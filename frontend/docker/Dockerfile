# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Development stage
FROM node:20-alpine as development

WORKDIR /app

# Copy from builder
COPY --from=builder /app /app

# Expose port
EXPOSE 4200

# Start development server
CMD ["npm", "start"]