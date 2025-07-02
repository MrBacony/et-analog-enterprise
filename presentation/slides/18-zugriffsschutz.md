---
layout: two-cols
class: align-top
---

# Zugriffsschutz in der Anwendung

### Frontend-Schutz mit Guards

```typescript
// libs/polls/src/pages/polls/create.page.ts
import { RouteMeta } from '@analogjs/router';
import { authGuard } from '@analog-tools/auth';

export const routeMeta: RouteMeta = {
  title: 'Umfrage erstellen',
  canActivate: [authGuard]  // Zugriffsschutz
};

@Component({
  standalone: true,
  template: `<h1>Umfrage erstellen</h1>...`
})
export default class CreatePollPageComponent {}
```

> ✅ Geschützte Routes leiten automatisch zum Login weiter. Nahtlose Benutzerführung bei fehlenden Berechtigungen.

::right::

### API-Schutz

```typescript
// libs/polls/src/api/polls/polls.post.ts
export default defineEventHandler(async (event) => {
  // Benutzer aus der Auth-Middleware abrufen
  const user = useUser();
  const auth = useAuth();
  
  // Überprüfen der Authentifizierung
  if (!user) {
    return { statusCode: 401, message: 'Unauthorized' };
  }
  
  // Rollenprüfung
  if (!(await auth.hasRole(user, 'user'))) {
    return { statusCode: 403, message: 'Forbidden' };
  }
  
  // Erfolgreicher Fall: Poll erstellen...
  // ...
});
```

**Sicherheitsvorteile:**
- <carbon-security-services /> Zwei-Ebenen-Schutz: Frontend & Backend abgesichert
- <carbon-user-role /> Rollenbasierte Berechtigungen: Feingranulare Zugriffskontrolle
- <carbon-renew /> Automatische Token-Erneuerung: Nahtlose Session-Verlängerung
- <carbon-cookie /> HTTP-only Cookies: Schutz vor XSS-Angriffen
