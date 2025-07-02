---
layout: two-cols
class: align-top
---

# Moderne API-Integration mit httpResource

### httpResource mit Zod-Schema

```typescript
// Zod-Schema für typsichere Validierung
import { z } from 'zod';
const pollSchema = z.object({
  id: z.string(),
  title: z.string().min(5),
  options: z.array(z.string()).min(2),
  createdAt: z.string().datetime().optional()
});

// Typsichere API-Integration im Frontend
export class PollService {
  pollId = signal('1');
  pollResource = httpResource(
    () => `/api/polls/${this.pollId()}`,
    { parse: pollSchema.parse }
  );
}
```

> ✅ Vorteile dieser Methode:
> - Typsicherheit
> - Runtime-Validierung
> - Automatisches Parsing

::right::

### Verwendung in Komponenten

```typescript
// Komponente, die httpResource nutzt
@Component({
  // ...
})
export default class PollDetailComponent {
  private pollService = inject(PollService);
  
  // Reaktive Eigenschaften für Template-Binding
  poll = computed(() => this.pollService.pollResource());
  isLoading = computed(() => this.pollService.pollResource.loading());
  error = computed(() => this.pollService.pollResource.error());
  
  // Aktionen auslösen
  refresh() {
    this.pollService.pollResource.refetch();
  }
}
```

> 💡 Modern & Enterprise-tauglich: Ersetzt tRPC mit einer nativen, effizienten und typsicheren Lösung.
