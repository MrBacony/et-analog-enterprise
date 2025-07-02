# Workshop: Enterprise-Entwicklung mit AnalogJS und File-Router

## Überblick
In diesem 75-minütigen Workshop (plus 15 Minuten Puffer) entwickeln wir eine moderne Polling-App mit AnalogJS. Wir fokussieren uns auf drei zentrale Themen:

1. **Feature-orientierte Architektur** mit NX Workspaces und AnalogJS File-Router
2. **Authentifizierung** mit @analog-tools/auth für einfache OAuth2-Integration
3. **Skalierbarkeit** durch stateless Architektur für Enterprise-Deployments

Der Workshop ist praktisch ausgerichtet und folgt einem stufenweisen Ansatz - von der Basisfunktionalität bis zur Authentifizierung.

## Technische Grundlagen
- NX version 21
- Angular version 20
- AnalogJS version 1.19.0
- @analog-tools/auth version 0.4.0

## Anwendungsbeispiel: BitPoll

### Funktionalität
Wir entwickeln eine Polling-App mit folgenden Kernfunktionen:
- Umfragen mit Multiple-Choice-Optionen erstellen
- An bestehenden Umfragen teilnehmen
- Ergebnisse einsehen

### Autorisierungskonzept
Die Anwendung implementiert ein dreistufiges Autorisierungsmodell:
- **Anonyme Benutzer:** Können an Umfragen teilnehmen
- **Registrierte Benutzer:** Können Umfragen erstellen
- **Admin-Benutzer:** Können alle Umfragen verwalten

## Agenda

### 1. Einführung und File-Router-Konzept (15 Minuten)
- Vorstellung von AnalogJS und seinen Vorteilen
- Das File-Router-Konzept von AnalogJS verstehen
  - Wie Dateistrukturen in Routen übersetzt werden
  - Namenskonventionen für Pages (z.B. `(home).page.ts`, `[id].page.ts`)
- Demo der BitPoll-Anwendung und Workshop-Ziele

### 2. Feature-Library-Struktur erstellen (20 Minuten)
- Praktische Übung: Erstellung der Polls-Feature-Library
- Konfiguration von `vite.config.ts` für Library-Integration
- Korrekte Strukturierung der Pages in Feature Libraries
  - Bedeutung des Unterordners (`polls/`)
  - Page-Komponenten für Übersichts- und Detailansichten

### 3. API-Integration und Routing (25 Minuten)
- API-Endpunkte in Feature Libraries erstellen
  - HTTP-Methoden in separaten Dateien (polls.get.ts, polls.post.ts)
  - URL-Parameter für dynamische Routen ([id].get.ts)
- Praktische Übung: Poll-Übersichts- und Detail-APIs implementieren
- Integration mit Frontend-Komponenten
- Testing der API-Endpunkte

### 4. Authentifizierung mit @analog-tools/auth (15 Minuten)
- Die 4 Schritte zur Auth-Integration:
  1. Konfiguration von `auth.config.ts` mit unprotectedRoutes
  2. Environment-Variablen in `.env` einrichten
  3. Auth-Middleware erstellen
  4. Angular-App mit Auth-Providern konfigurieren
- Praktische Demonstration: Zugriffsschutz für Umfrageerstellung

### 5. Skalierbarkeit durch Stateless-Architektur (10 Minuten)
- Präsentation: AnalogJS und Stateless-Architektur
  - Vorteile der HTTP-only Cookie basierten Authentifizierung für Skalierung
  - Horizontale Skalierbarkeit mit Redis Session Store
  - Stateless API-Design für Load Balancing
- Architekturdiagramm: Wie die BitPoll-Anwendung in einer Multi-Instance-Umgebung funktioniert
- Best Practices für Enterprise-Deployments

### 6. Abschluss und Diskussion (5 Minuten + Puffer)
- Zusammenfassung der wichtigsten Konzepte
- Ausblick auf erweiterte Features (Results-Library)
- Q&A und Feedback

## Workshop-Struktur
Der Workshop ist nach dem "Follow-Along"-Prinzip aufgebaut:
1. **Fertige Grundstruktur**: Repository enthält die vorbereitete NX-Workspace-Struktur
2. **Schrittweise Implementierung**: Gemeinsames Entwickeln der Feature Libraries
3. **Checkpoints**: Vordefinierte Git-Branches für jeden Abschnitt, falls Teilnehmer nicht mitkommen

## Technische Voraussetzungen
- Node.js (mindestens v18)
- NX CLI v21 installiert
- Docker für Redis und Keycloak-Container
- Git
- Code-Editor (VS Code empfohlen)

## Vorbereitung für Teilnehmer
- Repository klonen: `git clone [repo-url]`
- Abhängigkeiten installieren: `npm install`
- Docker-Container starten: `docker-compose up -d`
