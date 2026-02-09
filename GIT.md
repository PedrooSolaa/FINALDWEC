# Guía Git - MovieFlix

## Configuración Inicial

### 1. Inicializar Git (si no está inicializado)
```bash
git init
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

### 2. Crear Commits Progresivos

Es **IMPORTANTE** hacer commits pequeños y frecuentes que reflejen el desarrollo gradual del proyecto.

### Commits Sugeridos (en este orden)

```bash
# 1. Setup inicial
git add .
git commit -m "feat: Setup inicial - Vite, React, TypeScript, Tailwind y Router"

# 2. Tipos y estructuras
git add src/types/
git commit -m "feat: Agregar tipos TypeScript para Movie y SearchParams"

# 3. Mock API
git add src/services/
git commit -m "feat: Crear API mock con datos de películas y servicios AJAX"

# 4. Componentes Atómicos
git add src/components/atoms/
git commit -m "feat: Crear componentes atómicos (Button, Input, Badge, Rating)"

# 5. Componentes Moleculares
git add src/components/molecules/
git commit -m "feat: Crear componentes moleculares (MovieCard, SearchBar, GenreFilter)"

# 6. Componentes Organismos
git add src/components/organisms/
git commit -m "feat: Crear componentes organismos (MovieGrid, MovieFilters, MovieHero)"

# 7. Layout
git add src/layout/
git commit -m "feat: Crear layout principal con Header y Footer"

# 8. Rutas y Loaders
git add src/router/
git commit -m "feat: Configurar React Router y loaders de datos"

# 9. Páginas
git add src/pages/
git commit -m "feat: Crear páginas (Home, Search, DetailPage, NotFound)"

# 10. Configuración y Documentación
git add package.json tsconfig.json vite.config.ts tailwind.config.js .gitignore .prettierrc .eslintrc .env.example
git commit -m "docs: Agregar archivos de configuración y variables de entorno"

# 11. README y Documentación
git add README.md ESTRUCTURA.md DESARROLLO.md
git commit -m "docs: Agregar documentación completa del proyecto"

# 12. Versión final
git add .
git commit -m "chore: Versión final del proyecto"
```

## Convención de Commits

Usar prefijos descriptivos:

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación  
- `style:` - Cambios de estilos (CSS, formato)
- `refactor:` - Refactorización de código
- `test:` - Agregar/actualizar tests
- `chore:` - Cambios de configuración, dependencias
- `perf:` - Mejoras de performance

### Ejemplos:
```bash
git commit -m "feat: Agregar búsqueda avanzada con múltiples filtros"
git commit -m "fix: Corregir renderizado de MovieGrid en mobile"
git commit -m "style: Aplicar Tailwind al componente Button"
git commit -m "docs: Actualizar README con instrucciones de instalación"
git commit -m "refactor: Extraer lógica de filtros a custom hook"
git commit -m "perf: Lazy load imágenes de películas"
```

## Crear Repositorio en GitHub

### 1. Crear repo en GitHub
- Ir a [github.com/new](https://github.com/new)
- Nombre: `movieflix` (o similar)
- Descripción: "Aplicación SPA de películas con React, TypeScript y Tailwind"
- NO inicializar con README (ya lo tienes)

### 2. Conectar con local
```bash
git remote add origin https://github.com/TU-USUARIO/movieflix.git
git branch -M main
git push -u origin main
```

### 3. Agregar al profesor
- En Settings → Collaborators → Add people
- Buscar email/usuario del profesor

## Ver Historial de Commits

```bash
# Commits elegantes
git log --oneline --graph --all

# Commits detallados
git log --stat

# Commits con cambios
git log -p

# Últimos 10 commits
git log -10 --oneline
```

## Tips Importantes

✅ **Haz commits frecuentes** - No commits mega que incluyan todo  
✅ **Mensajes descriptivos** - Que se entienda qué se cambió  
✅ **Un cambio por commit** - Si añades componente, un commit. Si lo estilizas, otro  
✅ **Commit antes de cambios grandes** - Así puedes revertir si algo falla  
✅ **Push regularmente** - Sube a GitHub varias veces al día  

## Ejemplo de Workflow

```bash
# 1. Crear rama de feature (opcional)
git checkout -b feat/búsqueda-avanzada

# 2. Hacer cambios...
# 3. Ver qué cambió
git status

# 4. Agregar cambios
git add src/pages/SearchPage.tsx
git add src/components/organisms/MovieFilters.tsx

# 5. Hacer commit
git commit -m "feat: Agregar búsqueda avanzada con filtros por género y año"

# 6. Push a GitHub
git push origin feat/búsqueda-avanzada

# 7. En GitHub, hacer Pull Request y mergear a main
# Luego en local:
git checkout main
git pull origin main
```

## Archivos a NO Commitear

Ya están en `.gitignore`:
- `node_modules/` - Dependencias (se instalan con npm install)
- `dist/` - Build generado
- `.env.local` - Variables locales
- Logs y archivos temporales

## Badges para GitHub

En el README, puedes agregar:

```markdown
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
```

## Preguntas Frecuentes Git

**P: ¿Olvidé agregar un archivo al commit anterior?**  
R: `git add archivo.tsx` y `git commit --amend`

**P: ¿Cómo deshago un commit?**  
R: `git revert HASH` o `git reset --soft HEAD~1`

**P: ¿Mi push fue rechazado?**  
R: Probablemente hay cambios remotos. Usa `git pull --rebase` primero.

**P: ¿Ve algo mal, cómo vuelvo a un commit anterior?**  
R: `git log --oneline` para ver historial, luego `git checkout HASH`

## Recursos

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://git-scm.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
