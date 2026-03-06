# 🚀 Deploy no Render com Docker

Este guia mostra como fazer deploy da aplicação Blog Management System no Render usando imagens Docker.

## 📋 Pré-requisitos

1. **GitHub**: Repositório público com o código
2. **Docker Hub**: Conta criada e credenciais configuradas
3. **Render**: Conta criada (https://render.com)
4. **Ambiente**: Node.js 18+ e Docker instalados localmente

## 🔧 Configuração Inicial

### Passo 1: Configurar GitHub Secrets

No seu repositório GitHub, vá para **Settings → Secrets and variables → Actions** e adicione:

```
DOCKER_HUB_USERNAME: seu_usuario_dockerhub
DOCKER_HUB_PASSWORD: seu_token_dockerhub
```

**Como obter o token Docker Hub:**
1. Acesse https://hub.docker.com/settings/security
2. Clique em "New Access Token"
3. Dê um nome (ex: github-actions)
4. Copie o token gerado
5. Cole em `DOCKER_HUB_PASSWORD`

### Passo 2: Fazer Push no GitHub

```bash
git add .
git commit -m "Add Docker support and GitHub Actions CI/CD"
git push origin main
```

GitHub Actions iniciará automaticamente:
- Build do backend (Java/Maven)
- Build do frontend (Angular)
- Push das imagens para Docker Hub

Monitore em: **GitHub → Actions**

### Passo 3: Verificar Imagens no Docker Hub

Após build bem-sucedido, acesse https://hub.docker.com/repositories e confirme:
- `seu_usuario/blog-api`
- `seu_usuario/blog-web`

---

## 🎯 Deploy no Render

### Opção A: Usando Web Service (Simples)

#### 1. Deploy Backend (Java API)

1. Acesse https://render.com/dashboard
2. Clique em "New +" → "Web Service"
3. Selecione "Deploy an existing image"
4. Configure:
   ```
   Image URL: docker.io/seu_usuario/blog-api:latest
   Name: blog-api
   Environment: Docker
   Plan: Free tier (para teste)
   Port: 8080
   ```
5. Clique em "Create Web Service"

**Environment Variables:**
```
SPRING_PROFILES_ACTIVE=prod
JAVA_OPTS=-Xmx512m -Xms256m
```

6. Anote a URL (ex: https://blog-api-xxx.onrender.com)

#### 2. Deploy Frontend (Angular + Nginx)

1. Clique em "New +" → "Web Service"
2. Selecione "Deploy an existing image"
3. Configure:
   ```
   Image URL: docker.io/seu_usuario/blog-web:latest
   Name: blog-web
   Environment: Docker
   Plan: Free tier
   Port: 80
   ```
4. Clique em "Create Web Service"

5. Anote a URL (ex: https://blog-web-xxx.onrender.com)

**Environment Variables:**
- Nenhuma necessária (nginx proxy configurado)

#### 3. Atualizar Configuração do Frontend

Crie/atualize o arquivo `nginx.conf` com a URL real da API:

```nginx
upstream backend {
    server blog-api-xxx.onrender.com;  # URL real do seu backend
}
```

Fazer commit e push para que GitHub Actions faça rebuild automático.

---

### Opção B: Usando Docker Compose (Recomendado)

Infelizmente, Render não suporta direto docker-compose em Free tier. Alternativas:

#### Solução 1: Railway.app (Melhor para docker-compose)

1. Acesse https://railway.app
2. Clique "New Project"
3. Selecione "Deploy from GitHub"
4. Autorize GitHub
5. Selecione seu repositório
6. Railway detectará automaticamente o `docker-compose.yml`
7. Configure variáveis de ambiente
8. Deploy automático

**Vantagens:**
- Suporta docker-compose
- Deploy automático de GitHub
- Melhor suporte a múltiplos serviços

---

## 🔄 Fluxo de Deploy Automático

```
1. Developer faz Push no GitHub
          ↓
2. GitHub Actions dispara
          ↓
3. Build Backend (Maven)
   └─ Push para Docker Hub
          ↓
4. Build Frontend (Angular)
   └─ Push para Docker Hub
          ↓
5. Render/Railway detecta nova imagem
          ↓
6. Redeploy automático
          ↓
7. Nova versão em produção ✅
```

---

## 📝 Exemplos de Configuração

### Render Backend Web Service

**Arquivo de configuração (para documentação):**

```yaml
Name: blog-api
Image URL: docker.io/seu_usuario/blog-api:latest
Port: 8080
Plan: Free
Environment:
  SPRING_PROFILES_ACTIVE: prod
  JAVA_OPTS: -Xmx512m -Xms256m
Health Check:
  Path: /api/posts
  Interval: 30s
```

### Render Frontend Web Service

```yaml
Name: blog-web
Image URL: docker.io/seu_usuario/blog-web:latest
Port: 80
Plan: Free
Health Check:
  Path: /
  Interval: 30s
```

---

## 🔐 Variáveis de Ambiente

### Backend (Render)

```
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/blog
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=seu_senha
JWT_SECRET=seu_jwt_secret_seguro_aqui
JWT_EXPIRATION=86400000
```

### Frontend

Nginx é estático, não precisa de env vars. API é configurada no `nginx.conf`.

---

## 🔗 URLs Resultantes

- **Backend API**: `https://blog-api-xxx.onrender.com`
- **Frontend Web**: `https://blog-web-xxx.onrender.com`
- **API Endpoints**:
  - Login: `https://blog-api-xxx.onrender.com/api/auth/login`
  - Posts: `https://blog-api-xxx.onrender.com/api/posts`

---

## 🚨 Troubleshooting

### Imagem não encontrada no Docker Hub

```bash
# Verificar se login está correto
docker login -u seu_usuario

# Fazer build e push manual
cd backend
docker build -t seu_usuario/blog-api:latest .
docker push seu_usuario/blog-api:latest
```

### Serviço não consegue se conectar à API

1. Verificar URL da API no `nginx.conf`
2. Certificar que backend está rodando
3. Verificar CORS em `SecurityConfig.java`
4. Logs: `render.com → Logs`

### Erro 502 Bad Gateway

1. Verificar saúde do serviço (Health Check)
2. Verificar portas (8080 para backend, 80 para frontend)
3. Verificar logs do Render

### Build muito lento ou timeout

1. Reduzir tamanho das imagens
2. Usar multi-stage builds (já implementado)
3. Aumentar timeout nas settings

---

## ✅ Checklist de Deploy

- [ ] GitHub Secrets configurados (DOCKER_HUB_USERNAME, DOCKER_HUB_PASSWORD)
- [ ] Repositório em GitHub (público)
- [ ] Dockerfile criado para backend
- [ ] frontend.Dockerfile criado
- [ ] nginx.conf configurado
- [ ] GitHub Actions rodando com sucesso
- [ ] Imagens em Docker Hub (blog-api, blog-web)
- [ ] Backend deployado no Render
- [ ] Frontend deployado no Render
- [ ] CORS configurado para produção
- [ ] Testado login com credenciais
- [ ] Testado CRUD de posts

---

## 🔄 Atualizar Deploy

Para atualizar a aplicação em produção:

```bash
# 1. Fazer mudanças no código
git add .
git commit -m "Fix: description"

# 2. Push para GitHub (trigger automático)
git push origin main

# 3. Aguardar GitHub Actions completar
# 4. Render fará redeploy automaticamente

# Monitorar em: render.com → Deployments
```

---

## 🛠️ Desenvolvimento Local com Docker

### Build local

```bash
# Backend
cd backend
docker build -t blog-api:dev .

# Frontend
docker build -f frontend.Dockerfile -t blog-web:dev .
```

### Rodar com docker-compose

```bash
# Produção
docker-compose up --build

# Desenvolvimento
docker-compose -f docker-compose.dev.yml up
```

---

## 📊 Custos no Render

**Plano Free:**
- Limitado a 2 serviços web
- Max 512MB RAM por serviço
- Coloca serviço em sleep após 15 min inatividade
- Ideal para desenvolvimento/testing

**Upgrade para Paid:**
- Serviços sempre ativos
- Mais RAM (1-2GB+)
- Melhor performance
- Recomendado para produção

---

## 🎓 Próximas Melhorias

Para ambiente de produção real:

1. **PostgreSQL Database**
   - Usar Render Postgres (não Free)
   - Substituir H2 em memory

2. **Environment-specific configs**
   - Secrets diferentes por env
   - URLs de API por ambiente

3. **SSL/TLS**
   - Render fornece automaticamente
   - Custom domain (pago)

4. **Monitoring & Logs**
   - Integrar com Sentry
   - Logs centralizados

5. **CI/CD Avançado**
   - Testes automáticos antes de deploy
   - Aprovação manual antes de produção
   - Rollback automático em erros

---

## 📞 Suporte

- **Render Docs**: https://render.com/docs
- **GitHub Actions**: https://docs.github.com/actions
- **Docker Hub**: https://hub.docker.com/
- **Railway Alternative**: https://railway.app/docs

---

**Seu aplicativo está pronto para cloud! 🚀**
