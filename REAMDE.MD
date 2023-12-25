Avantages:

1- Rafraichissement à la mise à jour
2- Explicite (is compiling... plutôt que rien du tout)
3- C'est plus rapide
4- Ouverture automatique du navigateur à la fin de la compilation
5- Micro (Fontend)
-Build plus petit
a- donc plus performant à la fois pour la chargement dans un navigateur
b- et pour le temps de compilation
-Code source plus petit
-Neutre en terme de technologies utilisées
-On peut avoir des micro Frontend mieux organisées dans le code avec des testes et des acccès à StoryBook pour que le métier
puisse tester.

1- Situation actuelle:
localhost qui marche sous le port 3000 et communique en proxy avec le port 4200
Les appels apis marchent
i18next de la traduction ça marche aussi
ckeditor marche
hot reload qui marche
sachant que j'ai mis à jour webpack et réglé des problèmes d'import qui n'était pas communiqué par l'ancienne version de webpack

2- Ce que j'envisage faire:

- Réglage des problèmes de redirection
- mise en place du hot module replacement
  -Hot reload
  -à envisager: hot module replacement sans prise en compte du state: webpack peut le faire par luis même avec une petite configuration
  -Encore mieux: hot module replacement avec prise en compte du state: @pmmmwh/react-refresh-webpack-plugin replaced react-hot-loader

integrate APIs
centralized way to check the market status on multiple exchances
interact with them from a single place.

engineering infrastructure
deployment
CICD
9-10 backend: 4 france 2 singapore 2 new york
Frontend: 2 senior + intermediate
frontend design
trading
how do we make this application: components UI: storybook, decide the style, design system,

trading client SDK =>
Backoffice application
internal application

main focus: trading plateforme, web socket, web worker,

Docker isn't necessary
Why do you use storyboo

---

- investisseur qualif, AML (blanchiment d'argent), accompagnement sur la création des contrats (deux côtés) services tiers (docusign)
  archivage sur le serveur soit en France, soit dans les pays enropéans (suivie les politiques des données)
  6 pays avec une 70 de clients, gérer entre 100 et 5 CGP (conseil de gestion patrimoine)

946750

florian.thabuis@

amazon,
coca

contrat -
service in portail client
portail client
dcp: plateform d'aqcuisition
construire les contrats de polices

dcp: accélérer le cycle de vente et arriver à construire le contrat (DSP) 70 jours (divisé par 3, mais toujours fois 2 par rapport
à l'objectif)

120 milles utilisateurs
9-midi
14h-
DSP: programme démarré 2 ans et demi (centaine d'utilisateurs), enjeux commerciaux assez fort
7 personnes, passage vers 9
organisation

agilité + SCRUM + entretien de l'agilité + aider à revoir les réunions

l'historique - typescript - lambda (serverless) fonction lambda AWS
React - POstgresSQL - SQL server () - base de données (pas de mongodb)
obligation compliant 120 milles d'utilisateur

Dora: Gitlab; le seul autoriser à utiliser AWS

BFF: Back for front (proxy - javascript)
sous-services (en typescript)
pas de redux (context api)

DSP
