# Fallbeispiele PP BGDI Team

## Khôi Tran - 26.06.2025

---

# Fallbeispiel 1: Authentifizierung

---

## a) Wie gehst du vor, um die Ist-Architektur zu beschreiben?

Übersicht beschaffen durch:
1. Dokumentation studieren
2. Code, Deployments, Konfigurationen anschauen
3. Welche Auth Verfahren werden momentan genutzt?
    - Basic Auth
    - OAUTH2 / OIDC
    - Eigene Implementationen
5. Interviews mit Entwicklern
    - DEMO der Applikationen
    - Wo befinden sich momentan die grössten Pain-Points?

---

## a) Ist-Architektur (Teil 2)

6. Welches Authorization Schema wurde implementiert?
    - RBAC
    - ReBAC
    - ABAC
7. Welche Softwarekomponenten untersützen bereits welche Authentisierungs- und Authorisierungsmechanismen?
8. Gibt es User Lifecycle-Prozesse, wenn ja:
    - Wie werden neue User angelegt?
    - Wann werden sie gelöscht / aufgeräumt
9. M2M Kommunikation
    - Wie ist der Prozess für M2M Accounts?

10. Werden API-Gateways eingesetzt (AWS API Gateway, 3scale, ...)?

---

## b) Wie könnte eine Lösungsarchitektur aussehen? Sind allenfalls Varianten denkbar?

In der Industrie hat sich für solche Fälle nur ein Standard durchgesetzt:

OIDC/OAUTH2, jedoch sind in der Umsetzung verschiedene Varianten denkbar.

---

## Requirements weiter schärfen

- Anbindung externe IdP? AGOV, SwitchAAI, etc.
- Wie werden "Spezialfälle" gehandhabt (Service-Accounts, M2M Accounts)?
- Zuständigkeiten (wer hat welche Rechte im Benutzermanagement) / Prozesse definieren und dokumentieren

---

## AWS hauseigene Implementation: AWS Cognito

Vorteile:

- Gut integriert mit anderen AWS services (AWS IAM)
- Tiefe Betriebskosten (MaM - monthly active users)

Nachteile:
- komplizierte SSO-Federation Szenarien nicht möglich
- Feingranulares Rechte/Rollenmanagement
- Login-Flow und Tokeninhalte nicht anpassbar

---

## Opensource: Keycloak / RedHat SSO

Vorteile:
- Viele Stellen im Bund nutzen Keycloak
- Anbindbar an praktisch alle IdP
- Stark anpassbar (wenn auch manchmal bisschen kompliziert)
- Alles in eigener Hand

Nachteile:
- Wartung (neue Versionen, Migrationen)

---

## SaaS: Auth0

Vorteile:
- Muss nicht gewartet werden
- Hohe SLA
- externe IdPs auch unterstützt
- einfache Kostenkontrolle

Nachteile:
- Vertrauen an ein Drittanbieter

---

## c) Lösung im AWS Umfeld

1. Variantenentscheid
2. Verantwortlichkeiten / Monitoring / Wartung klären
3. Aufsetzen des OIDC Services
4. Prototypen / Demo-Applikationen für die neue Authentifizierung erstellen
5. Szenarien mit verschiedenen Rollen/Rechten präsentieren
6. Zero-Trust Ansatz?

---

## d) Transition

Aus Erfahrung:

Migration stufenweise: kein Big-Bang, Services nach-und-nach Migrieren.

1. Schulung für Entwickler zu OAUTH2/OIDC
    - Demos
    - Blueprints
    - Tutorials
2. Schulung für Support (Prozesse, Passwort-, MFA Reset)
3. Parallelbetrieb notwendig? (M2M)
  - Sync von Benutzeraccounts ins neue System
4. OAuth2Proxy für einfache Anwendungen
5. ClientSecret rotation prozess
    - Notifikation wenn Secret abläuft
    - Automatische rotierung der Secrets (z.B. AWS Secrets Manager, Hashicorp Vault)

---

# Fallbeispiel 2: Datenmanagement

---

## a) Welche Grundlagen müssen erarbeitet werden, um eine Lösung skizzieren zu können?

IST-Zustand dokumentieren:

- Übersicht für aktuelles Datenmodell erschaffen
- Was gibt es Datenflüsse und wann?
- Was für Schwächen im aktuellen Modell gibt es?
    - Daten-Abhängkeiten
    - Dateninkonsistenz / Dubletten / Datenqualität

--- 

## a) Grundlagenerarbeitung (2)

- Governance: Wer besitzt welche Daten
- Wie, wann und worüber werden Abnehmer informiert, wenn neue Daten verfügbar sind
- Zugriffsrechte und Nutzungsszenarien:
    - Wer hat auf welche Daten Zugriff?

Methoden:

- ERD Diagramme
- Data Lineage Tools
- Interviews / Workshops

---

## b) Wie würdest du die Transition gestalten?

## Ziel erarbeiten

In Zusammenarbeit mit Domänenexpert*innen, Data-Engineers, Entwickler, Betreiber:

### Zielmodell:
- Welche Ziele werden im neuen Modell verfolgt?
- Modellentscheide dokumentieren (welche Schwächen werden bewusst nicht angegangen)
- Neue Funktionen
- Rückwärtskompatibilität

---

## b) Transitionsgestaltung (2)

### Sonstige Rahmenbedingungen:
- Welche Storage Technologie / Persistenz?
- Werden andere, neue Schnittstelltypen und -formate gewünscht?
    - REST / Messaging / Kafka / GraphQL / SPARQL / ...
    - JSON / Protobuf / YAML / XML / ...

---

## Migrationsphasen definieren

- Neue Datenpipeline parallel aufbauen
- Splitbrainphase / Datensync, Datenqualität sicherstellen
- Stufenweise Services migrieren
- Abschaltung / Umschaltung der Altsysteme

---

## c) Wie würdest du sicherstellen, dass die Umsetzung gemäss der Skizze erfolgt?

- Grober Migrationsplan mit Meilensteinen definieren
- Meilensteine regelmässig überprüfen
- Monitoring/Alarming von alten und neuen Schnittstellen
- Datenqualität, Datenkonstistenz regelmässig prüfen

---

## d) Chancen und Risiken

### Chancen

- Einheitliche Datenbasis und Ressourcenmanagement:
  - Validierung, Konsistenzüberprüfung kann an einer Stelle und an einem Zeitpunkt geschehen
  - Ein Flaschenhals kann schneller identifiziert und behoben werden
- Weniger Wartungs- und Koordinationsaufwand

### Risiken

- Funktionalität von Alt- / Fremdsystemen muss u.U. nachgebaut werden
- Politikum / Akzeptanzprobleme bei Stakeholdern von Alt- / Fremdsystemen
- Unvorausgesehene Migrationsprobleme
- Zentralisierung / Vereinheitlichung der Datenmodelle kann die Komplexität exponentiell steigern
- Höhere Anforderungen an SLA