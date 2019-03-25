FROM node:10.14-stretch-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY index.js .
COPY server.js .
COPY db.js .
COPY contratoModeldb.js .
# COPY userModel.js .
# COPY indexRouter.js .
# COPY userCtrl.js .
# COPY presupuestoCtrl.js .
COPY setupdb.js .
COPY apikeys.js .
COPY dist dist

#RUN ng build --prod
ENV NODE_ENV=production

EXPOSE 4000
CMD npm start