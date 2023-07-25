# Fetch base image
FROM node:18.16-alpine3.17
# Create Work directory on image
WORKDIR /usr/src/app
# copy package.json file to image
COPY package*.json ./
# Run the npm install command in-side image to install dependencies
# installing nodemon in global scope in the image
RUN npm install --global nodemon
RUN npm install --only=production
# Copy app files to image
COPY . .
# Define Port that will be exposed from container where this image will be hosted
EXPOSE 9001
# Run the Application in-side the image
# "strat" is in package.json that executes nodemon
CMD [ "npm","start" ]