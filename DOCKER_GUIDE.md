# 🐳 Docker Quick Start Guide

## Executar com Docker Localmente

### Opção 1: Docker Compose (Recomendado)

```bash
# Build e inicia ambos os serviços
docker-compose up --build

# Parar
docker-compose down
```

**Acessar:**
- Frontend: http://localhost
- Backend API: http://localhost:8080
- API Docs: http://localhost:8080/api/posts

### Opção 2: Desenvolvimento com Hot Reload

```bash
# Build e inicia com volumes para reload automático
docker-compose -f docker-compose.dev.yml up --build

# Seu código será recarregado automaticamente
```

### Opção 3: Build Manual

```bash
# Backend
cd backend
docker build -t blog-api:latest .
docker run -p 8080:8080 blog-api:latest

# Frontend (em outro terminal)
docker build -f frontend.Dockerfile -t blog-web:latest .
docker run -p 80:80 blog-web:latest
```

---

## 📝 Arquivo Dockerfile Explicado

### Backend (Multistage)

```dockerfile
# Stage 1: Build com Maven
FROM maven:3.9.4-eclipse-temurin-17 AS builder
# Baixa dependências
# Compila código Java

# Stage 2: Runtime leve
FROM eclipse-temurin:17-jre-alpine
# Copia JAR compilado do stage 1
# Inicia aplicação
```

**Benefícios:**
- Imagem final ~150MB (vs 500MB sem multi-stage)
- Apenas Java runtime (sem Maven)
- Build cache otimizado

### Frontend (Multistage)

```dockerfile
# Stage 1: Build com Node
FROM node:20-alpine AS builder
# npm install
# npm run build (Angular compilation)

# Stage 2: Serve com Nginx
FROM nginx:alpine
# Copia build estático
# Nginx serve + proxy para API
```

**Benefícios:**
- Build apenas em runtime (não produção)
- Nginx ultra-leve
- Proxy integrado para backend

---

## 🚀 GitHub Actions Workflow

Quando você faz `git push`:

1. **Trigger**: Push na branch `main` ou `develop`
2. **Build Backend**: Maven compila → Docker image
3. **Build Frontend**: Angular build → Docker image
4. **Push Docker Hub**: Imagens vão para seu repositório
5. **Deploy Render**: Detecta nova imagem e redeploy (automático)

**Status**: Monitore em `GitHub → Actions → docker-build-push`

---

## 🔐 Configurar GitHub Secrets

```bash
# 1. Criar token no Docker Hub
#    Settings → Security → New Access Token

# 2. No GitHub
#    Repo Settings → Secrets and variables → Actions
#    Adicionar:
#    - DOCKER_HUB_USERNAME
#    - DOCKER_HUB_PASSWORD

# 3. Fazer push no GitHub
git push origin main

# 4. Ver build rodando em Actions
```

---

## 📦 Estrutura das Imagens

```
blog-api
├── Java 17 Runtime (Alpine)
├── blog-api.jar (compiled app)
└── Port 8080

blog-web
├── Nginx (Alpine)
├── Angular build (dist/)
├── nginx.conf (proxy + SPA routing)
└── Port 80
```

---

## 🔗 Docker Hub URLs

Após push bem-sucedido:

```
docker.io/seu_usuario/blog-api:latest
docker.io/seu_usuario/blog-web:latest
```

**Ver em**: https://hub.docker.com/repositories

---

## 🔄 Ciclo de Desenvolvimento

```
1. Editar código localmente
2. Testar com docker-compose
3. Commit e push no GitHub
4. GitHub Actions faz build
5. Push automático no Docker Hub
6. Render detecta e redeploy
7. Novo código em produção ✅
```

---

## ⚡ Otimizações Implementadas

### Backend
- ✅ Multi-stage build (reduz size 3x)
- ✅ Alpine base image (14MB vs 300MB)
- ✅ Cache layers (dependencies separado)
- ✅ Health checks

### Frontend
- ✅ Multi-stage build (remove node_modules)
- ✅ Nginx gzip compression
- ✅ Asset caching
- ✅ SPA routing integrado

---

## 📊 Tamanho das Imagens

**Esperado:**
- blog-api: ~150-200MB
- blog-web: ~30-50MB

**Verificar:**
```bash
docker images | grep blog
```

---

## 🔧 Troubleshooting

### Erro: "Cannot connect to Docker daemon"
```bash
# Iniciar Docker Desktop ou daemon
docker ps  # Teste
```

### Porta já em uso
```bash
# Mude a porta em docker-compose.yml
# Ex: "8081:8080" em vez de "8080:8080"
```

### Build muito lento
```bash
# Use cache da próxima vez
docker-compose build --no-cache
# Próximos builds serão mais rápidos
```

### Imagem não encontrada
```bash
# Build localmente primeiro
docker-compose build
```

---

## 📚 Próximos Passos

1. **Testar localmente**: `docker-compose up`
2. **Configurar secrets**: GitHub → Secrets
3. **Fazer push**: Trigger automatic build
4. **Deploy Render**: Criar web services
5. **Monitorar**: Render dashboard

---

Quer ajuda com algum passo? 🚀
