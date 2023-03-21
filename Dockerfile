# Prisma doesn't support node:alpine so I need to used normal version
# This version is not optimized and cause a lot of image size
FROM node:19

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]