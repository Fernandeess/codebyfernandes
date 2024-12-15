# Define a imagem base para o container
FROM node:22 AS build
# Define o workspace do container
WORKDIR /app
# copia o package json para puxar as dependecias
COPY package*.json ./
# roda om npm install para baixar as dependencias
RUN npm install
# Copia todos os arquivos para /app
COPY . .
# builda projeto
RUN npm run build --prod
# Define a imagem base para o container
# FROM nginx:stable-alpine
# # ajusta arquivos de projeto
# # indica que os arquivos estão sendo copiados da etapa build definida anteriormente.
# COPY --from=build /app/dist/codebyfernandes/browser /usr/share/nginx/html
# expoe a porta 80
EXPOSE 80
# Inicia o servidor NGINX com a opção -g "daemon off;", que mantém o NGINX em primeiro plano para que o contêiner continue rodando.
# CMD ["nginx", "-g", "daemon off;"]
