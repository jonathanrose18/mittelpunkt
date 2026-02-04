# AGENTS.md

## Mission

- Build "mittelpunkt": an headless open-source, data platform.
- The system provides generic data modeling (classes, fields, objects).
- It is NOT a finished product like a CMS, PIM, DAM or shop system. But you can use it as CMS, PIM, DAM, etc.
- Focus on correctness, clarity, and extensibility over features.

## Features

mittelpunkt provides a comprehensive set of features for building custom data platforms:

### Core Philosophy

**✅ Open Source**

- MIT/Apache 2.0 License
- Community-driven development
- Transparent roadmap
- Public issue tracking

**✅ Self-Hosted**

- Full data ownership
- Deploy anywhere (Railway, Fly.io, VPS, K8s)
- No vendor lock-in
- Custom infrastructure control

### Data Modeling

**✅ Class System**

- Freely definable data objects & classes
- Visual class designer (JSON or Drag & Drop)
- Class metadata (icons, descriptions, labels)
- Class grouping and organization

**✅ Relationships**

- One-to-One relations
- One-to-Many relations
- Many-to-Many relations
- Bidirectional relations
- Cascade options (delete, update)

**✅ Inheritance**

- Class inheritance hierarchies
- Field inheritance
- Override inherited fields
- Abstract base classes

**✅ Data Types**

- **Primitives**: Text, Number, Boolean, Date, DateTime
- **Complex**: JSON, Array, Object
- **Relations**: Reference, Relation (1:1, 1:n, n:m)
- **Media**: Image, File, Video, Audio
- **Localized**: Localized Text, Localized Rich Text
- **Special**: Email, URL, Phone, Color, Geo-Location
- **Extensible**: Custom field types via plugins

**✅ Validation Rules**

- Required fields
- Min/Max length
- Min/Max value
- Regex patterns
- Custom validators
- Cross-field validation
- Conditional validation

**✅ Constraints**

- Unique constraints
- Not null constraints
- Foreign key constraints
- Check constraints
- Custom business rule constraints

**✅ Data Quality Rules**

- Completeness checks
- Consistency validation
- Accuracy rules
- Timeliness monitoring
- Data quality scoring

### Internationalization

**✅ Multi-Language Support**

- Content translation management
- Localized field types
- Language fallback chains
- Translation workflow

**✅ Localization (i18n)**

- Date/Time formats
- Number formats
- Currency handling
- Timezone support
- Region-specific validations

### Content Management

**✅ Reusable Content Blocks**

- Component-based content
- Shared data fragments
- Block templates
- Nested blocks
- Block versioning

**✅ Previews**

- Live content preview
- Preview modes (draft, published)
- Preview URLs

### Automation & Integration

**✅ Workflows**

- Visual workflow builder
- Trigger-based automation
- State machines
- Scheduled jobs
- Conditional logic

**✅ Webhooks**

- Event-based webhooks
- Custom webhook endpoints
- Retry logic
- Webhook signatures
- Payload customization

**✅ REST API**

- Full CRUD operations
- Versioned endpoints (/api/v1, /api/v2)
- OpenAPI/Swagger documentation
- Type-safe TypeScript SDK
- Batch operations

**✅ API Access Control**

- Public API endpoints
- Private/authenticated endpoints
- Per-endpoint access control
- API key management
- Token-based auth

**✅ Rate Limiting**

- Configurable rate limits per endpoint
- Per-user or api key rate limits
- Burst allowance
- Custom limit rules

### Security & Access Control

**✅ Authentication (better-auth)**

- Email/Password
- OAuth providers (Google, GitHub, etc.)
- Magic links
- Two-factor authentication (2FA)
- Session management
- Refresh tokens

**✅ Roles & Permissions**

- Role-based access control (RBAC)
- Custom roles
- Granular permissions
- Resource-level permissions
- Field-level permissions
- Attribute-based access control (ABAC)

### Data Management

**✅ File Upload & Storage**

- Image upload with transformations
- File upload (PDF, docs, etc.)
- Storage adapters (local, S3, CloudFlare R2)
- CDN integration
- Automatic optimization
- Asset metadata

**✅ Search**

- Full-text search
- Faceted search
- Filters and sorting
- Search across relations
- Search highlighting
- Search suggestions/autocomplete

**✅ Import/Export**

- CSV import/export
- JSON import/export
- Bulk operations
- Import validation
- Import history

### Auditing & Monitoring

**✅ Audit Logs**

- Complete change history
- User activity tracking
- Data access logs
- API request logs
- Retention policies
- Log search and filtering

**✅ Observability**

- Request logging
- Error tracking
- Performance metrics
- Database query monitoring
- Health checks

### User Interface

**✅ Visual Class Editor**

- Drag & Drop field builder
- JSON editor mode
- Field configuration panel
- Real-time validation
- Preview mode

**✅ Admin UI (Next.js)**

- Modern, responsive interface
- Dark mode support
- Data explorer
- Relationship visualizer
- Bulk editing
- Keyboard shortcuts
- Built with shadcn

## Monorepo Structure & Boundaries

```
mittelpunkt/
├── apps/
│   ├── api/                 # REST API (Hono.js)
│   ├── admin/               # Admin UI (Next.js)
│   └── docs/                # Documentation site
│
├── packages/
│   ├── domain/              # Core business logic (classes, objects, fields)
│   ├── database/            # Drizzle schema, migrations
│   ├── auth/                # better-auth configuration
│   ├── use-cases/           # Application use-cases
│   ├── infrastructure/      # Repositories, adapters
│   └── shared/              # Shared types, utils, config
```

### Dependency Rules

**Apps** → may depend on all packages  
**Packages/domain** → depends on nothing (pure business logic)  
**Packages/use-cases** → depends on domain only  
**Packages/infrastructure** → depends on domain, implements repositories  
**Packages/database** → standalone (Drizzle schema)  
**Packages/auth** → depends on database  
**Packages/shared** → standalone utilities

### What goes where?

**Domain (packages/domain/):**

- Entity definitions (Class, Object, Field)
- Business rules and validation
- Repository interfaces (ports)
- No framework dependencies

**Use-cases (packages/use-cases/):**

- Application workflows (CreateClass, UpdateObject, etc.)
- Orchestrates domain logic
- Depends on repository interfaces, not implementations

**Infrastructure (packages/infrastructure/):**

- Repository implementations (Drizzle queries)
- External service adapters
- Implements domain interfaces

**Database (packages/database/):**

- Drizzle schema definitions
- Migration files
- Database types

**Apps (apps/api/, apps/admin/):**

- HTTP routes, controllers
- UI components, pages
- Dependency injection / composition root
- Glue code between packages

## Working Style

- Think in small vertical slices: Domain → Validation → Use-case → Adapter → Test
- Prefer explicit code over abstraction or meta-programming.
- If unsure where code belongs, ask before implementing.

## Code Style

- TypeScript strict mode (no implicit any, strict null checks)
- Use functional patterns where possible (pure functions, immutability)
- Naming conventions:
  - Files: kebab-case (`class-repository.ts`)
  - Types/Interfaces: PascalCase (`ClassDefinition`)
  - Functions/Variables: camelCase (`createClass`)
  - Constants: UPPER_SNAKE_CASE (`MAX_FIELD_COUNT`)
- No default exports (except framewors like Next.js pages/layouts or others need it)
- Explicit return types on public functions
- Prefer composition over inheritance
- Error handling: Use Result<T, E> pattern or typed errors (no throwing strings)
- Default to small components. Prefer focused modules over god components
- Default to small files and diffs. Avoid repo wide rewrites unless asked

## Tech Stack

### Backend

- Runtime: Node.js
- Language: TypeScript (strict mode)
- Database: PostgreSQL with JSONB
- ORM: Drizzle ORM
- Validation: Zod
- Authentication: better-auth

### API Layer

- HTTP Framework: Hono.js
- API Style: REST (JSON)
- Documentation: OpenAPI/Swagger (generated from Zod)
- Type safety: Zod schemas → TypeScript types

### Frontend (Admin UI)

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Components: shadcn/ui
- Forms: React Hook Form + Zod
- State: TanStack Query
- Auth Client: better-auth/react

### Tooling

- Monorepo: Turborepo + pnpm workspaces
- Testing: Vitest + Playwright
- Linting: ESLint + Prettier

## Testing Instructions

- Fix any test or type errors until the whole suite is green.
- Don't skip tests due to type issues - fix the types instead
- After moving files or changing imports, run `pnpm lint --filter <project_name>` to be sure ESLint and TypeScript rules still pass.
- All tests must be written in TypeScript - never use JavaScript
- Features without tests are incomplete - every new feature or bug fix needs test coverage
- Test both success and failure cases with edge cases
- Never remove failing tests
- Domain tests validate behavior, not implementation details.
- Tests should be deterministic and side-effect free.
- Infrastructure tests may use in-memory implementations only.

## Rules

- Ask before generating new files
- No magic: Prefer explicit code over reflection or meta-programming
- Data validation happens at domain boundaries (API input, DB output)
- Database is an implementation detail - domain doesn't import ORM types
- UI components receive validated domain types, not raw API responses
- Never bypass type safety with `as any` or `@ts-ignore`
- Document "why" in comments, not "what" (code should be self-documenting)

## Don'ts

- ❌ Don't mix domain logic with framework code (Hono, Drizzle, React)
- ❌ Don't use ORM entities in domain layer (use repositories)
- ❌ Don't hardcode field types (make them extensible)
- ❌ Don't skip validation at boundaries
- ❌ Don't create circular dependencies between packages
- ❌ Don't use process.env directly (use config abstraction)
- ❌ Don't commit commented-out code
- ❌ Don't write tests that need real database (use in-memory or test DB)
- ❌ Don't bypass Zod validation
- ❌ Don't store sensitive data in JSONB without encryption

## Questions & Updates

If you have questions about:

- Where code belongs → Ask before implementing
- Architecture decisions → Refer to this document
- New patterns needed → Propose and document

This document is living - update it as the project evolves.
