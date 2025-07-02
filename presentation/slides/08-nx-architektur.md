---
layout: two-cols
class: align-top
---

<carbon-checkmark /> Mit **additionalPagesDirs** können Routes aus verschiedenen Feature-Libraries automatisch eingebunden werden.

```bash
et-analog-enterprise/
├── apps/
│   ├── bitpoll/               # Haupt-App
│   └── bitpoll-e2e/           # E2E Tests
├── libs/                      # Feature Libraries
│   ├── core/                  # Basisdienste
│   ├── polls/                 # Poll-Feature
│   ├── results/               # Ergebnis-Feature
│   ├── admin/                 # Admin-Feature
│   └── shared/                # Geteilte Komponenten
└── docker/                    # Docker-Setup
```

> 💡 **Workshop-Fokus:** Wir konzentrieren uns auf die `polls`-Feature-Library und deren Integration.

::right::

### Vorteile dieser Architektur

- 📋 Organisation: Klare Zuständigkeiten, verbesserte Teamarbeit
- 🔄 Wiederverwendung: Modularer Code, gemeinsame Komponenten
- ⚡ Performance: Schnellere Builds, effizientere CI/CD
- 📈 Skalierung: Wächst mit dem Team, Enterprise-tauglich
