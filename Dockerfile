# Stage 1: Build the Angular app
FROM node:22 AS build

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de configuração do Node e instala as dependências
COPY package*.json ./
RUN npm install

# Copia os arquivos restantes e constrói o app Angular
COPY . .
RUN npm run build

# Stage 2: Serve the Angular app usando Nginx
FROM nginx:alpine

# Define o diretório de trabalho para Nginx
WORKDIR /usr/share/nginx/html

# Copia os arquivos gerados no estágio anterior para o Nginx
COPY --from=build /app/dist/codebyfernandes/browser .

# Copia uma configuração personalizada do Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exposição da porta 80 para o servidor
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
