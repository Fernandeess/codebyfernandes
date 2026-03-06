# GitHub Actions Workflow - Diagnóstico Completo

## 🔍 Status Atual do Workflow

**Arquivo**: `.github/workflows/docker-build-push.yml`  
**Status**: ⚠️ **COM PROBLEMAS** - Vai falhando em várias etapas

---

## 📋 Fluxo do Workflow (Como Funciona)

```
1. Push no GitHub (main/develop)
   ↓
2. GitHub Actions dispara o workflow
   ↓
3. Job: build-backend (paralelamente com frontend)
   ├─ Checkout do código
   ├─ Setup Docker Buildx
   ├─ Login Docker Hub (precisa de secrets)
   ├─ Extract metadata
   └─ Build & Push da imagem backend
   
4. Job: build-frontend (paralelamente com backend)
   ├─ Checkout do código
   ├─ Setup Docker Buildx
   ├─ Login Docker Hub (precisa de secrets)
   ├─ Extract metadata
   └─ Build & Push da imagem frontend
   
5. Job: notify (depois dos dois acima terminarem)
   └─ Mostra status de sucesso/falha
```

---

## ⚠️ PROBLEMAS ENCONTRADOS

### 1️⃣ **Falta de Secrets no GitHub**
**Problema**: O workflow tenta usar:
```yaml
secrets.DOCKER_HUB_USERNAME
secrets.DOCKER_HUB_PASSWORD
```

**Realidade**: ❌ Esses secrets NÃO EXISTEM no repositório  
**Resultado**: Login no Docker Hub **FALHA**

**Como verificar**:
1. Ir em: https://github.com/Fernandeess/codebyfernandes/settings/secrets/actions
2. Procurar por `DOCKER_HUB_USERNAME` e `DOCKER_HUB_PASSWORD`
3. Se não existem = ❌ PROBLEMA

---

### 2️⃣ **Backend Dockerfile Não Existe no Local Certo**
**Arquivo esperado**: `./backend/Dockerfile`  
**Arquivo atual**: ❌ Não existe em `./backend/Dockerfile`

```
❌ backend/Dockerfile (NÃO EXISTE)
✅ backend/pom.xml (EXISTS)
✅ backend/src/... (EXISTS)
```

**Por quê**: O Dockerfile foi criado em outro lugar ou com nome diferente

---

### 3️⃣ **Base Image Maven Não Especificada**
Se o Dockerfile existisse, ele precisaria de algo como:
```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:resolve
COPY src .
RUN mvn clean package -DskipTests
```

---

### 4️⃣ **Frontend Dockerfile - Contexto Errado**
```yaml
context: .                          # Context = raiz do projeto
file: ./frontend.Dockerfile         # Arquivo = frontend.Dockerfile
```

**Problema**: O contexto está na raiz, mas precisa de:
- `src/` (código Angular)
- `angular.json`
- `package.json`
- etc.

Quando o Docker vai fazer `COPY`, não consegue achar os arquivos!

---

### 5️⃣ **Branch Triggers Errado**
```yaml
on:
  push:
    branches:
      - main      # ❌ Seu repositório usa 'dev' não 'main'
      - develop   # ❌ Seu repositório usa 'dev' não 'develop'
```

**Resultado**: Workflow **NUNCA** dispara quando você faz push em `dev`!

---

### 6️⃣ **Cache Registry Não Configurado**
```yaml
cache-from: type=registry,ref=${{ env.REGISTRY }}/${{ env.BACKEND_IMAGE }}:buildcache
```

**Problema**: Precisa estar logado no Docker para usar cache de registry  
Se o login falhar, isso também falha em cascata.

---

## 📊 Cenários de Falha

### Cenário 1: Você faz `git push origin dev`
```
❌ Workflow não dispara
   Motivo: Está escutando 'main' e 'develop', não 'dev'
```

### Cenário 2: Você dispara manualmente (workflow_dispatch)
```
⚠️ Job checkout: ✅ Sucesso
⚠️ Job setup-buildx: ✅ Sucesso
⚠️ Job login-docker-hub: ❌ FALHA
   Motivo: secrets.DOCKER_HUB_USERNAME não existe
   
❌ Build backend: CANCELADO (porque login falhou)
❌ Build frontend: CANCELADO (porque login falhou)
❌ Notify: ✅ Executa (mas mostra falha)
```

### Cenário 3: Se tivéssemos secrets + branches corretos
```
⚠️ Checkout: ✅ Sucesso
⚠️ Login Docker: ✅ Sucesso
⚠️ Build backend: ❌ FALHA
   Motivo: backend/Dockerfile não existe
   Error: "Dockerfile not found"
   
⚠️ Build frontend: ⚠️ POSSÍVEL FALHA
   Motivo: Contexto errado, pode não achar arquivo package.json
```

---

## 🔧 O Que Precisa Ser Feito

### ✅ Passo 1: Criar Secrets no GitHub
```
Ir em: Settings → Secrets and variables → Actions → New repository secret

DOCKER_HUB_USERNAME = seu_usuario_docker_hub
DOCKER_HUB_PASSWORD = seu_token_docker_hub
```

### ✅ Passo 2: Criar Backend Dockerfile
Localização: `backend/Dockerfile`
```dockerfile
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:resolve
COPY src src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17.0.8_7-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

### ✅ Passo 3: Corrigir Branches no Workflow
```yaml
on:
  push:
    branches:
      - dev           # ← Mudar para seu branch principal
      - main
      - develop
```

### ✅ Passo 4: Corrigir Context do Frontend
```yaml
- name: Build and push frontend
  uses: docker/build-push-action@v5
  with:
    context: .
    file: ./frontend.Dockerfile
    push: ${{ github.event_name != 'pull_request' }}
```

Assegurar que `frontend.Dockerfile` tem:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/... /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

---

## 📈 Fluxo Correto (Depois de Corrigido)

```
1. git push origin dev
   ↓
2. GitHub dispara workflow (porque 'dev' está no trigger)
   ↓
3. build-backend
   ├─ Checkout: ✅
   ├─ Setup Buildx: ✅
   ├─ Login Docker: ✅ (usando secrets)
   ├─ Extract metadata: ✅
   └─ Build & Push: ✅ (porque Dockerfile existe)
   
4. build-frontend
   ├─ Checkout: ✅
   ├─ Setup Buildx: ✅
   ├─ Login Docker: ✅
   ├─ Extract metadata: ✅
   └─ Build & Push: ✅ (contexto correto)
   
5. notify
   └─ Status: ✅ Backend=success, Frontend=success
   
6. Docker Hub
   └─ Imagens: seu_usuario/blog-api:dev ✅
                seu_usuario/blog-web:dev ✅
```

---

## 🎯 Summary do Problema Atual

| Aspecto | Status | Motivo |
|---------|--------|--------|
| **Secrets** | ❌ NÃO CONFIGURADO | Não existem no repositório |
| **Backend Dockerfile** | ❌ NÃO EXISTE | Arquivo não criado |
| **Frontend Dockerfile** | ✅ EXISTE | Arquivo criado corretamente |
| **Branches Corretos** | ❌ ERRADO | Usa main/develop, você usa dev |
| **Docker Hub** | ❓ DESCONHECIDO | Não consegue fazer push (sem secrets) |
| **Build Completo** | ❌ NÃO FUNCIONA | Múltiplos pontos de falha |

---

## 🚀 Próximas Ações

Quer que eu:
1. **Corrija tudo** - Criar Dockerfile + ajustar workflow + guia de secrets
2. **Apenas diagnostique** - Deixar como está (você decide depois)
3. **Corrija por partes** - Primeiro backend, depois frontend

Qual você prefere?
