---
layout: two-cols
---

# Feature-orientierte Architektur mit NX


<div class="mr-6 mt-8"> 

```bash
et-analog-enterprise/
├── apps/
│   ├── bitpoll/               # Haupt-App
│   └── bitpoll-e2e/           # E2E Tests
└── libs/                      # Feature Libraries
    ├── core/                  # Basisdienste
    ├── polls/                 # Poll-Feature
    ├── results/               # Ergebnis-Feature
    ├── admin/                 # Admin-Feature
    └── shared/                # Geteilte Komponenten
```

> 💡 **Workshop-Fokus:** Wir konzentrieren uns auf die `polls`-Feature-Library und deren Integration.

</div>

::right::

<br><br>
<br>


### Vorteile dieser Architektur

- 📋 Organisation: Klare Zuständigkeiten, verbesserte Teamarbeit
- 🔄 Wiederverwendung: Modularer Code, gemeinsame Komponenten
- ⚡ Performance: Schnellere Builds, effizientere CI/CD
- 📈 Skalierung: Wächst mit dem Team, Enterprise-tauglich
