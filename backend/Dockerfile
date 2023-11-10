# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/smsArchiver/backend

COPY backend/package*.json ./
COPY backend/tsconfig.json ./

# RUN npm install
RUN npm ci

# Copy the rest of the source files into the image.
COPY ./backend .

RUN chmod +x ./prisma.sh
RUN ./prisma.sh

# RUN npx prisma generate

# Production stage
FROM base as production

# Use production node environment by default.
ENV NODE_ENV production

# Expose the port that the application listens on.
EXPOSE 8000

# Run the application.
CMD node -r module-alias/register ./dist --env=production
