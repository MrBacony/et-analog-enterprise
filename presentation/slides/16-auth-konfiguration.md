---
layout: two-cols
class: align-top
---

# OAuth2-Integration: Konfiguration

### Schritt 1: auth.config.ts

```typescript
// apps/bitpoll/src/auth.config.ts
export const authConfig: AnalogAuthConfig = {
  // OAuth2-Konfiguration 
  // mit Keycloak
  issuer: process.env['AUTH_ISSUER'] || '',
  clientId: process.env['AUTH_CLIENT_ID'] || '',
  clientSecret: process.env['AUTH_CLIENT_SECRET'] || '',
  
  // Redis Session Store
  sessionStorage: {
    type: 'redis',
    config: { url: process.env['REDIS_HOST'] }
  },
  
  // Öffentliche Routen
  unprotectedRoutes: [
    '/api/polls', '/api/polls/[id]', '/polls'
  ]
};
```

> 🔒 Auth-Konfiguration im Zentrum der App-Sicherheit

::right::

### Schritt 2: .env Konfiguration

```bash
# OAuth2-Konfiguration
AUTH_ISSUER=https://keycloak:8080/realms/bitpoll
AUTH_CLIENT_ID=bitpoll-client
AUTH_CLIENT_SECRET=****

# Redis für Sessions
REDIS_HOST=localhost
REDIS_PORT=6379
```

> 💡 Sichere Aufbewahrung von Secrets in Umgebungsvariablen

### Wichtige Komponenten

- <carbon-password /> **Keycloak**: OAuth2/OIDC Provider
- <carbon-data-base /> **Redis**: Verteilter Session-Store
- <carbon-security /> **Guards**: Route-Schutz
- <carbon-api /> **Token**: JWT & Refresh
