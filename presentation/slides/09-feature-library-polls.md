---
layout: two-cols-header
class: align-top
---

# Feature-Library: polls

::left::

### Interne Struktur

<div class="mr-6 "> 

```bash
libs/polls/
├── src/
│   ├── lib/
│   │   ├── services/          # Geschäftslogik
│   │   ├── components/        # UI-Komponenten
│   │   └── models/            # Zod-Schema / Types
│   ├── pages/                 # Routen
│   │   └── polls/             # /polls Route
│   └── api/                   # Backend
│       └── polls/             # /api/polls Route
└── index.ts                   # Public API
```

</div>

**Vorteile der Feature-Struktur:**
- 📦 Alles an einem Ort: UI, Logic, API, Routing
- 🔄 Kohärenz: Zusammengehörige Teile bleiben zusammen
- 🛡️ Kapselung: Klare Schnittstellen nach außen

::right::

### Erstellung mit NX CLI

```bash
# Feature-Library erstellen
nx g @nx/angular:library \
  --name=polls \
  --directory=libs/polls \

```

**Was ist in der Library?**
- 🎨 UI: Komponenten, Templates, Styles
- ⚙️ Logic: Services, State Management
- 🌐 API: Endpoints, Controllers
- 📋 Models: Interfaces, Schemas, Types
