# Netflix Clone - Frontend

Interface utilisateur React avec design Netflix pour un clone de streaming.

## 🎨 Aperçu

Application frontend moderne construite avec React qui reproduit fidèlement l'interface utilisateur de Netflix. Inclut une navigation fluide, des composants interactifs, et un design responsive.

## ✨ Fonctionnalités

- 🎬 **Page d'accueil** avec hero banner et films/séries tendances
- 🎞️ **Pages dédiées** Films et Séries avec plusieurs catégories
- 🔍 **Recherche** de films et séries
- 📺 **Page de détails** complète pour chaque média
- 👤 **Authentification** (Login/Register)
- ⭐ **Ma liste** pour sauvegarder ses favoris
- 🎯 **Lecteur vidéo** (placeholder)
- 📱 **Design responsive** style Netflix

## 🚀 Installation

### Prérequis
- Node.js 16+ (pour version Vite)
- OU aucun prérequis (version CDN)

### Option 1 : Version CDN (Rapide - Recommandée)

1. **Cloner le dépôt**
```bash
git clone https://github.com/Jered-M/frontend_netflix.git
cd frontend_netflix
```

2. **Lancer un serveur local**
```bash
python -m http.server 3000
```
OU
```bash
npx serve
```

3. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

La version CDN utilise `index.html` et `app-simple.js` avec React chargé via CDN.

### Option 2 : Version Vite (Développement)

1. **Installer les dépendances**
```bash
npm install
```

2. **Lancer le serveur de développement**
```bash
npm run dev
```

3. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📁 Structure du projet

```
frontend/
├── index.html              # Version CDN (point d'entrée simple)
├── app-simple.js          # Application React avec CDN
├── styles/
│   └── simple.css         # Styles pour version CDN
│
├── src/                   # Version Vite
│   ├── components/        # Composants réutilisables
│   │   ├── Header/       # Navigation principale
│   │   ├── Hero/         # Bannière d'accueil
│   │   ├── MovieRow/     # Rangée de films scrollable
│   │   └── MovieCard/    # Carte de film/série
│   │
│   ├── pages/            # Pages de l'application
│   │   ├── Home.jsx      # Page d'accueil
│   │   ├── Films.jsx     # Catalogue de films
│   │   ├── Series.jsx    # Catalogue de séries
│   │   ├── Search.jsx    # Résultats de recherche
│   │   ├── Player.jsx    # Lecteur vidéo
│   │   ├── Login.jsx     # Connexion
│   │   ├── Register.jsx  # Inscription
│   │   └── MyList.jsx    # Liste personnelle
│   │
│   ├── services/         # Services API
│   │   └── api.js        # Configuration Axios
│   │
│   ├── styles/           # Styles globaux
│   │   └── global.css
│   │
│   ├── App.jsx           # Composant principal
│   └── main.jsx          # Point d'entrée
│
├── package.json
└── vite.config.js
```

## 🎯 Composants principaux

### Header
Navigation fixe avec :
- Logo Netflix
- Menu (Accueil, Séries, Films, Ma liste)
- Barre de recherche
- Icônes utilisateur

### Hero
Bannière principale affichant :
- Image de fond du film vedette
- Titre et description
- Boutons "Lecture" et "Plus d'infos"
- Informations (note, année, durée)

### MovieRow
Rangée horizontale scrollable de films/séries :
- Défilement fluide
- Plusieurs cartes visibles
- Flèches de navigation (hover)

### MovieCard
Carte interactive pour chaque média :
- Poster du film
- Informations au survol
- Boutons d'action (Play, Ajouter, Info)
- Effet zoom au hover

## 🔌 Connexion au Backend

L'application se connecte au backend via l'API REST.

**Configuration dans `app-simple.js` ou `src/services/api.js`:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Endpoints utilisés

- `GET /api/trending` - Films et séries tendances
- `GET /api/films?query=Action` - Films par catégorie
- `GET /api/series?query=Drama` - Séries par catégorie
- `GET /api/media/:id` - Détails d'un média
- `GET /api/search?q=query` - Recherche
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

## 🎨 Design & Styles

### Palette de couleurs Netflix
- **Fond principal:** `#141414`
- **Rouge Netflix:** `#e50914`
- **Texte:** `#fff`, `#e5e5e5`
- **Gris secondaire:** `#b3b3b3`

### Typographie
- **Police:** Helvetica Neue, Helvetica, Arial, sans-serif
- **Titres hero:** 60px
- **Titres sections:** 24px
- **Texte standard:** 14-18px

### Effets interactifs
- Hover sur cartes : `transform: scale(1.1)`
- Transitions fluides : `0.3s ease`
- Scrollbar personnalisée
- Header transparent puis opaque au scroll

## 🌐 Navigation

### Routes disponibles

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Page d'accueil avec hero et tendances |
| `/#films` | Films | Catalogue de films par genre |
| `/#series` | Series | Catalogue de séries par genre |
| `/search?q=` | Search | Résultats de recherche |
| `/watch/:id` | Player | Lecteur vidéo |
| `/login` | Login | Connexion |
| `/register` | Register | Inscription |
| `/my-list` | MyList | Liste personnelle |

## 📦 Technologies

### Version CDN
- **React 18** (via CDN)
- **Axios** (via CDN)
- **Babel Standalone** (pour JSX)
- **Vanilla CSS**

### Version Vite
- **React 18**
- **React Router DOM 6**
- **Axios**
- **React Icons**
- **Vite** (Build tool)

## 🚧 Fonctionnalités à venir

- [ ] Authentification persistante avec localStorage
- [ ] Système de favoris fonctionnel
- [ ] Intégration d'un vrai lecteur vidéo
- [ ] Profils utilisateur multiples
- [ ] Mode hors-ligne
- [ ] Tests unitaires (Jest/Vitest)
- [ ] Progressive Web App (PWA)

## 🔧 Scripts disponibles

```bash
# Version Vite uniquement
npm run dev      # Démarrage en mode développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
```

## 📱 Responsive Design

L'application est optimisée pour :
- 💻 Desktop (1920px+)
- 💻 Laptop (1366px)
- 📱 Tablet (768px)
- 📱 Mobile (320px+)

## 🤝 Intégration Backend

Pour utiliser avec le backend :

1. **Cloner le backend**
```bash
git clone https://github.com/Jered-M/backends_netflix.git
```

2. **Lancer le backend**
```bash
cd backends_netflix
pip install -r requirements.txt
python app.py
```

3. **Le backend sera sur:** `http://localhost:5000`

4. **Le frontend communiquera automatiquement avec l'API**

## 🐛 Dépannage

### CORS Errors
Si vous rencontrez des erreurs CORS, vérifiez que :
- Le backend est lancé sur `http://localhost:5000`
- Flask-CORS est installé dans le backend
- L'URL de l'API est correcte dans la configuration

### Problèmes npm
Si `npm install` échoue, utilisez la version CDN :
- Ouvrez simplement `index.html` dans un navigateur
- Ou utilisez `python -m http.server 3000`

## 📄 Licence

MIT

## 👤 Auteur

**Jered M**
- GitHub: [@Jered-M](https://github.com/Jered-M)
- Backend: [backends_netflix](https://github.com/Jered-M/backends_netflix)

---

⭐ N'oubliez pas de mettre une étoile si ce projet vous a aidé !

## 📸 Captures d'écran

### Page d'accueil
Interface avec hero banner et films tendances

### Page Films
Catalogue organisé par genres

### Page de détails
Informations complètes sur le média sélectionné

---

**Note:** Ce projet est à des fins éducatives. Netflix est une marque déposée de Netflix, Inc.
