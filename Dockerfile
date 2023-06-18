# Build image
FROM node:18-alpine as builder
WORKDIR /app
# Not sure if you will need this
# RUN apk add --update openssl
COPY tsconfig*.json ./
COPY package*.json ./
RUN npm ci --quiet
COPY ./prisma prisma
COPY ./src src
RUN npm run postinstall
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app
# ENV NODE_ENV production
COPY tsconfig*.json ./
COPY package*.json ./
RUN npm ci --only=production --quiet
COPY --chown=node:node --from=builder /app/prisma /app/prisma
COPY --chown=node:node --from=builder /app/dist /app/dist
RUN npm run postinstall
USER node
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
