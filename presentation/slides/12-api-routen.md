---
layout: two-cols
class: align-top
---

# API-Routen in AnalogJS

### Dateibasierte API-Struktur

```bash
libs/polls/
└── src/
    └── api/
        └── polls/
            ├── polls.get.ts      # GET /api/polls
            ├── polls.post.ts     # POST /api/polls
            ├── [id].get.ts       # GET /api/polls/:id
            └── vote.post.ts      # POST /api/polls/vote
```

**Namenskonventionen:**
- Dateiname mit HTTP-Methode als Suffix
- Dynamische Parameter in eckigen Klammern `[id]`
- Getrennte Dateien pro HTTP-Methode
- Nutzt Nitro-Server-Ansatz (H3)

::right::

### Beispiel: GET-Endpunkt

```typescript
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  // In einem echten Projekt: Datenbank-Abfrage
  return [
    { id: '1', title: 'Lieblingsessen?', options: ['Pizza', 'Pasta', 'Salat'] },
    { id: '2', title: 'Lieblingsfarbe?', options: ['Blau', 'Rot', 'Grün'] }
  ];
});
```

> ℹ️ Die API-Endpoints werden **automatisch auf Basis der Dateinamen** generiert und sind sofort verfügbar. Keine zusätzliche Konfiguration notwendig!
