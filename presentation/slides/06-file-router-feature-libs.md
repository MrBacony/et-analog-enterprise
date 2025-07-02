---
layout: two-cols-header
---

# File-Router in Feature Libraries

::left::

### Verzeichnisstruktur

```bash
libs/polls/
└── src/
    └── pages/                
        └── polls/            
            ├── (index).page.ts    # /polls
            ├── create.page.ts     # /polls/create
            └── [id]/
                └── index.page.ts  # /polls/:id
```

### Wichtig zu beachten
- Zusätzlicher Unterordner `polls/` für korrekte URL
- Pfadname kommt vom Unterordner, nicht vom Library-Namen
- Jedes Feature hat seine eigene Route-Struktur
- Modular und erweiterbar

::right::

### Integration in vite.config.ts

```typescript
// apps/bitpoll/vite.config.ts
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      analog({
        // Integration der Feature Libraries
        additionalPagesDirs: [
          '/libs/polls',
          '/libs/results',
          '/libs/admin'
        ]
      })
    ]
  };
});
```

> ✅ Mit **additionalPagesDirs** können Routes aus verschiedenen Feature-Libraries automatisch eingebunden werden.
