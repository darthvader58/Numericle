# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files from discord-bot directory
COPY discord-bot/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript config and source code
COPY discord-bot/tsconfig.json ./
COPY discord-bot/src ./src

# Build TypeScript
RUN npm install typescript @types/node --save-dev && npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Start the bot
CMD ["npm", "start"]
