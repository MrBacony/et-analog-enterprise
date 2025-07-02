---
layout: two-cols
class: align-top
---

# Praktisches Beispiel: Poll API

### GET-Endpunkt mit Parameter

```typescript
// libs/polls/src/api/polls/[id].get.ts
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
  // URL-Parameter abrufen
  const id = getRouterParam(event, 'id');
  
  // Mock-Daten für Workshop
  const poll = {
    id,
    title: `Umfrage ${id}`,
    options: ['Option A', 'Option B', 'Option C']
  };
  
  return poll;
});
```

> 👉 URL-Parameter werden mit `getRouterParam()` abgerufen

::right::

### POST-Endpunkt

```typescript
// libs/polls/src/api/polls/polls.post.ts
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  // Daten aus Request-Body lesen
  const pollData = await readBody(event);
  
  // Validierung & Verarbeitung
  const createdPoll = {
    ...pollData,
    id: Date.now().toString(),
    createdAt: new Date()
  };
  
  return createdPoll;
});
```

> 👉 Request-Body wird mit `readBody()` gelesen
