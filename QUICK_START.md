# Quick Start Guide

## 🚀 Iniciar o Sistema em 2 Minutos

### Terminal 1 - Backend
```bash
cd backend
mvn spring-boot:run
# Servidor estará em: http://localhost:8080
```

### Terminal 2 - Frontend
```bash
npm install  # (primeira vez apenas)
npm start
# Aplicação estará em: http://localhost:4200
```

## 🔐 Login - Credenciais Demo

```
Username: admin
Password: admin123
```

## 📍 Rotas Principais

| Rota | Descrição | Acesso |
|------|-----------|--------|
| http://localhost:4200/ | Home | Público |
| http://localhost:4200/blog | Blog (Posts Publicados) | Público |
| http://localhost:4200/login | Login | Público |
| http://localhost:4200/admin | Admin Dashboard | Autenticado |

## 📝 Criar Primeiro Post

1. Acesse http://localhost:4200/login
2. Digite: **admin** / **admin123**
3. Clique em "Sign In"
4. Você será redirecionado para `/admin`
5. Clique em "+ New Post"
6. Preencha o formulário:
   - **Title**: Seu título
   - **Category**: Tech / YouTube / Pop Culture
   - **Author**: Seu nome
   - **Source URL**: Link (https://medium.com/... ou https://youtube.com/...)
   - **Content**: Resumo do post
   - **Publish**: Marcar para publicar

## 🗂️ Estrutura de Arquivos

```
codebyfernandes/
├── backend/                          # Java/Spring Boot
│   ├── src/main/java/com/codebyfernandes/
│   │   ├── domain/                   # Entidades e Repositories
│   │   ├── application/              # Serviços (use cases)
│   │   ├── adapters/                 # Controllers e Persistência
│   │   ├── security/                 # JWT e Autenticação
│   │   └── config/                   # Spring Security Config
│   ├── src/test/java/                # Testes
│   └── pom.xml
│
├── src/                              # Angular Frontend
│   ├── app/
│   │   ├── pages/
│   │   │   ├── login/                # Login page
│   │   │   ├── admin/                # Admin dashboard
│   │   │   └── blog/                 # Blog público
│   │   ├── components/
│   │   │   └── post-form/            # Formulário de posts
│   │   ├── services/
│   │   │   ├── auth.service.ts       # Autenticação
│   │   │   ├── auth.guard.ts         # Route guard
│   │   │   ├── auth.interceptor.ts   # HTTP interceptor
│   │   │   └── post.service.ts       # Posts API
│   │   └── app.routes.ts             # Rotas
│   └── styles.scss
│
└── BLOG_SETUP.md                     # Documentação completa
```

## 🧪 Rodar Testes

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
ng test
# ou
npm test
```

## 🔧 Ports

- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:4200
- **H2 Console**: http://localhost:8080/h2-console
  - Username: `sa`
  - Password: (deixar vazio)

## 📱 Features Implementadas

✅ **Autenticação**
- Login com JWT
- AuthGuard para rotas privadas
- Token persistido em localStorage
- Auto logout em sessão expirada

✅ **Admin Dashboard**
- Listar todos os posts
- Criar novo post
- Editar post existente
- Deletar post
- Filtrar por categoria
- Status de publicação

✅ **Blog Público**
- Listar posts publicados
- Filtrar por categoria
- Links para recursos externos
- Responsivo em mobile

✅ **Arquitetura**
- Hexagonal Architecture no backend
- Camadas separadas (Domain, Application, Adapters)
- Testes unitários
- SOLID principles

## 🎓 Aprender Mais

Leia `BLOG_SETUP.md` para:
- Explicação detalhada da arquitetura
- Documentação completa de APIs
- Guia de testes
- Troubleshooting

## 💡 Dicas

1. **Credenciais diferentes**: Edite `JwtAuthenticationAdapter.java` (linha 23-24)
2. **Mudar porta backend**: Edite `application.yml` (server.port)
3. **Mudar porta frontend**: `ng serve --port 3000`
4. **Usar banco de dados real**: Substitua `application.yml` com PostgreSQL
5. **Deploy**: Compile com `mvn clean build` e `ng build --prod`
