#!/bin/bash

# Blog Management System - Setup Script
# Este script automatiza o setup inicial do projeto

set -e

echo "╔════════════════════════════════════════════════════╗"
echo "║  Blog Management System - Setup                    ║"
echo "╚════════════════════════════════════════════════════╝"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check requirements
echo -e "\n${BLUE}Verificando pré-requisitos...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js não está instalado${NC}"
    echo "  Baixe em: https://nodejs.org"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js${NC} $NODE_VERSION"
fi

# Check Java
if ! command -v java &> /dev/null; then
    echo -e "${RED}✗ Java não está instalado${NC}"
    echo "  Baixe em: https://adoptopenjdk.net"
    exit 1
else
    JAVA_VERSION=$(java -version 2>&1 | grep 'version' | head -1)
    echo -e "${GREEN}✓ Java${NC} $JAVA_VERSION"
fi

# Check Maven
if ! command -v mvn &> /dev/null; then
    echo -e "${RED}✗ Maven não está instalado${NC}"
    echo "  Baixe em: https://maven.apache.org"
    exit 1
else
    MVN_VERSION=$(mvn -v | head -1)
    echo -e "${GREEN}✓ Maven${NC} $MVN_VERSION"
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${BLUE}! Docker não está instalado${NC}"
    echo "  Opcional para: docker-compose up"
    echo "  Baixe em: https://www.docker.com/products/docker-desktop"
else
    DOCKER_VERSION=$(docker -v)
    echo -e "${GREEN}✓ Docker${NC} $DOCKER_VERSION"
fi

# Setup Frontend
echo -e "\n${BLUE}Instalando dependências do frontend...${NC}"
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✓ Frontend instalado${NC}"
else
    echo -e "${RED}✗ package.json não encontrado${NC}"
    exit 1
fi

# Setup Backend
echo -e "\n${BLUE}Baixando dependências do backend...${NC}"
if [ -f "backend/pom.xml" ]; then
    cd backend
    mvn clean install -DskipTests
    echo -e "${GREEN}✓ Backend pronto${NC}"
    cd ..
else
    echo -e "${RED}✗ backend/pom.xml não encontrado${NC}"
    exit 1
fi

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo -e "\n${BLUE}Criando arquivo .env...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env criado${NC}"
    echo "  Edite .env para suas configurações"
fi

# Create git hooks
echo -e "\n${BLUE}Configurando git hooks...${NC}"
mkdir -p .git/hooks

# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Rodando linter..."
npm run lint 2>/dev/null || true
EOF
chmod +x .git/hooks/pre-commit
echo -e "${GREEN}✓ Git hooks configurados${NC}"

# Summary
echo -e "\n${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Setup completo! ✓${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}"

echo -e "\n${BLUE}Próximos passos:${NC}"
echo ""
echo "1. ${GREEN}Inicie o backend:${NC}"
echo "   cd backend && mvn spring-boot:run"
echo ""
echo "2. ${GREEN}Inicie o frontend (em outro terminal):${NC}"
echo "   npm start"
echo ""
echo "3. ${GREEN}Acesse a aplicação:${NC}"
echo "   http://localhost:4200"
echo ""
echo "4. ${GREEN}Login com:${NC}"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo -e "${BLUE}Para usar Docker:${NC}"
echo "   docker-compose up --build"
echo ""
echo -e "${BLUE}Documentação:${NC}"
echo "   - QUICK_START.md"
echo "   - DOCKER_GUIDE.md"
echo "   - DEPLOY_RENDER.md"
echo ""
