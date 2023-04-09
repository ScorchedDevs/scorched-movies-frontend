# Estagio 1 - Responsável por gerar o build da nossa aplicação
FROM node:18 as node
WORKDIR /app
COPY . .

RUN yarn config set network-timeout 300000
RUN yarn
RUN yarn build --configuration production

# Estagio 2 - Responsável por expor nossa aplicação
FROM nginx
COPY --from=node /app/dist/scorched-movies-frontend /usr/share/nginx/html