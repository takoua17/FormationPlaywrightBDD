# FormationPlaywrightBDD 🚀

Framework de tests **BDD (Behavior-Driven Development)** automatisés pour l'application web [automationexercise.com](https://automationexercise.com/) avec **Playwright**, **TypeScript** et **Cucumber**.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Exécution des tests](#exécution-des-tests)
- [Structure du projet](#structure-du-projet)
- [Pattern Page Object](#pattern-page-object)
- [Refactorisation et BasePage](#refactorisation-et-basepage)
- [Conventions de code](#conventions-de-code)
- [Rapports et résultats](#rapports-et-résultats)
- [Exemples](#exemples)

---

## Vue d'ensemble

Ce projet implémente un **framework d'automatisation de tests** robuste et maintenable suivant les principes du **BDD**.

### Objectifs :
✅ Valider les fonctionnalités critiques du site d'automation exercise  
✅ Utiliser le **langage Gherkin** en français pour les scénarios  
✅ Maintenir une architecture scalable avec le **pattern Page Object**  
✅ Générer des rapports détaillés (Allure, HTML, vidéos, screenshots)  
✅ Faciliter la collaboration entre QA, développeurs et métier  

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│           Feature Files (Gherkin)                   │
│     connexion.feature, deconnexion.feature, ...     │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│       Cucumber Steps (Step Definitions)             │
│  connexionSteps.ts, deconnexionSteps.ts, ...        │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│      Page Objects (Locators + Actions)              │
│    ConnexionPage, DeconnexionPage, BasePage, ...    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│     Playwright (Browser Automation)                 │
│       + Hooks (Before/After, Screenshots)           │
└─────────────────────────────────────────────────────┘
```

### Flux d'exécution :

1. **Cucumber** lit les fichiers `.feature` en Gherkin
2. Mappe chaque step Gherkin à une **step definition** TypeScript
3. Les steps utilisent les **Page Objects** pour interagir avec l'UI
4. **Playwright** automatise le navigateur
5. **Hooks** gèrent la configuration (avant/après), vidéos et screenshots
6. **Allure/HTML** génère les rapports

---

## Technologies utilisées

| Technologie | Version | Rôle |
|---|---|---|
| **Playwright** | ^1.60.0 | Automatisation navigateur |
| **Cucumber** | ^12.9.0 | Framework BDD & parseur Gherkin |
| **TypeScript** | ^6.0.3 | Langage de programmation fortement typé |
| **ts-node** | ^10.9.2 | Exécution TypeScript sans compilation |
| **Allure** | ^3.9.0 | Génération de rapports visuels |
| **dotenv** | ^17.4.2 | Gestion des variables d'environnement |
| **JS-YAML** | ^5.0.0 | Parsing des fichiers de configuration |

---

## Installation

### Prérequis
- **Node.js** >= 16
- **npm** >= 8
- **Git**

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/youruser/formationPlaywrightBDD.git
cd formationPlaywrightBDD

# 2. Installer les dépendances
npm install

# 3. Installer les navigateurs Playwright
npx playwright install chromium
```

---

## Configuration

### Variables d'environnement (`.env`)

Créer un fichier `.env` à la racine du projet :

```env
# Credentials de test
USER_EMAIL=bejaouitakoua2@gmail.com
USER_PASSWORD=Takoua123

# Informations de paiement
CARD_NAME=BEJAOUI TAKOUA
CARD_NUMBER=4111111111111111
CARD_CVC=260
CARD_MONTH=02
CARD_YEAR=2090

# URL de base (optionnel)
BASE_URL=https://automationexercise.com/
```

### Fichier de configuration YAML (`config.yaml`)

```yaml
environnement:
  urlTest: "https://automationexercise.com/"

user:
  admin:
    login: "bejaouitakoua2@gmail.com"
    password: "Takoua123"

payment:
  cardName: "BEJAOUI TAKOUA"
  cardNumber: "4111111111111111"
  cvc: "260"
  MoisCard: "02"
  AnneeCard: "2090"
```

### Fichier `cucumber.config.js`

```javascript
module.exports = {
  default: {
    paths: ["src/features/**/*.feature"],
    require: [
      "src/hooks/hooks.ts",
      "src/steps/**/*.ts",
      "src/support/pageFixture.ts"
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      'allure-cucumberjs/reporter',
      ["html", "rapports/cucumber-report.html"],
      ["json", "rapports/cucumber-report.json"]
    ]
  }
};
```

---

## Exécution des tests

### 1. Tous les tests
```bash
npm run test
```

### 2. Dry-run (sans exécution, juste parsing)
```bash
npm run test:dry
```

### 3. Tests avec un tag spécifique
```bash
npx cucumber-js --tags @smoke
npx cucumber-js --tags "@connexion or @logout"
```

### 4. Générer les rapports Allure
```bash
npm run report
```

### 5. Nettoyer les anciens résultats
```bash
npm run clean
```

---

## Structure du projet

```
formationPlaywrightBDD/
├── src/
│   ├── features/
│   │   └── ui/
│   │       ├── connexion.feature          # Scénarios de connexion
│   │       ├── deconnexion.feature        # Scénarios de déconnexion
│   │       ├── panier.feature             # Scénarios du panier
│   │       ├── produit.feature            # Scénarios des produits
│   │       └── checkout.feature           # Scénarios du paiement
│   │
│   ├── steps/
│   │   └── ui/
│   │       ├── connexionSteps.ts          # Steps de connexion
│   │       ├── deconnexionSteps.ts        # Steps de déconnexion
│   │       ├── panierSteps.ts             # Steps du panier
│   │       ├── produitSteps.ts            # Steps des produits
│   │       └── checkoutSteps.ts           # Steps du paiement
│   │
│   ├── pages/
│   │   ├── basePage.ts                    # Classe de base (refactorisée)
│   │   ├── connexionPage.ts               # Page Object - Login
│   │   ├── deconnexionPage.ts             # Page Object - Logout
│   │   ├── panierPage.ts                  # Page Object - Panier
│   │   ├── produitPage.ts                 # Page Object - Produits
│   │   └── checkoutPage.ts                # Page Object - Checkout
│   │
│   ├── hooks/
│   │   └── hooks.ts                       # Setup/Teardown (Before/After)
│   │
│   ├── support/
│   │   └── pageFixture.ts                 # Global page object
│   │
│   ├── config/
│   │   ├── configLoader.ts                # Chargement config YAML
│   │   └── config.yaml                    # Fichier de configuration
│   │
│   └── utils/
│       └── helpers.ts                     # Fonctions utilitaires
│
├── rapports/
│   ├── screenshot/                        # Screenshots des échecs
│   ├── videos/                            # Vidéos des tests
│   ├── allure-results/                    # Résultats Allure bruts
│   ├── cucumber-report.html               # Rapport HTML Cucumber
│   └── cucumber-report.json               # Rapport JSON
│
├── allure-report/                         # Rapports Allure générés
├── playwright-report/                     # Rapports Playwright
│
├── cucumber.config.js                     # Configuration Cucumber
├── playwright.config.ts                   # Configuration Playwright
├── tsconfig.json                          # Configuration TypeScript
├── package.json                           # Dépendances & scripts
├── .env                                   # Variables d'environnement
└── README.md                              # Ce fichier
```

---

## Pattern Page Object

### Principe

Le **Page Object Model (POM)** encapsule les locateurs et actions d'une page dans une classe dédiée.

**Avantages :**
- ✅ Maintenabilité : changements de locateurs centralisés
- ✅ Réutilisabilité : méthodes partagées entre les steps
- ✅ Lisibilité : steps ciblées et clairement séparées des actions UI
- ✅ Scalabilité : facile d'ajouter nouvelles pages

### Structure d'un Page Object

```typescript
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class ConnexionPage extends BasePage {
  // 1. Locateurs (éléments)
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly btnLogin: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.btnLogin = page.locator('[data-qa="login-button"]');
  }

  // 2. Méthodes (actions)
  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  async saisirEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async cliquerLogin(): Promise<void> {
    await this.btnLogin.click();
  }

  // 3. Getters (assertions)
  async getLoggedUsername(): Promise<string> {
    return await this.getTextContent(this.logged);
  }
}
```

### Utilisation dans les steps

```typescript
import { When } from "@cucumber/cucumber";
import { ConnexionPage } from "../../pages/connexionPage";

When("je saisie mon login {string}", async function (email) {
  const loginPage = new ConnexionPage(pageFixture.page);
  await loginPage.saisirEmail(email);
});
```

---

## Refactorisation et BasePage

### Problème initial

Les Page Objects avaient des **méthodes dupliquées** :
- `accepterPopup()` répétée 3 fois avec 2 implémentations différentes
- ~10 méthodes identiques `textContent() ?? ""`
- Maintenance difficile et incohérences

### Solution : BasePage

Création d'une classe de base `BasePage.ts` :

```typescript
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Accepte les popups standard du site
   */
  async accepterPopup(): Promise<void> {
    try {
      const popup = this.page.locator('xpath=/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]/p');
      await popup.waitFor({ state: "visible", timeout: 500 });
      await popup.click();
    } catch (e) {
      // Pas de popup, continuer
    }
  }

  /**
   * Récupère le contenu textuel d'un locateur
   */
  async getTextContent(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? "";
  }

  /**
   * Vérifie si un élément est visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      return await locator.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }
}
```

### Tous les Page Objects héritent de BasePage

```typescript
export class ConnexionPage extends BasePage {
  // Hérite automatiquement de accepterPopup(), getTextContent(), etc.
}

export class ProduitPage extends BasePage {
  // Peut l'utiliser sans redéfinir
}
```

### Résultats

| Métrique | Avant | Après | Gain |
|---|---|---|---|
| Copies de `accepterPopup()` | 3 | 1 | -67% |
| Implémentations `getTextContent()` | ~10 | 1 | -90% |
| Lignes de code dupliqué | ~50 | 0 | -100% |
| Maintenance | Difficile | Facile | ✅ |

---

## Conventions de code

### Nommage

**Page Objects :**
```typescript
ConnexionPage          // Login
DeconnexionPage        // Logout
PanierPage             // Panier
ProduitPage            // Produits
CheckoutPage           // Paiement
```

**Steps :**
```typescript
connexionSteps.ts      // Steps de connexion
deconnexionSteps.ts    // Steps de déconnexion
panierSteps.ts         // Steps du panier
```

**Features :**
```gherkin
@connexion
Feature: connexion a l application
  @connexionValide
  Scenario: ...
```

### Formatage des Steps Gherkin

**Français obligatoire** :
```gherkin
Given je suis sur la page de connexion
When je saisie mon login "<email>"
And je saisie mon mot de passe "<pass>"
Then je me rederige vers la page d'acceuil et "Logged in as" s affiche
```

**Pattern des steps :**
- `Given` : préconditions / setup
- `When` : actions utilisateur
- `Then` : assertions / vérifications
- `And` / `But` : continuations

### Granularité

❌ **Trop fin** (pas bon) :
```gherkin
When je clique sur le champ email
And j attends 500ms
And je tape "email@test.com"
And j appuie sur Tab
```

✅ **Correct** (réutilisable) :
```gherkin
When je saisie mon login "email@test.com"
```

### Async/Await obligatoire

```typescript
// ✅ Bon
async function monAction(): Promise<void> {
  await this.element.click();
}

// ❌ Mauvais
function monAction() {
  this.element.click();  // N'attend pas
}
```

---

## Rapports et résultats

### Types de rapports générés

#### 1. Rapport HTML Cucumber
**Fichier** : `rapports/cucumber-report.html`  
**Contient** : Steps, scénarios, tags, durée  

#### 2. Rapport Allure
**Fichiers** : `allure-report/`, `allure-results/`  
```bash
npm run report
```
Affiche :
- ✅ Tests passés / ❌ échoués
- 📸 Screenshots
- 🎥 Vidéos
- ⏱️ Timelines
- 📊 Statistiques

#### 3. Screenshots automatiques
**Dossier** : `rapports/screenshot/`  
Capturés à chaque échec et nommés selon le scénario

#### 4. Vidéos de test
**Dossier** : `rapports/videos/`  
Enregistrées pour les tests échoués

### Hooks (Before/After)

Fichier : `src/hooks/hooks.ts`

```typescript
BeforeAll(() => {
  // Initialisation globale
  browser = await chromium.launch({ headless: false });
});

Before(() => {
  // Avant chaque scénario
  context = await browser.newContext({...});
  pageFixture.page = await context.newPage();
});

After(async ({ result, pickle }) => {
  if (result?.status == Status.PASSED) {
    // Screenshot si succès
    const img = await pageFixture.page.screenshot({...});
    await this.attach(img, "image/png");
  }
  
  // Récupérer la vidéo
  const videoPath = await pageFixture.page.video()?.path();
  if (result?.status == Status.PASSED && videoPath) {
    const video = fs.readFileSync(videoPath);
    await this.attach(video, "video/webm");
  }
});

AfterAll(() => {
  await browser.close();
});
```

---

## Exemples

### Exemple 1 : Créer un nouveau test de connexion

**1. Ajouter le scénario (.feature)**
```gherkin
# src/features/ui/connexion.feature
@connexion
Feature: connexion a l application

  @connexionValide
  Scenario: connexion avec des coordonnes valides
    Given je suis sur la page de connexion
    When je saisie mon login "bejaouitakoua2@gmail.com"
    And je saisie mon mot de passe "Takoua123"
    And je clique sur le bouton connexion
    Then je me rederige vers la page d'acceuil et "Logged in as" s affiche
```

**2. Les steps existent déjà** dans `src/steps/ui/connexionSteps.ts`

**3. Le Page Object existe** : `src/pages/connexionPage.ts`

**4. Exécuter**
```bash
npm run test
```

### Exemple 2 : Créer une nouvelle page et ses tests

**1. Créer le Page Object**
```typescript
// src/pages/wishlistPage.ts
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class WishlistPage extends BasePage {
  readonly addToWishlistBtn: Locator;
  readonly wishlistItems: Locator;

  constructor(page: Page) {
    super(page);
    this.addToWishlistBtn = page.locator('[data-qa="add-to-wishlist"]');
    this.wishlistItems = page.locator('.wishlist-item');
  }

  async cliquerAjouterAuWishlist(): Promise<void> {
    await this.accepterPopup();
    await this.addToWishlistBtn.click();
  }

  async getNbrArticlesWishlist(): Promise<number> {
    return await this.wishlistItems.count();
  }

  async getArticleWishlist(index: number): Promise<string> {
    return await this.getTextContent(this.wishlistItems.nth(index));
  }
}
```

**2. Créer les steps**
```typescript
// src/steps/ui/wishlistSteps.ts
import { When, Then } from "@cucumber/cucumber";
import { WishlistPage } from "../../pages/wishlistPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let wishlistPage: WishlistPage;

When("je clique sur ajouter au wishlist", async function () {
  wishlistPage = new WishlistPage(pageFixture.page);
  await wishlistPage.cliquerAjouterAuWishlist();
});

Then("l article s ajoute au wishlist", async function () {
  const nbArticles = await wishlistPage.getNbrArticlesWishlist();
  await expect(nbArticles).toBeGreaterThan(0);
});
```

**3. Créer le feature file**
```gherkin
# src/features/ui/wishlist.feature
@wishlist
Feature: gestion de la liste de souhaits

  @wishlistAjout
  Scenario: ajouter un article au wishlist
    Given je suis sur la page de connexion
    When je saisie mon login ""
    And je saisie mon mot de passe ""
    And je clique sur le bouton connexion
    When je clique sur ajouter au wishlist
    Then l article s ajoute au wishlist
```

**4. Exécuter**
```bash
npx cucumber-js --tags @wishlist
```

---

## Points clés à retenir

✅ **Page Object Model** : Centraliser les locateurs et actions  
✅ **Héritage BasePage** : Éviter la duplication de code  
✅ **Gherkin en français** : Faciliter la compréhension métier  
✅ **Async/Await** : Toujours attendre les actions  
✅ **Tags Cucumber** : Organiser et filtrer les tests  
✅ **Rapports** : Générer Allure pour la traçabilité  
✅ **Variables d'environnement** : Sécuriser les credentials  
✅ **Hooks** : Gérer le cycle de vie des tests  

---

## Dépannage courant

### Problème : Tests qui timeout
```bash
# Augmenter le timeout dans playwright.config.ts
actionTimeout: 15000,        // 15 secondes
navigationTimeout: 30000,    // 30 secondes
```

### Problème : Locateur non trouvé
```bash
# Inspecter l'élément et mettre à jour le Page Object
# ou utiliser des sélecteurs plus robustes (data-qa, role-based)
```

### Problème : Popup non acceptée
```typescript
// Améliorer la méthode accepterPopup() dans BasePage
async accepterPopup(): Promise<void> {
  const selectors = [
    'xpath=/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]/p',
    'button.btn-close',
    '[aria-label="Close"]'
  ];
  for (const selector of selectors) {
    try {
      await this.page.locator(selector).click({ timeout: 500 });
      break;
    } catch {}
  }
}
```

---

## Contribution

Les contributions sont les bienvenues ! 

1. Fork le repository
2. Créer une branche (`git checkout -b feature/maFeature`)
3. Commit les changements (`git commit -m 'Ajout maFeature'`)
4. Push vers la branche (`git push origin feature/maFeature`)
5. Ouvrir une Pull Request

**Respecter** :
- Les conventions de code
- La structure des dossiers
- Les tests passants
- Les rapports avant merge

---

## Auteur

**BEJAOUI TAKOUA**

---

## License

MIT

---

## Support

📧 Pour les questions : [support@example.com](mailto:support@example.com)  
🐛 Pour signaler un bug : Ouvrir une issue GitHub  
💬 Discussions : GitHub Discussions

---

**Dernière mise à jour** : Juillet 2026  
**Version** : 1.0.0
