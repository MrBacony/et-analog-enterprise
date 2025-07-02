# BitPoll - Anwendungsstruktur für AnalogJS Enterprise-Anwendung

## Übersicht

Diese Dokumentation beschreibt die Anwendungsstruktur unserer BitPoll-App, die mit folgenden Technologien entwickelt wird:
- NX version 21
- Angular version 20
- AnalogJS version 1.19.0
- @analog-tools/auth version 0.4.0

Die Architektur folgt dem Prinzip der Feature-orientierten Modularisierung mit einem starken Fokus auf Skalierbarkeit und Wartbarkeit.

## Anwendungsfunktionalität und Autorisierungsmodell

Die BitPoll-Anwendung implementiert ein dreistufiges Autorisierungsmodell:

1. **Anonyme Benutzer**
   - Können an bestehenden Umfragen teilnehmen
   - Haben nur Leserechte auf öffentliche Umfragen und deren Ergebnisse

2. **Registrierte Benutzer**
   - Können neue Umfragen erstellen
   - Können ihre eigenen Umfragen verwalten und bearbeiten
   - Haben alle Rechte von anonymen Benutzern

3. **Admin-Benutzer**
   - Können alle Umfragen löschen und verwalten
   - Haben vollen Zugriff auf alle Anwendungsbereiche
   - Können Systemeinstellungen ändern

Dieses Modell wird durch eine Kombination aus:
- OAuth2-Authentifizierung mit @analog-tools/auth 0.4.0
- Rollenbasierte Zugriffssteuerung
- API-seitige Autorisierungsprüfungen
umgesetzt.

## Entwicklungsansatz

Wir folgen einem stufenweisen Entwicklungsansatz:

1. **Phase 1: Grundfunktionalität ohne Autorisierung**
   - Erstellung der Feature-Libraries
   - Implementierung der Core-Funktionalität
   - Alle Funktionen initial für anonyme Benutzer

2. **Phase 2: Hinzufügen der Authentifizierung**
   - Integration von @analog-tools/auth in 4 einfachen Schritten
   - Implementierung des dreistufigen Berechtigungsmodells

Dieser Ansatz ermöglicht es, schnell eine funktionsfähige Grundversion zu entwickeln und später Sicherheitsaspekte zu integrieren.

## NX Workspace-Struktur

```
et-analog-enterprise/
├── apps/
│   ├── bitpoll/               # Haupt-App (Shell-Anwendung)
│   └── bitpoll-e2e/           # End-to-End Tests
├── libs/                      # Feature Libraries
│   ├── core/                  # Kern-Funktionalitäten
│   │   ├── src/
│   │   │   ├── lib/           # Basis-Services, Guards, Interceptors
│   │   │   └── models/        # Gemeinsame Datenmodelle
│   │   └── index.ts
│   ├── polls/                 # Poll-Feature (Hauptfunktionalität)
│   │   ├── src/
│   │   │   ├── lib/           # Poll-Komponenten, Services
│   │   │   ├── pages/         # Poll-bezogene Pages
│   │   │   └── api/           # Poll API-Routen
│   │   └── index.ts
│   ├── results/               # Ergebnis-Feature
│   │   ├── src/
│   │   │   ├── lib/           # Result-Komponenten, Services
│   │   │   ├── pages/         # Ergebnis-bezogene Pages
│   │   │   └── api/           # Result API-Routen
│   │   └── index.ts
│   ├── admin/                 # Admin-Feature für Verwaltungsfunktionen
│   │   ├── src/
│   │   │   ├── lib/           # Admin-Komponenten, Services
│   │   │   ├── pages/         # Admin-bezogene Pages
│   │   │   └── api/           # Admin API-Routen
│   │   └── index.ts
│   └── shared/                # Geteilte Komponenten und Utilities
│       ├── src/
│       │   ├── ui/            # UI-Komponenten
│       │   └── utils/         # Helper-Funktionen
│       └── index.ts
├── docker/                    # Docker-Konfigurationen
│   ├── keycloak/              # Keycloak für OAuth2
│   └── docker-compose.yml
└── docs/                      # Dokumentation
```

## Erstellung der Feature Libraries mit NX 21

Für jede Feature-Library nutzen wir die NX CLI mit folgenden Befehlen:

```bash
# Erstellung der Core-Library
nx g @nx/angular:library --name=core --directory=libs/core --buildable --importPath=@et-analog/core

# Erstellung der Polls-Library
nx g @nx/angular:library --name=polls --directory=libs/polls --buildable --importPath=@et-analog/polls

# Erstellung der Results-Library
nx g @nx/angular:library --name=results --directory=libs/results --buildable --importPath=@et-analog/results

# Erstellung der Admin-Library
nx g @nx/angular:library --name=admin --directory=libs/admin --buildable --importPath=@et-analog/admin

# Erstellung der Shared-Library
nx g @nx/angular:library --name=shared --directory=libs/shared --buildable --importPath=@et-analog/shared
```

## Feature Libraries im Detail

### 1. Core Library

Enthält zentrale Funktionalitäten, die von allen Features genutzt werden:

```
libs/core/
├── src/
│   ├── lib/
│   │   ├── services/
│   │   │   ├── http.service.ts            # Basis-HTTP-Service
│   │   │   └── logger.service.ts          # Logger-Service
│   │   ├── interceptors/
│   │   │   └── error.interceptor.ts       # Fehlerbehandlung
│   │   └── guards/
│   │       └── permission.guard.ts        # Feinkörnige Berechtigungsprüfung (Phase 2)
│   └── models/
│       ├── user.model.ts                  # Benutzer-Modell
│       ├── api-response.model.ts          # API-Antwort-Modell
│       └── poll.model.ts                  # Geteilte Poll-Modelle
└── index.ts                              # Public API
```

### 2. Polls Library

Zentrale Feature-Library für die Umfragefunktionalität:

```
libs/polls/
├── src/
│   ├── lib/
│   │   ├── services/
│   │   │   └── poll.service.ts            # Poll-Service
│   │   ├── components/
│   │   │   ├── poll-form.component.ts     # Umfrage-Erstellungsformular
│   │   │   ├── poll-list.component.ts     # Umfrageliste
│   │   │   ├── poll-item.component.ts     # Einzelne Umfrage
│   │   │   └── poll-vote.component.ts     # Abstimmungskomponente
│   │   ├── models/
│   │   │   └── poll.model.ts              # Poll-Datenmodell
│   │   └── resources/                     # HttpResource Definitionen
│   │       ├── poll.resource.ts           # Poll-Resource mit Zod-Schema
│   │       └── vote.resource.ts           # Vote-Resource mit Zod-Schema
│   ├── pages/
│   │   ├── polls-list.page.ts             # Übersichtsseite (AnalogJS Page)
│   │   ├── poll-create.page.ts            # Erstellungsseite (AnalogJS Page)
│   │   ├── poll-detail.page.ts            # Detailseite (AnalogJS Page)
│   │   └── poll-vote.page.ts              # Abstimmungsseite (AnalogJS Page)
│   └── api/
│       └── polls/
│           ├── index.ts                   # Polls API-Router (AnalogJS API-Route)
│           ├── [id].ts                    # Einzelne Poll-Operationen (AnalogJS API-Route)
│           └── vote.ts                    # Abstimmungs-Endpunkt (AnalogJS API-Route)
└── index.ts                              # Public API
```

### 3. Results Library

Verantwortlich für die Darstellung und Verarbeitung von Umfrageergebnissen:

```
libs/results/
├── src/
│   ├── lib/
│   │   ├── services/
│   │   │   └── results.service.ts         # Ergebnis-Service
│   │   ├── components/
│   │   │   ├── results-chart.component.ts # Diagrammdarstellung
│   │   │   ├── results-table.component.ts # Tabellarische Darstellung
│   │   │   └── export.component.ts        # Export-Funktionalität
│   │   ├── models/
│   │   │   └── result.model.ts            # Ergebnis-Datenmodell
│   │   └── resources/
│   │       └── result.resource.ts         # Result-Resource mit Zod-Schema
│   ├── pages/
│   │   ├── results-detail.page.ts         # Detailseite für Ergebnisse (AnalogJS Page)
│   │   └── results-dashboard.page.ts      # Dashboard für Ergebnisübersicht (AnalogJS Page)
│   └── api/
│       └── results/
│           ├── index.ts                   # Results API-Router (AnalogJS API-Route)
│           ├── [id].ts                    # Einzelne Result-Operationen (AnalogJS API-Route)
│           └── export.ts                  # Export-Endpunkt (AnalogJS API-Route)
└── index.ts                              # Public API
```

## Authentifizierung mit @analog-tools/auth in 4 Schritten

Die Integration der Authentifizierung erfolgt in Phase 2 durch vier einfache Schritte:

### 1. Konfiguration von `auth.config.ts`

```typescript
// apps/bitpoll/src/auth.config.ts
import { AnalogAuthConfig } from '@analog-tools/auth';

export const authConfig: AnalogAuthConfig = {
  issuer: process.env['AUTH_ISSUER'] || '',
  clientId: process.env['AUTH_CLIENT_ID'] || '',
  clientSecret: process.env['AUTH_CLIENT_SECRET'] || '',
  audience: process.env['AUTH_AUDIENCE'] || '',
  scope: process.env['AUTH_SCOPE'] || '',
  callbackUri: process.env['AUTH_CALLBACK_URL'] || '',
  sessionStorage: {
    type: 'redis',
    config: {
      url: process.env['REDIS_HOST'] || 'localhost',
      port: process.env['REDIS_PORT'] || 6379,
    },
  },
  // Wichtig: Alle Routen sind standardmäßig geschützt!
  // Für anonymen Zugriff müssen Routen explizit freigegeben werden
  unprotectedRoutes: [
    // API-Routen für anonymen Zugriff
    '/api/polls',
    '/api/polls/[id]', // Einzelne Poll ansehen
    '/api/polls/vote', // Anonymes Voting erlauben
    '/api/results/[id]', // Ergebnisse ansehen
    
    // Frontend-Routen für anonymen Zugriff
    '/polls',
    '/polls/[id]',
    '/polls/vote/[id]',
    '/results/[id]'
  ]
};
```

### 2. Umgebungsvariablen in `.env` setzen

```
# .env
AUTH_ISSUER=https://keycloak:8080/realms/bitpoll
AUTH_CLIENT_ID=bitpoll-client
AUTH_CLIENT_SECRET=your-client-secret
AUTH_AUDIENCE=account
AUTH_SCOPE=openid profile email
AUTH_CALLBACK_URL=http://localhost:4200/api/auth/callback
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Auth-Middleware erstellen

```typescript
// apps/bitpoll/src/server/middleware/auth.ts
import { H3Event } from 'h3';
import { useAnalogAuth } from '@analog-tools/auth';
import { authConfig } from '../../auth.config';

export default defineEventHandler(async (event: H3Event) => {
  // Auth-Middleware hinzufügen
  await useAnalogAuth(authConfig, event);
});
```

### 4. Angular-App mit Auth konfigurieren

```typescript
// apps/bitpoll/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { provideAuthClient, authInterceptor } from '@analog-tools/auth/angular'; // Korrekter Import-Pfad für Angular-spezifische Features

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideClientHydration(),
    provideContent(withMarkdownRenderer()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAuthClient()
  ],
};
```

## Verwendung des AuthService von @analog-tools/auth

Der AuthService wird von der @analog-tools/auth-Bibliothek bereitgestellt und muss nicht implementiert werden. Er bietet alle notwendigen Methoden zur Authentifizierung und Autorisierung:

```typescript
// Beispiel für die Verwendung des AuthService in einer Komponente
import { Component } from '@angular/core';
import { AuthService } from '@analog-tools/auth/angular'; // Korrekter Import-Pfad für Angular-spezifische Features

@Component({
  selector: 'app-header',
  template: `
    <nav>
      <ng-container *ngIf="(authService.isAuthenticated$ | async) === false; else loggedIn">
        <button (click)="authService.login()">Login</button>
      </ng-container>
      <ng-template #loggedIn>
        <button (click)="authService.logout()">Logout</button>
        <span *ngIf="authService.user$ | async as user">
          Hallo, {{ user.name }}
        </span>
      </ng-template>
      <button *ngIf="authService.hasRole('admin') | async">Admin Panel</button>
    </nav>
  `
})
export class HeaderComponent {
  authService = inject(AuthService); 
}
```

### Wichtige Methoden und Eigenschaften des AuthService

- `user`: Signal mit den Benutzerdaten (`AuthUser | null`)
- `isAuthenticated`: Signal, das angibt, ob der Benutzer authentifiziert ist
- `isLoading`: Signal, das anzeigt, ob der Authentifizierungsstatus noch geladen wird
- `login(targetUrl?: string)`: Leitet zur Login-Seite weiter, optional mit Ziel-URL für Redirect nach Login
- `logout()`: Meldet den Benutzer ab und leitet weiter
- `checkAuthentication()`: Erzwingt eine Überprüfung des Authentifizierungsstatus
- `hasRoles(roles: string[])`: Prüft, ob der Benutzer die angegebenen Rollen besitzt

## Routenschutz mit AuthService von @analog-tools/auth

@analog-tools/auth stellt bereits eigene Guards für die Authentifizierung und Autorisierung zur Verfügung, sodass wir keine eigenen implementieren müssen. Diese Guards folgen den neuesten Angular 20 Best Practices und nutzen die Signal-basierte Reaktivität:

```typescript
// Verwendung der integrierten Guards von @analog-tools/auth
import { authGuard, roleGuard } from '@analog-tools/auth';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'polls/create',
    loadComponent: () => import('./poll-create.component'),
    canActivate: [authGuard] // Nur für authentifizierte Benutzer
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
    canActivate: [roleGuard(['admin'])] // Nur für Admin-Benutzer
  }
];
```

Die eingebauten Guards bieten folgende Vorteile:

1. **Nahtlose Integration** mit dem AuthService und seinen Signals
2. **Automatische Weiterleitung** zur Login-Seite bei fehlenden Berechtigungen
3. **Typsicherheit** und optimierte Performance durch Tree-Shaking
4. **Aktuellste Best Practices** für Angular 20

## API-Schutz mit Auth-Middleware

AnalogJS verwendet `defineEventHandler` für API-Routen in Kombination mit der Auth-Middleware:

```typescript
// libs/polls/src/api/polls/polls.get.ts
import { defineEventHandler } from 'h3';

// Öffentlicher Endpunkt - für alle zugänglich
export default defineEventHandler(async (event) => {
  const polls = await fetchPollsFromDatabase();
  return polls;
});
```

```typescript
// libs/polls/src/api/polls/polls.post.ts
import { defineEventHandler, readBody } from 'h3';
import { useUser, useAuth } from '@analog-tools/auth/server';

// Geschützter Endpunkt - nur für authentifizierte Benutzer
export default defineEventHandler(async (event) => {
  // Benutzer aus der Auth-Middleware abrufen
  const user = useUser();
  const auth = useAuth();
  
  // Überprüfen, ob der Benutzer authentifiziert ist
  if (!user) {
    return {
      statusCode: 401,
      message: 'Unauthorized'
    };
  }
  
  // Überprüfen, ob der Benutzer die notwendige Rolle hat
  if (!(await auth.hasRole(user, 'user'))) {
    return {
      statusCode: 403,
      message: 'Forbidden'
    };
  }
  
  // Daten aus der Anfrage lesen
  const pollData = await readBody(event);
  
  // Daten verarbeiten und in Datenbank speichern
  const createdPoll = await createPollInDatabase({
    ...pollData,
    createdBy: user.sub
  });
  
  return createdPoll;
});
```

Diese Implementierung folgt dem Nitro-Server-Ansatz, den AnalogJS für seine API-Routen verwendet. Die `defineEventHandler`-Funktion verarbeitet die Anfrage und gibt entweder Daten oder ein Fehlerobjekt zurück.

## Integration in die Hauptanwendung

Die Integration der Feature Libraries in die Hauptanwendung erfolgt automatisch über den File-Router von AnalogJS. Durch die Konfiguration der `additionalPagesDirs` in der `vite.config.ts` werden die Pages der Feature Libraries direkt in das Routing der Anwendung eingebunden:

```typescript
// apps/bitpoll/vite.config.ts
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      analog({
        // Automatische Integration der Feature Library Pages
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

Der Zugriffschutz wird direkt in den einzelnen Page-Komponenten implementiert, zum Beispiel durch die Verwendung von Guards in den Metadaten:

```typescript
// libs/admin/src/pages/admin/(index).page.ts
import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { roleGuard } from '@analog-tools/auth';

export const routeMeta: RouteMeta = {
  title: 'Admin Dashboard',
  canActivate: [roleGuard],
  data: { roles: ['admin']}
};

@Component({
  // ... Component definition
})
export default class AdminPageComponent {} 
```
```

## Integration von Feature-Library-Routen in AnalogJS mit File-Router

AnalogJS nutzt einen File-Router-Ansatz, bei dem Dateinamen und -strukturen direkt in Routen übersetzt werden. Diese leistungsstarke Funktion können wir sowohl in der Hauptanwendung als auch in Feature Libraries nutzen.

### 1. File-Router-Struktur in der Hauptanwendung

Der File-Router von AnalogJS nutzt die Dateistruktur im `pages`-Verzeichnis der Anwendung:

```
apps/bitpoll/
└── src/
    └── app/
        └── pages/               # Pages-Verzeichnis für die Hauptanwendung
            ├── (home).page.ts   # Index-Route (das führende Klammerpaar macht die Komponente zum Index)
            ├── about.page.ts    # /about Route
            └── contact/
                └── index.page.ts # /contact Route
```

Die Namenskonventionen des File-Routers bestimmen dabei die Art der Route:

- Dateiname mit Klammern: `(home).page.ts` → Wird zur Index-Route (`/`)
- Dynamische Parameter: `[id].page.ts` → Route mit dynamischem Parameter (z.B. `/123`)
- Verschachtelte Ordner: entsprechen verschachtelten Routen
- Dateiendung `.page.ts` → Wird als Route erkannt

### 2. File-Router in Feature Libraries

Wir können denselben File-Router-Ansatz auch in Feature Libraries nutzen. Dabei ist die korrekte Strukturierung der Verzeichnisse entscheidend für die resultierenden URLs:

```
libs/polls/
└── src/
    └── pages/                # Pages-Verzeichnis für die Polls-Library
        └── polls/            # Wichtig: Zusätzlicher Unterordner mit dem Namen der Feature-Route
            ├── (index).page.ts    # /polls Route (wird zur Basis-Route der Library)
            ├── create.page.ts     # /polls/create Route
            └── [id]/
                ├── index.page.ts  # /polls/:id Route
                └── edit.page.ts   # /polls/:id/edit Route
```

**Wichtiger Hinweis zur Verzeichnisstruktur:** 
- Um eine Route wie `http://localhost:4200/polls` zu erstellen, muss die Datei unter `/libs/polls/src/pages/polls/(index).page.ts` liegen
- Der zusätzliche Unterordner `polls/` ist notwendig, damit AnalogJS die korrekte URL-Struktur erzeugt
- Das Feature selbst bestimmt den Namen im Pfad, nicht der Library-Name

Die Feature Library Pages sollten ebenso der File-Router-Namenskonvention folgen:

- `(index).page.ts` → Wird zur benannten Route des Unterordners (z.B. `/polls`)
- `[id].page.ts` oder `[id]/index.page.ts` → Dynamische Routen
- Verschachtelte Ordner → Verschachtelte Routen

### 3. Konfiguration der vite.config.ts für Feature Libraries

Damit AnalogJS die Pages in Feature Libraries erkennt, muss die `vite.config.ts` angepasst werden:

```typescript
// apps/bitpoll/vite.config.ts
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

export default defineConfig(({ mode }) => {
  return {
    // ...existing code...
    plugins: [
      analog({
        // Wichtig: Hier werden zusätzliche Pages-Verzeichnisse definiert
        additionalPagesDirs: [
          '/libs/polls',
          '/libs/results',
          '/libs/admin'
        ],
        // ...existing code...
      })
    ],
    // ...existing code...
  };
});
```

### 4. Beispiele für Page-Komponenten

Beispiel einer Page-Komponente in der Hauptanwendung:

```typescript
// apps/bitpoll/src/app/pages/(home).page.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Willkommen bei BitPoll!</h1>
    <p>Erstellen Sie Umfragen oder nehmen Sie an bestehenden teil.</p>
  `
})
export default class HomePageComponent {} // Default-Export ist wichtig!
```

Beispiel einer Page-Komponente in einer Feature Library:

```typescript
// libs/polls/src/pages/polls/[id]/index.page.ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../../../lib/services/poll.service';
import { PollDetailComponent } from '../../../lib/components/poll-detail.component';

@Component({
  standalone: true,
  imports: [PollDetailComponent],
  template: `<app-poll-detail [pollId]="pollId" />`
})
export default class PollDetailPageComponent { // Default-Export ist wichtig!
  private route = inject(ActivatedRoute);
  pollId = this.route.snapshot.paramMap.get('id')!;
}
```

### 5. Integration in die App-Konfiguration

Die Routen werden automatisch erkannt und müssen nicht manuell in der `app.routes.ts` konfiguriert werden. AnalogJS sorgt dafür, dass der `FileRouter` verwendet wird:

```typescript
// apps/bitpoll/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideFileRouter } from '@analogjs/router'; // Wichtig: FileRouter-Provider

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(), // Aktiviert den File-Router
    // ...existing code...
  ]
};
```

Dieser Ansatz ermöglicht eine sehr saubere und intuitive Strukturierung der Routing-Logik, da die Dateistruktur direkt die Routing-Struktur widerspiegelt und keine separate Routing-Konfiguration notwendig ist.

## API-Routen in Feature Libraries

AnalogJS ermöglicht die Definition von API-Routen in Feature Libraries mit zwei verschiedenen Ansätzen:

### 1. HTTP-Methoden in separaten Dateien

Der empfohlene Ansatz ist die Erstellung separater Dateien für jede HTTP-Methode, wobei der Dateiname mit der HTTP-Methode als Suffix versehen wird:

```
libs/polls/
└── src/
    └── api/
        └── polls/
            ├── polls.get.ts     # GET /api/polls
            ├── polls.post.ts    # POST /api/polls
            ├── [id].get.ts      # GET /api/polls/:id
            ├── [id].put.ts      # PUT /api/polls/:id
            ├── [id].delete.ts   # DELETE /api/polls/:id
            ├── vote.post.ts     # POST /api/polls/vote
            └── popular.get.ts   # GET /api/polls/popular
```

Beispiel für eine GET-Methode in separater Datei:

```typescript
// libs/polls/src/api/polls/polls.get.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const polls = await fetchPollsFromDatabase();
  return polls;
});
```

Beispiel für eine POST-Methode mit Authentifizierung:

```typescript
// libs/polls/src/api/polls/polls.post.ts
import { defineEventHandler, readBody } from 'h3';
import { useUser, useAuth } from '@analog-tools/auth/server';

export default defineEventHandler(async (event) => {
  // Benutzer aus der Auth-Middleware abrufen
  const user = useUser();
  const auth = useAuth();
  
  // Überprüfen, ob der Benutzer authentifiziert ist
  if (!user) {
    return {
      statusCode: 401,
      message: 'Unauthorized'
    };
  }
  
  // Überprüfen, ob der Benutzer die notwendige Rolle hat
  if (!(await auth.hasRole(user, 'user'))) {
    return {
      statusCode: 403,
      message: 'Forbidden'
    };
  }
  
  // Daten aus der Anfrage lesen
  const pollData = await readBody(event);
  
  // Daten verarbeiten und in Datenbank speichern
  const createdPoll = await createPollInDatabase({
    ...pollData,
    createdBy: user.sub
  });
  
  return createdPoll;
});
```

Beispiel für eine Route mit URL-Parameter:

```typescript
// libs/polls/src/api/polls/[id].get.ts
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
  // URL-Parameter abrufen
  const id = getRouterParam(event, 'id');
  
  // Daten abrufen
  const poll = await fetchPollById(id);
  
  if (!poll) {
    return {
      statusCode: 404,
      message: `Poll with id ${id} not found`
    };
  }
  
  return poll;
});
```

### 2. Mehrere HTTP-Methoden in einer Datei

Alternativ können auch mehrere HTTP-Methoden in einer Datei definiert werden:

```typescript
// libs/polls/src/api/polls/index.ts
import { defineEventHandler, readBody } from 'h3';
import { useUser, useAuth } from '@analog-tools/auth/server';

// GET /api/polls
export const GET = defineEventHandler(async (event) => {
  const polls = await fetchPollsFromDatabase();
  return polls;
});

// POST /api/polls
export const POST = defineEventHandler(async (event) => {
  // Benutzer-Authentifizierung prüfen
  // ...existing code...
  
  // Daten verarbeiten
  const pollData = await readBody(event);
  const createdPoll = await createPollInDatabase(pollData);
  return createdPoll;
});
```

Der erste Ansatz mit separaten Dateien pro HTTP-Methode ist in größeren Projekten zu bevorzugen, da er:

1. Bessere Trennung der Zuständigkeiten bietet
2. Einfacheres Testen einzelner Endpunkte ermöglicht
3. Zu kleineren, fokussierteren Dateien führt
4. Die Navigation im Code erleichtert
