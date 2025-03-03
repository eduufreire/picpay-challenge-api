FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app/
RUN npx prisma generate
RUN npm run build


# ==============================================


FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder /app/package*.json .
RUN npm i --only=production 

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate

EXPOSE 8080
