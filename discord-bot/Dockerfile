# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript config and source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm install typescript @types/node --save-dev && npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Start the bot
CMD ["npm", "start"]
