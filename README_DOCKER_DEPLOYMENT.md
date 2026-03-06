# 🐳 Docker & Deployment Guide

> Guia completo para containerizar, fazer build e deploy da aplicação Blog Management System

## 📋 Índice

1. [Docker Basics](#docker-basics)
2. [Build Local](#build-local)
3. [Docker Compose](#docker-compose)
4. [GitHub Actions](#github-actions)
5. [Deploy Render](#deploy-render)
6. [Deploy Railway](#deploy-railway)
7. [Troubleshooting](#troubleshooting)

---

## 🐳 Docker Basics

### Verificar Instalação

```bash
docker --version
docker-compose --version
```

### Build Images

**Backend:**
```bash
cd backend
docker build -t blog-api:latest .
```

**Frontend:**
```bash
docker build -f frontend.Dockerfile -t blog-web:latest .
```

---

## 🏗️ Build Local

### Backend Image

```bash
cd backend

# Build
docker build -t blog-api:1.0.0 .

# Run
docker run -p 8080:8080 blog-api:1.0.0

# Test
curl http://localhost:8080/api/posts
```

**Verificar imagem:**
```bash
docker images | grep blog-api
```

### Frontend Image

```bash
# Build
docker build -f frontend.Dockerfile -t blog-web:1.0.0 .

# Run
docker run -p 80:80 blog-web:1.0.0

# Test
open http://localhost
```

---

## 🔗 Docker Compose

### Produção (Production)

```bash
docker-compose up --build
```

**Acesso:**
- Frontend: http://localhost
- Backend: http://localhost:8080

**Stop:**
```bash
docker-compose down
```

### Desenvolvimento (Development)

Com hot-reload automático:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

**Características:**
- Volumes mapeados
- Node.js rodando direto (não imagem)
- Reload automático em mudanças

**Parar:**
```bash
docker-compose -f docker-compose.dev.yml down
```

---

## 🔄 GitHub Actions CI/CD

### Configuração

1. **Secrets no GitHub:**
   ```
   DOCKER_HUB_USERNAME = seu_usuario
   DOCKER_HUB_PASSWORD = seu_token
   ```

2. **Workflow automático:**
   - Arquivo: `.github/workflows/docker-build-push.yml`
   - Trigger: Push em `main` ou `develop`

3. **Pipeline:**
   ```
   GitHub Push
      ↓
   Build Backend + Build Frontend
      ↓
   Push Docker Hub
      ↓
   Render Webhook (opcional)
      ↓
   Auto Deploy
   ```

### Monitorar

```bash
# GitHub Dashboard
Repo → Actions → docker-build-push

# Docker Hub
hub.docker.com/repositories
```

### Obter Token Docker Hub

1. https://hub.docker.com/settings/security
2. "New Access Token"
3. Nome: github-actions
4. Copiar token
5. Colar em GitHub Secrets

---

## 🚀 Deploy Render

### Requisitos

- Conta Render (https://render.com)
- Imagens em Docker Hub
- GitHub Secrets configurados

### Step 1: Deploy Backend

1. **Render Dashboard → New+ → Web Service**
2. **Deploy an existing image**
3. Configure:
   ```
   Image URL: docker.io/seu_usuario/blog-api:latest
   Name: blog-api
   Port: 8080
   Plan: Free (para teste)
   ```
4. **Create Web Service**
5. Aguarde deploy (~5-10 min)
6. **Copiar URL:** https://blog-api-xxx.onrender.com

### Step 2: Deploy Frontend

1. **Render Dashboard → New+ → Web Service**
2. **Deploy an existing image**
3. Configure:
   ```
   Image URL: docker.io/seu_usuario/blog-web:latest
   Name: blog-web
   Port: 80
   Plan: Free
   ```
4. **Create Web Service**
5. Copiar URL: https://blog-web-xxx.onrender.com

### Step 3: Conectar Frontend ao Backend

Editar `nginx.conf`:

```nginx
upstream backend {
    server blog-api-xxx.onrender.com;  # Sua URL real
}
```

Fazer commit e push:
```bash
git add nginx.conf
git commit -m "Update backend URL for Render"
git push origin main
```

GitHub Actions fará rebuild automático.

### Step 4: Verificar Deploy

- Frontend: https://blog-web-xxx.onrender.com
- Backend: https://blog-api-xxx.onrender.com/api/posts
- Login: admin / admin123

---

## 🚂 Deploy Railway (Alternativa)

Railway suporta `docker-compose` nativamente.

### Setup

1. **Conta Railway:** https://railway.app
2. **Conectar GitHub**
3. **Selecionar repositório**
4. **Railway detecta docker-compose.yml**
5. **Configurar variáveis de ambiente**
6. **Deploy automático**

**Vantagens:**
- Suporta docker-compose
- Deploy mais simples
- Free tier melhor

---

## 🔐 Variáveis de Ambiente

### Backend (Render)

```
SPRING_PROFILES_ACTIVE=prod
JAVA_OPTS=-Xmx512m -Xms256m
JWT_SECRET=seu_secret_aqui
CORS_ALLOWED_ORIGINS=https://seu_domain.com
```

### Frontend

Nenhuma necessária (estático + Nginx).

---

## 📊 Tamanho das Imagens

```bash
docker images | grep blog
```

**Esperado:**
- blog-api: 150-200MB
- blog-web: 30-50MB

**Otimizar:**
- Multi-stage builds ✓ (já implementado)
- Alpine base ✓
- Remove build artifacts ✓

---

## 🔍 Debug & Logs

### Build locally first

```bash
# Logs detalhados
docker-compose up --build --no-detach

# Ou
docker-compose logs -f
```

### Ver imagem

```bash
# Listar
docker images

# Inspecionar
docker inspect blog-api:latest

# Tag
docker tag blog-api:latest seu_usuario/blog-api:1.0.0
```

### Push Docker Hub

```bash
docker login -u seu_usuario
docker push seu_usuario/blog-api:latest
docker push seu_usuario/blog-web:latest
```

---

## ⚡ Performance

### Otimizações Implementadas

**Backend:**
- ✅ Multi-stage build (3x menor)
- ✅ Alpine Linux (14MB base)
- ✅ Maven cache layers
- ✅ JRE-only (sem JDK)

**Frontend:**
- ✅ Multi-stage build (remove node_modules)
- ✅ Nginx Alpine
- ✅ Gzip compression
- ✅ Asset caching headers

### Tempos de Build

- Backend: ~3-5 min (primeira vez)
- Frontend: ~2-3 min (primeira vez)
- Cache: ~30s-1min (builds seguintes)

---

## 🚨 Troubleshooting

### "Cannot connect to Docker daemon"

```bash
# Iniciar Docker Desktop ou daemon
docker ps  # Teste
```

### "Image not found on Docker Hub"

```bash
# Push manual
docker login
docker push seu_usuario/blog-api:latest
docker push seu_usuario/blog-web:latest

# Verificar
curl https://hub.docker.com/v2/repositories/seu_usuario/blog-api
```

### "502 Bad Gateway no Render"

1. Verificar status do backend (Render Dashboard)
2. Verificar logs: **Render → Logs**
3. Verificar health check endpoint
4. Dar mais tempo para startup

### "Frontend não consegue conectar ao backend"

1. Verificar URL em `nginx.conf`
2. Verificar CORS em `SecurityConfig.java`
3. Testar curl direto:
   ```bash
   curl https://blog-api-xxx.onrender.com/api/posts
   ```

### Build muito lento

1. Limpar cache Docker:
   ```bash
   docker system prune -a
   ```
2. Usar buildkit:
   ```bash
   DOCKER_BUILDKIT=1 docker build .
   ```

---

## ✅ Checklist Deployment

- [ ] Docker instalado
- [ ] Dockerfile criado para backend
- [ ] frontend.Dockerfile criado
- [ ] nginx.conf configurado
- [ ] .dockerignore criado
- [ ] docker-compose.yml funcional
- [ ] GitHub Actions rodando
- [ ] Docker Hub configurado
- [ ] Imagens sendo feitas push
- [ ] Render account criado
- [ ] Backend deployado
- [ ] Frontend deployado
- [ ] CORS configurado para produção
- [ ] Testado login em produção

---

## 📚 Arquivos Criados

```
├── Dockerfile (backend)
├── frontend.Dockerfile
├── .dockerignore
├── nginx.conf
├── docker-compose.yml
├── docker-compose.dev.yml
├── .github/workflows/docker-build-push.yml
├── DOCKER_GUIDE.md
├── DEPLOY_RENDER.md
└── .env.example
```

---

## 🎓 Próximas Melhorias

- [ ] PostgreSQL no Render
- [ ] Custom domain (pago)
- [ ] SSL/TLS (Render inclui)
- [ ] Monitoring + Alerts
- [ ] Auto-scaling
- [ ] CDN para assets
- [ ] Container registry privado

---

**Tudo pronto para cloud! 🚀**
