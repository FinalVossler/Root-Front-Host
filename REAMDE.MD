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
