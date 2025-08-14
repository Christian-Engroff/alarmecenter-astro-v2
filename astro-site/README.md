# AlarmeCenter - Headless Astro Store

Este é um clone headless do site AlarmeCenter.com usando Astro como frontend e WordPress como backend via GraphQL.

## 🚀 Stack Tecnológica

- **Frontend**: Astro 5.13.0
- **Styling**: Tailwind CSS
- **Backend**: WordPress com WP-GraphQL
- **Database**: MongoDB (para dados locais)
- **Language**: TypeScript/JavaScript

## 📁 Estrutura do Projeto

```
astro-site/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Layout.astro     # Layout principal
│   │   ├── Header.astro     # Cabeçalho com navegação
│   │   ├── Footer.astro     # Rodapé
│   │   ├── HeroSlider.astro # Slider principal
│   │   ├── ProductCard.astro # Card de produto
│   │   └── FeaturedCategories.astro # Categorias em destaque
│   ├── pages/               # Páginas do site
│   │   ├── index.astro      # Homepage
│   │   ├── loja.astro       # Página da loja
│   │   ├── contato.astro    # Página de contato
│   │   ├── categoria/       # Páginas de categoria
│   │   │   └── [slug].astro # Categoria dinâmica
│   │   └── produto/         # Páginas de produto
│   │       └── [slug].astro # Produto dinâmico
│   ├── lib/
│   │   └── wordpress.ts     # Integração GraphQL WordPress
│   └── styles/
│       └── global.css       # Estilos globais
├── public/                  # Arquivos estáticos
└── package.json
```

## 🎨 Características do Design

### Baseado no Tema Electro
- Layout fiel ao tema Electro WooCommerce
- Cores principais: Vermelho (#e74c3c) e Cinza
- Design responsivo
- Navegação com mega menu
- Cards de produto interativos

### Funcionalidades Implementadas
- ✅ Homepage com slider de produtos
- ✅ Categorias em destaque
- ✅ Listagem de produtos
- ✅ Páginas de categoria dinâmicas
- ✅ Páginas de produto individuais
- ✅ Formulário de contato
- ✅ Menu responsivo
- ✅ Integração GraphQL (com fallback)

## 🔌 Integração WordPress GraphQL

### Endpoint
```
WORDPRESS_API_URL=https://alarmecenter.com.br/graphql
```

### Queries Implementadas
- `GET_PRODUCTS` - Lista de produtos
- `GET_PRODUCT_CATEGORIES` - Categorias de produtos
- `GET_POSTS` - Posts do blog
- `GET_MENU_ITEMS` - Itens do menu

### Dados Mock
O sistema inclui dados mock para desenvolvimento quando a API não está disponível:
- 3 produtos de exemplo
- 6 categorias principais
- Preços em Real (R$)
- Imagens de placeholder

## 🛍️ Categorias Principais

1. **Sistemas de Alarme** - Centrais, sensores, controles
2. **Câmeras e Gravadores** - Câmeras IP, DVR, NVR
3. **Cerca Elétrica** - Centrais e acessórios
4. **Controle de Acesso** - Fechaduras, interfones
5. **Baterias Estacionárias** - Para alarmes e nobreaks
6. **Energia & Nobreak** - Fontes e nobreaks

## 🚀 Como Executar

1. **Instalar dependências:**
```bash
cd astro-site
yarn install
```

2. **Configurar variáveis de ambiente:**
```bash
# .env
WORDPRESS_API_URL=https://alarmecenter.com.br/graphql
```

3. **Executar em desenvolvimento:**
```bash
yarn dev
```

4. **Build para produção:**
```bash
yarn build
```

## 🌐 URLs Disponíveis

- `/` - Homepage
- `/loja` - Todos os produtos
- `/categoria/[slug]` - Produtos por categoria
- `/produto/[slug]` - Detalhes do produto
- `/contato` - Formulário de contato

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Características Específicas do Brasil

- Idioma: Português brasileiro (pt-BR)
- Moeda: Real (R$)
- Telefones: Formato brasileiro
- CEP: Formato brasileiro
- Formas de pagamento: PIX, cartão, boleto

## 🔧 Próximos Passos

1. **Funcionalidades E-commerce:**
   - Carrinho de compras
   - Checkout
   - Cálculo de frete
   - Integração com pagamento

2. **Autenticação:**
   - Login/Registro
   - Área do cliente
   - Histórico de pedidos

3. **SEO:**
   - Sitemap automático
   - Meta tags dinâmicas
   - Schema markup

4. **Performance:**
   - Lazy loading
   - Image optimization
   - Cache de API

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.