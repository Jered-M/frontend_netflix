# Guide de Déploiement Frontend sur Render

## Méthode 1 : Site Statique (Recommandée)

### Étape 1 : Pousser les changements sur GitHub
```bash
cd frontend
git add .
git commit -m "Prepare for Render deployment"
git push
```

### Étape 2 : Créer un nouveau service sur Render
1. Allez sur [render.com](https://render.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur **"New +"** → **"Static Site"**

### Étape 3 : Configurer le déploiement
- **Repository** : Sélectionnez `frontend_netflix`
- **Name** : `frontend-netflix` (ou votre choix)
- **Branch** : `main`
- **Root Directory** : (laisser vide)
- **Build Command** : `npm install && npm run build`
- **Publish Directory** : `dist`

### Étape 4 : Variables d'environnement
Sur Render, vous n'avez PAS besoin de variables d'environnement car l'URL du backend est déjà codée en dur dans votre code.

### Étape 5 : Déployer
Cliquez sur **"Create Static Site"**

Render va :
- Installer les dépendances (`npm install`)
- Builder votre application (`npm run build`)
- Déployer le contenu du dossier `dist`

**Votre frontend sera accessible à une URL comme :** `https://frontend-netflix-xxx.onrender.com`

---

## Méthode 2 : Version CDN (Simple)

Si vous préférez déployer la version CDN (sans build), vous pouvez utiliser un simple serveur HTTP.

### Créer un fichier `server.js`
```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '.')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Configuration sur Render
- **Type** : Web Service
- **Build Command** : `npm install`
- **Start Command** : `node server.js`
- **Add** express à package.json : `npm install express`

---

## Alternative : Déployer sur Vercel (Plus simple pour React)

Vercel est optimisé pour les applications React/Vite :

### Commandes rapides :
```bash
# Installer Vercel CLI
npm install -g vercel

# Dans le dossier frontend
cd frontend
vercel

# Suivre les instructions :
# - Set up and deploy? Yes
# - Which scope? (votre compte)
# - Link to existing project? No
# - Project name? frontend-netflix
# - Directory? ./
# - Override settings? No
```

**Avantages de Vercel :**
- Déploiement en 30 secondes
- HTTPS automatique
- Redéploiement automatique à chaque push
- Gratuit pour projets personnels

---

## Alternative : Netlify

1. Installer Netlify CLI : `npm install -g netlify-cli`
2. Dans le dossier frontend : `netlify deploy --prod`
3. Drag & drop le dossier `dist` après avoir fait `npm run build`

---

## Après le déploiement

### Vérifier que tout fonctionne :
1. **Testez les endpoints API** : Ouvrez la console du navigateur
2. **Vérifiez CORS** : Assurez-vous que votre backend accepte les requêtes de la nouvelle URL
3. **Testez la navigation** : Films, Séries, Recherche

### Si vous avez des erreurs CORS :
Ajoutez l'URL de votre frontend dans `backend/config/config.py` :
```python
CORS_ORIGINS = [
    "http://localhost:3000",
    "https://votre-frontend.onrender.com"  # Ajoutez cette ligne
]
```

Puis commitez et pushez le backend.

---

## Recommandation

**Pour un projet React/Vite, je recommande Vercel ou Netlify** car ils sont spécialement conçus pour ce type d'applications et le déploiement est instantané.

**Render fonctionne aussi très bien** mais prend un peu plus de temps pour le build initial.
