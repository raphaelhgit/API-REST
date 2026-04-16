# EventHub - Plateforme de Billetterie en Ligne

## Énoncé du Projet

---

## Contexte de l'entreprise

**EventHub** est une startup spécialisée dans la billetterie événementielle en ligne. Face à la croissance du marché des événements culturels et professionnels, l'entreprise souhaite développer une plateforme permettant de connecter les organisateurs d'événements avec leur public.

Le marché cible comprend :
- Les salles de concert et théâtres
- Les organisateurs de conférences et meetups
- Les associations culturelles
- Les festivals et événements locaux

---

## Votre mission

Vous êtes mandaté pour concevoir et développer le **système de gestion de billetterie** (backend) qui alimentera l'application web EventHub.

Une équipe frontend a déjà développé l'interface utilisateur. Votre rôle est de créer le moteur qui fera fonctionner cette application.

---

## Besoins métier

### 1. Gestion des utilisateurs

L'application doit permettre à différents profils d'interagir avec la plateforme :

| Profil | Description | Droits |
|--------|-------------|--------|
| **Visiteur** | Personne non inscrite | Consulter les événements publics |
| **Utilisateur** | Personne inscrite | Acheter des billets, consulter ses achats |
| **Organisateur** | Créateur d'événements | Créer/gérer ses événements, voir ses statistiques |
| **Administrateur** | Gestionnaire plateforme | Accès complet au système |

**Règles métier :**
- Un utilisateur s'inscrit avec son email, un mot de passe et son nom
- L'email doit être unique dans le système
- Un utilisateur peut modifier son profil (nom)
- La connexion génère un accès temporaire sécurisé

---

### 2. Gestion des événements

Les organisateurs doivent pouvoir créer et gérer leurs événements.

**Informations d'un événement :**
- Titre de l'événement
- Description détaillée
- Date et heure
- Lieu (salle/adresse)
- Ville
- Prix du billet (en euros)
- Nombre total de places
- Catégorie (Concert, Conférence, Festival, Sport, Théâtre, Autre)
- Image de couverture (optionnel)

**Règles métier :**
- Seuls les organisateurs peuvent créer des événements
- Un organisateur ne peut modifier/supprimer que ses propres événements
- Le nombre de places disponibles diminue à chaque achat
- Un événement avec des billets vendus ne peut pas être supprimé
- Les événements passés restent visibles mais ne permettent plus l'achat

---

### 3. Système de billetterie

Le cœur de métier : permettre aux utilisateurs d'acheter des billets.

**Parcours d'achat :**
1. L'utilisateur consulte la liste des événements
2. Il sélectionne un événement et voit les détails
3. S'il reste des places, il peut acheter un billet
4. Un billet unique avec QR code est généré
5. Le billet apparaît dans "Mes billets"

**Règles métier :**
- Un utilisateur doit être connecté pour acheter
- L'achat est limité aux événements ayant des places disponibles
- Chaque billet possède un QR code unique
- Un billet peut avoir trois statuts : Valide, Utilisé, Annulé
- L'utilisateur peut consulter l'historique de tous ses billets

---

### 4. Tableau de bord organisateur

Les organisateurs ont besoin de suivre leurs performances.

**Fonctionnalités attendues :**
- Liste de mes événements créés
- Pour chaque événement : nombre de billets vendus / total
- Statistiques globales :
  - Nombre total d'événements
  - Nombre total de billets vendus
  - Chiffre d'affaires total

---

### 5. Recherche et filtrage

Les utilisateurs doivent pouvoir trouver facilement les événements qui les intéressent.

**Critères de recherche :**
- Par catégorie (Concert, Conférence, etc.)
- Par ville
- Par fourchette de prix
- Par date (événements à venir uniquement)

---

## Exigences non fonctionnelles

### Sécurité
- Les mots de passe ne doivent jamais être stockés en clair
- L'accès aux fonctionnalités sensibles doit être protégé
- Les données sensibles ne doivent pas être exposées (ex: mots de passe dans les réponses)

### Performance
- Le système doit répondre en moins de 500ms pour les opérations courantes
- La recherche d'événements doit supporter au moins 1000 événements

### Disponibilité
- Le système doit être accessible en ligne 24/7
- Une documentation de l'interface doit être disponible

---

## Livrables attendus

À l'issue du projet, vous devez fournir :

1. **Le système backend fonctionnel** connecté à l'application frontend fournie
2. **Une base de données** contenant des données de démonstration
3. **Une documentation** de l'interface (automatique)
4. **Le système déployé** et accessible en ligne

---

## Critères d'évaluation

| Critère | Pondération |
|---------|-------------|
| Toutes les fonctionnalités métier sont opérationnelles | 40% |
| Le système est sécurisé (accès, données) | 20% |
| La qualité et robustesse du code | 20% |
| Le déploiement fonctionne | 10% |
| Tests automatisés | 10% |

---

## Démonstration de la solution finale

### Scénarios de test

Pour valider que votre solution répond aux besoins, les scénarios suivants seront exécutés :

#### Scénario 1 : Parcours utilisateur
1. Un visiteur consulte la liste des événements
2. Il s'inscrit sur la plateforme
3. Il se connecte
4. Il achète un billet pour un événement
5. Il consulte son billet avec le QR code
6. Il se déconnecte

#### Scénario 2 : Parcours organisateur
1. Un organisateur se connecte
2. Il crée un nouvel événement (concert à Lyon, 50 places, 25€)
3. Il consulte son tableau de bord
4. Il modifie le prix de l'événement (30€)
5. Il vérifie que la modification est prise en compte
6. Il consulte ses statistiques

#### Scénario 3 : Gestion des places
1. Un événement a 2 places disponibles
2. Utilisateur A achète un billet → reste 1 place
3. Utilisateur B achète un billet → reste 0 place
4. Utilisateur C tente d'acheter → refusé (complet)

#### Scénario 4 : Recherche
1. Afficher uniquement les concerts
2. Afficher les événements à Paris
3. Afficher les événements à moins de 30€
4. Combiner : Conférences à Lyon à moins de 50€

---

## Données de démonstration

La solution doit être livrée avec des données permettant de tester immédiatement :

### Comptes utilisateurs

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| organisateur@example.com | password123 | Organisateur |
| utilisateur@example.com | password123 | Utilisateur |
| admin@example.com | password123 | Administrateur |

### Événements de démonstration

| Titre | Catégorie | Ville | Prix | Places |
|-------|-----------|-------|------|--------|
| Concert Jazz au Sunset | Concert | Paris | 35€ | 100 |
| Conférence Tech Leaders | Conférence | Lyon | 50€ | 200 |
| Festival Électro Summer | Festival | Marseille | 45€ | 500 |
| Match de Gala | Sport | Bordeaux | 25€ | 150 |
| Hamlet - Comédie Française | Théâtre | Paris | 40€ | 80 |

---

## Annexe : Interface utilisateur

L'application frontend fournie présente les écrans suivants :

### Pages publiques
- **Accueil** : Liste des événements avec filtres
- **Détail événement** : Informations complètes + bouton d'achat
- **Inscription** : Formulaire de création de compte
- **Connexion** : Formulaire d'authentification

### Pages utilisateur connecté
- **Mon profil** : Informations personnelles modifiables
- **Mes billets** : Liste des billets achetés avec QR codes

### Pages organisateur
- **Créer un événement** : Formulaire de création
- **Mes événements** : Liste avec actions (modifier, supprimer)
- **Tableau de bord** : Statistiques de ventes

---

## Ressources fournies

- Application frontend complète et fonctionnelle
- Structure de démarrage du projet backend
- Guide technique détaillé
- Scripts de validation des étapes

---

*Bon développement !*

*ISITECH B2-D - Formation Développement d'API*
