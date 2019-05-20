FROM node:12
WORKDIR /patientaccountapi

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
# ENV NODE_ENV http://*:8080
# HEALTHCHECK --interval=30s --timeout=3s --retries=1 CMD curl --silent --fail http://localhost:7000/hc || exit 1

RUN npm install -g nodemon

CMD [ "nodemon", "server.js" ]
