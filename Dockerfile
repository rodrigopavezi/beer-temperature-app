FROM node:latest

ADD . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]