# 📚 Sessão de Estudos - Blog Next.js

## 🎯 O que foi construído hoje

Criamos um **blog completo** com Next.js, incluindo:
- ✅ CRUD de posts via API
- ✅ Sistema de autenticação simples
- ✅ Layout com header/footer
- ✅ Área administrativa protegida

---

## 🏗️ **Estrutura Final do Projeto**

```
my-blog/
├── .env.local                    # Variáveis de ambiente (senha admin)
├── middleware.ts                 # Proteção de rotas /admin
├── 
├── app/
│   ├── layout.tsx               # Layout global (header/footer)
│   ├── page.tsx                 # Página inicial 
│   ├── globals.css              # Estilos globais
│   │
│   ├── components/              # Componentes reutilizáveis
│   │   └── layout/
│   │       ├── Header.tsx       # Cabeçalho com navegação
│   │       └── Footer.tsx       # Rodapé
│   │
│   ├── blog/                    # Seção pública do blog
│   │   ├── page.tsx            # Lista de posts (usa API)
│   │   └── [slug]/
│   │       └── page.tsx        # Post individual (usa API)
│   │
│   ├── admin/                   # Área administrativa (protegida)
│   │   ├── page.tsx            # Dashboard admin
│   │   └── login/
│   │       └── page.tsx        # Página de login
│   │
│   └── api/                     # API Routes (backend)
│       ├── auth/
│       │   └── route.ts        # POST login, DELETE logout
│       └── posts/
│           ├── route.ts        # GET todos, POST criar
│           └── [slug]/
│               └── route.ts    # GET, PUT, DELETE específico
│
├── data/
│   └── post.json               # Banco de dados (JSON)
└── public/
    └── images/                 # Imagens dos posts
```

---

## 🔧 **APIs Implementadas**

### **Posts CRUD**
| Método | Rota | Função |
|--------|------|--------|
| `GET` | `/api/posts` | Lista todos os posts |
| `POST` | `/api/posts` | Cria novo post |
| `GET` | `/api/posts/[slug]` | Busca post específico |
| `PUT` | `/api/posts/[slug]` | Edita post existente |
| `DELETE` | `/api/posts/[slug]` | Remove post |

### **Autenticação**
| Método | Rota | Função |
|--------|------|--------|
| `POST` | `/api/auth` | Login com senha |
| `DELETE` | `/api/auth` | Logout (remove cookie) |

---

## 🔐 **Sistema de Autenticação**

### **Como funciona:**
1. **Senha fixa** armazenada em `.env.local`
2. **Cookie de sessão** para manter login
3. **Middleware** protege rotas `/admin/*`
4. **Redirecionamento** automático para login

### **Fluxo:**
```
Usuário acessa /admin 
    ↓
Middleware verifica cookie
    ↓
Sem cookie → Redireciona para /admin/login
    ↓
Login correto → Cria cookie + vai para dashboard
    ↓
Cookie válido → Acesso liberado
```

---

## 📝 **Conceitos Aprendidos**

### **Next.js App Router**
- **Rotas baseadas em pastas** (`app/blog/page.tsx` = `/blog`)
- **Layouts aninhados** (`layout.tsx` compartilhado)
- **Rotas dinâmicas** (`[slug]` para posts individuais)
- **API Routes** (`route.ts` para backend)

### **Hooks importantes**
- `useRouter()` → Navegação programática (após ações)
- `<Link>` → Navegação simples (cliques diretos)

### **Middleware**
- **Arquivo na raiz** (`middleware.ts`)
- **Intercepta requisições** antes das páginas
- **Proteção de rotas** sem código repetitivo

### **Cookies e Sessão**
- `NextResponse.cookies.set()` → Criar cookie
- `request.cookies.get()` → Ler cookie
- **httpOnly** → Segurança (JS não acessa)
- **maxAge** → Tempo de expiração

### **File System (fs)**
- `readFileSync()` → Ler arquivo JSON
- `writeFileSync()` → Salvar no arquivo
- **Persistência** dos dados entre reinicializações

---

## 🧪 **Testes Realizados**

### **APIs testadas no console:**
```javascript
// Criar post
fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ /* dados do post */ })
})

// Listar posts
fetch('/api/posts').then(r => r.json())

// Editar post
fetch('/api/posts/meu-slug', {
  method: 'PUT',
  body: JSON.stringify({ title: "Novo título" })
})

// Deletar post
fetch('/api/posts/meu-slug', { method: 'DELETE' })
```

### **Autenticação testada:**
- ✅ Acesso `/admin` → Redireciona para login
- ✅ Login com senha correta → Dashboard
- ✅ Logout → Volta para login
- ✅ Tentativa de acesso sem login → Bloqueado

---

## 🐛 **Problemas Resolvidos**

### **1. Erro `params.slug`**
**Problema:** Next.js App Router exige `await params`
```tsx
// ❌ Antes
const post = posts.find(p => p.slug === params.slug)

// ✅ Depois  
const { slug } = await params
const post = posts.find(p => p.slug === slug)
```

### **2. Erro `dangerouslySetInnerHTML`**
**Problema:** API 404 retorna `{ error }`, não dados do post
```tsx
// ❌ Antes
if (!post) // Nunca funcionava

// ✅ Depois
if (!post || post.error) // Detecta erro da API
```

### **3. Cookie não funcionava**
**Problema:** Tipos do TypeScript + versão do Next.js
```tsx
// ✅ Solução mais confiável
const response = NextResponse.json({ success: true })
response.cookies.set('admin-session', 'authenticated')
return response
```

---

## 🚀 **Próximos Passos**

### **Interface Admin (Opção C)**
- [ ] Página para criar posts (`/admin/posts/create`)
- [ ] Página para listar posts admin (`/admin/posts`) 
- [ ] Página para editar posts (`/admin/posts/[slug]/edit`)
- [ ] Formulários com validação

### **Melhorias Futuras**
- [ ] Migrar para banco de dados (SQLite/PostgreSQL)
- [ ] Upload de imagens
- [ ] Editor markdown visual
- [ ] SEO (metadata dinâmica)
- [ ] Paginação dos posts
- [ ] Busca e filtros
- [ ] Cache das APIs

---

## 🧠 **Resumo dos Aprendizados**

1. **Estrutura organizada** → Separação clara entre público/admin/API
2. **APIs RESTful** → CRUD completo com persistência em arquivo
3. **Autenticação simples** → Cookie + middleware para proteção
4. **Next.js moderno** → App Router, layouts, rotas dinâmicas
5. **Debugging** → Identificar e resolver erros comuns
6. **Boas práticas** → Código limpo, tipos TypeScript, estrutura escalável

---

**🎉 Parabéns!** Você criou um blog funcional com autenticação, CRUD completo e estrutura profissional. O sistema está pronto para evoluir para um banco de dados quando necessário!

---

*Última atualização: 24/09/2025*