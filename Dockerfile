# Estagio 1 - Responsável por gerar o build da nossa aplicação
FROM node:18 as node
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn config set network-timeout 300000

RUN yarn
COPY ./ /app/
RUN yarn build --configuration production

# Estagio 2 - Responsável por expor nossa aplicação
FROM nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf