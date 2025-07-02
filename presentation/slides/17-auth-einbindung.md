---
layout: two-cols
class: align-top
---

# OAuth2-Integration: Einbindung

### Schritt 3: Auth-Middleware

```typescript
// apps/bitpoll/src/server/middleware/auth.ts
import { useAnalogAuth } from '@analog-tools/auth';
import { authConfig } from '../../auth.config';

export default defineEventHandler(async (event) => {
  // Auth für alle API-Routen aktivieren
  await useAnalogAuth(authConfig, event);
});
```

**Wie es funktioniert:**
- <carbon-network-3 /> Request-Pipeline
- <carbon-user /> Auth-Kontext
- <carbon-security /> Zugriffsschutz
- <carbon-security /> Session-Management

::right::

### Schritt 4: Angular-App konfigurieren

```typescript
// apps/bitpoll/src/app/app.config.ts
import { provideAuthClient, authInterceptor } 
  from '@analog-tools/auth/angular';
import { provideHttpClient, withInterceptors } 
  from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    // Auth-Interceptor für HTTP-Anfragen
    provideHttpClient(withInterceptors([
      authInterceptor
    ])),
    // Auth-Client für Angular-App
    provideAuthClient()
  ],
};
```

> ℹ️ **authInterceptor**: Fügt automatisch Tokens zu HTTP-Anfragen hinzu und behandelt Token-Erneuerung ohne weitere Konfiguration.
