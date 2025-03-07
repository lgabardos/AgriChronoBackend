FROM node:20.17-alpine AS builder
ENV NODE_ENV=production

COPY package-lock.json /app/
COPY package.json /app/
COPY package-lock.json /app/
COPY tsconfig.prod.json /app/tsconfig.json
COPY src/ /app/
WORKDIR /app

RUN npm install
CMD npm start
# RUN npm run dockerbuild

# FROM alpine:3.18.3

# ENV NODE_ENV=production

# COPY --from=builder /app/index /index

# CMD /index