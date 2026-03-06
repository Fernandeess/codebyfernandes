# Blog Management System - Setup Guide

Este documento descreve como executar o sistema completo de Blog com Admin Dashboard.

## 🏗️ Arquitetura

### Backend (Java/Spring Boot)
- **Arquitetura Hexagonal** com separação de responsabilidades:
  - **Domain Layer**: Entidades, repositórios e exceções
  - **Application Layer**: Serviços de negócio (use cases)
  - **Adapters Layer**: Controllers REST e persistência com JPA
  - **Config Layer**: Configurações de segurança e aplicação

- **Segurança**: 
  - JWT (JSON Web Tokens) para autenticação stateless
  - Spring Security com roles e autorização
  - CORS configurado para o frontend

- **Banco de Dados**: H2 em memória (ideal para desenvolvimento)

### Frontend (Angular 17)
- **Componentes Standalone**: Sem módulos
- **Lazy Loading**: Rotas protegidas com AuthGuard
- **State Management**: BehaviorSubject para estado de autenticação
- **HTTP Interceptor**: Adiciona token JWT automaticamente
- **LocalStorage**: Persiste token e username entre sessões

## 🚀 Como Executar

### Pré-requisitos
- Java 17+
- Node.js 18+
- npm ou yarn

### 1. Backend - Java/Spring Boot

```bash
# Navegue para a pasta backend
cd backend

# Compile e execute com Maven
mvn clean install
mvn spring-boot:run

# A aplicação estará disponível em http://localhost:8080
# H2 Console: http://localhost:8080/h2-console
```

**Credenciais padrão (hardcoded para demo):**
- Username: `admin`
- Password: `admin123`

### 2. Frontend - Angular

```bash
# Na pasta raiz do projeto
npm install

# Execute o servidor de desenvolvimento
ng serve
# ou
npm start

# Acesse http://localhost:4200
```

## 📄 Estrutura de Rotas

### Public Routes
- `/` - Home
- `/about` - Sobre
- `/projects` - Projetos
- `/experiences` - Experiências
- `/blog` - Blog (posts publicados)
- `/login` - Login para admin

### Protected Routes (Requer autenticação)
- `/admin` - Admin Dashboard (CRUD de posts)

## 🔐 Fluxo de Autenticação

1. Usuário acessa `/login`
2. Submete credenciais (admin/admin123)
3. Backend valida e retorna JWT
4. Frontend armazena token em `localStorage`
5. `AuthInterceptor` adiciona token em todas as requisições
6. Usuário é redirecionado para `/admin`
7. `AuthGuard` protege rotas privadas
8. Se token expirar, usuário é redirecionado para login

## 📋 API Endpoints

### Authentication
```
POST /api/auth/login
Body: { username: string, password: string }
Response: { token: string, username: string, message: string }
```

### Posts (Public)
```
GET /api/posts              # Lista todos os posts (admin)
GET /api/posts/published    # Lista posts publicados
GET /api/posts/{id}         # Get post por ID
```

### Posts (Protected)
```
POST /api/posts             # Criar novo post
PUT /api/posts/{id}         # Atualizar post
DELETE /api/posts/{id}      # Deletar post
```

## 🧪 Testes

### Backend
```bash
cd backend

# Executar todos os testes
mvn test

# Testes específicos
mvn test -Dtest=JwtAuthenticationAdapterTest
mvn test -Dtest=PostServiceImplTest
```

**Testes inclusos:**
- `JwtAuthenticationAdapterTest`: Validação de token JWT
- `PostServiceImplTest`: Lógica de negócio de posts
- Validação de URLs e exception handling

### Frontend
```bash
# Executar testes Angular
ng test

# Testes específicos
ng test --include='**/login.component.spec.ts'
ng test --include='**/admin.component.spec.ts'
ng test --include='**/post-form.component.spec.ts'
```

## 📝 Funcionalidades

### Admin Dashboard
- ✅ Listagem de todos os posts (publicados e rascunhos)
- ✅ Criar novo post
- ✅ Editar post existente
- ✅ Deletar post
- ✅ Filtrar por categoria
- ✅ Status de publicação (Draft/Published)
- ✅ Logout

### Blog Public
- ✅ Listagem de posts publicados
- ✅ Filtrar por categoria (Tech, YouTube, Pop Culture)
- ✅ Links para Medium, Dev.to, YouTube
- ✅ Responsivo em mobile

### Post Categories
- **Tech**: Artigos sobre tecnologia (Medium, Dev.to)
- **YouTube**: Vídeos do YouTube
- **Pop Culture**: Comentários sobre cultura pop

## 📚 Estrutura de Dados

### Post Entity
```typescript
{
  id: number,
  title: string,              // Obrigatório
  category: string,           // tech | youtube | pop-culture
  content: string,            // Resumo/descrição do post
  sourceUrl: string,          // Link externo (http/https)
  author: string,             // Nome do autor
  published: boolean,         // Draft ou Publicado
  createdAt: LocalDateTime,
  updatedAt: LocalDateTime
}
```

## 🛡️ Storage de Autenticação

O frontend armazena autenticação no **localStorage**:

```javascript
// Token JWT
localStorage.setItem('auth_token', token);

// Username para exibição
localStorage.setItem('username', username);
```

**Por que localStorage?**
- Persiste entre abas do navegador
- Simples para implementar
- Ideal para Single Page Application

**Segurança:**
- Token é incluído apenas em requisições HTTPS
- `AuthInterceptor` valida respostas 401
- Token expira em 24 horas (configurável)

**Alternativa: HttpOnly Cookies**
Para máxima segurança, adicione ao backend:
```yaml
server:
  servlet:
    session:
      cookie:
        http-only: true
        secure: true
        same-site: strict
```

## 🎨 Design/Styling

- **Color Scheme**: Dark navy (#040916) + Bright blue (#007bff)
- **Typography**: Montserrat sans-serif
- **Components**: PrimeNG + Custom SCSS
- **Responsiveness**: Mobile-first design
- **Animations**: Smooth transitions e hover effects

## 🔄 Fluxo de Desenvolvimento

1. **Fazer changes no código**
2. **Frontend**: `ng serve` recompila automaticamente
3. **Backend**: Use `mvn spring-boot:run` com hot reload ou reinicie
4. **Testes**: Rode antes de commit

## 📖 Validação de URLs

O sistema valida URLs de fonte:

```
✅ https://medium.com/@user/article
✅ https://dev.to/user/article
✅ https://youtube.com/watch?v=dQw4w9WgXcQ
✅ https://youtu.be/dQw4w9WgXcQ
❌ medium.com/article (sem https://)
❌ ftp://example.com (protocolo inválido)
```

## 🐛 Troubleshooting

### Backend não inicia
```bash
# Verificar porta 8080
lsof -i :8080

# Limpar cache Maven
mvn clean
```

### Frontend não conecta ao backend
```bash
# Verificar se backend está rodando
curl http://localhost:8080/api/auth/login

# Verificar CORS em SecurityConfig
```

### Token expirado
- Fazer logout e login novamente
- Token é válido por 24 horas

## 📦 Dependências Principais

### Backend
- `spring-boot-starter-web`: REST APIs
- `spring-boot-starter-security`: Autenticação
- `spring-boot-starter-data-jpa`: Persistência
- `jjwt`: JWT token generation/validation
- `h2database`: Banco em memória

### Frontend
- `@angular/core`: Framework
- `@angular/common/http`: HTTP client
- `@angular/forms`: Reactive forms
- `@angular/router`: Routing e guards
- `primeng`: Component library

## 📝 Próximas Melhorias

- [ ] Implementar autenticação com banco de dados
- [ ] Hash de passwords com BCrypt
- [ ] Refresh tokens
- [ ] Upload de imagens
- [ ] Comments em posts
- [ ] Share em redes sociais
- [ ] SEO (meta tags dinâmicas)
- [ ] Sitemap e RSS feed
