---
layout: two-cols-header
class: align-top
---

# File-Based Routing

::left::

### Grundkonzept
- Dateisystem = Routing-Struktur
- Konvention statt Konfiguration
- Inspiriert von Next.js, Remix, SvelteKit
- Perfekte Integration mit Angular

### Namenskonventionen
- `(home).page.ts` → **/** *(Index-Route)*
- `about.page.ts` → **/about**
- `[id].page.ts` → **/42** *(Dynamischer Parameter)*
- Ordnerstruktur definiert Verschachtelung

::right::

### Beispiel: Home-Page Component

```typescript
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h1>Willkommen bei BitPoll!</h1>`
})
// Default-Export ist wichtig!
export default class HomePageComponent {}
```

> ℹ️ Der **File-Router** erwartet einen Default-Export, der die Komponente für die Route definiert.
