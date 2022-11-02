*******Réseau social de l'entreprise Groupomania (Backend - Frontend)*******
  
 ## Technologies :
 NodeJs, Vue.js v3 (vue-cli), Express, MongoDB.
  
 ## Dépendances :
 ### Backend :
 Bcrypt, Cors, Dotenv, Jsonwebtoken, Mongoose, Multer, Nodemon, password-validator.
 ### Frontend :
 Axios, Dotenv, Vue-Cli, Vue-router.
 
 ## Installation et démarrage du serveur Backend:
 1) Clonez le projet https://github.com/sylv0001/P7
 2) Ouvrez un terminal
 3) Se placer dans le dossier "groupomania-b" (backend)
 4) Renommez le fichier .env.example en .env
 5) Saisissez votre propre clé de déchiffrement (MY_TOKEN) et votre propre lien d'accès à votre base de données MongoDB (MONGO_LOGIN)
 6) Saisissez les commandes suivantes (pour installer les dépendences) : 
 > npm install

 > nodemon server (démarrage du server back).

 A la suite de cette dernière commande, vous devez avoir l'affichage de : 
  Listening on port 3000
  Connexion à MongoDB réussie !

NE FERMEZ PAS LE TERMINAL !

 ## Installation et démarrage du serveur Frontend:

 1) Ouvrez un nouveau terminal sans fermer le premier (Backend)
 2) Se placer dans le dossier "groupomania-b" (backend)
 4) Saisissez les commandes suivantes (pour installer les dépendences) : 
 > npm install

 > npm run serve (démarrage du server front).

A la suite de cette dernière commande, vous devez avoir l'affichage de : 
   App running at:
  - Local:   http://localhost:3001/
  - Network: http://192.168.0.10:3001/

NE FERMEZ PAS LE TERMINAL !

## Connexion au site:
Ouvrez votre navigateur et rendez-vous à l'adresse "http://localhost:3001"
Vous devez directement tomber sur la page de login
 
## Complément d'information importante:
Création d'un compte administrateur :
- Créer un compte sandart puis connectez-vous sur votre espace personnel MongoDb https://www.mongodb.com/, aller sur vos collections, cliquez sur users.
- Modifier la clé "admin" en "true" de votre utilisateur puis updatez pour valider votre changement.

Vous pouvez aussi utiliser le compte dont les informatios de connexion sont fournis dans le projet.

Vous pouvez maintenant utiliser le site dans sa totalité:
- Créer de compte
- Modifier de votre password de connexion
- Se connecter
- Poster un nouveau commentaire avec ou sans image
- Zoomer sur les images des commentaires déjà postés
- Modifier vos propres commentaires (l'administrateur peut aussi le faire)
- Supprimer l'image de votre commentaire
- Supprimer vos propres commentaires (l'administrateur peut aussi le faire)
- Supprimer votre compte personnel d'accès au site
- Se déconnecter

Sources du projet : 
https://course.oc-static.com/projects/DWJ_FR_P7/DW+P7+28-09-2022+Sce%CC%81nario.pdf

Cahier des charges:
https://course.oc-static.com/projects/DWJ_FR_P7/Cahier+des+charges+Groupomania.pdf
 
