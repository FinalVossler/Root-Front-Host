# File Upload:

User Upload care:
https://app.uploadcare.com/projects/8defbd46d51016dbca37/files/3148d1e2-22b0-49f3-84d5-6a14488a645e/?limit=100&ordering=-datetime_uploaded

---

Je me suis rappelé du fait que le Ckeditor peut être la source de ralentissement lors du npm start et lors de la mise à jour du code.
Et que peut être en migrant vers Froala, on gagnerait en qualité d'expérience de développement.

J'ai donc eu la réflexion de d'abord faire un POC sur le webpack analyser afin de vérifier et confirmer ou rejeter ces soupçons.

Nous avons deux résultat possibles:

1- Le POC nous revèle que le ckeditor est vraiment le coupable.
2- Le POC nous révèle que le ckeditor est innocent, et que le coupable est réside soit dans autre source spécifique et individuelle, soit l'accumulation de plusieurs autres sources.

1- Et si le POC nous revèle que le ckeditor est vraiment le coupable, alors la séparation de ce dernier du reste et le fait de le mettre à disposition dans un microFrontend nous serait presque une nécessité avec ou sans la migration de Froala. (Pour moi c'est mieux que ça soit un MicroFrontend plutôt qu'un plugin pour des raisons que j'avais déjà articulé durant la phase de migration Webpack)

Car si on part sur une séparation du ckeditor et on y arrive, on aura gagné:
a- En rapidité de temps de compilation ET avant la migration ET après la migration.
b- La partie Ckeditor sera cette fois-ci bien encapsulée de façon à ce que la migration sera à la fois plus facile à développer, et plus rapide (Moins d'impact et mois d'inquiètude sur le fait d'avoir causé une regression sans en être conscient)
c- Si la migration s'avère être un échec, aucun soucis, on aura au moins gagné en temps de compilation en continuant de travailler sur le Ckeditor. (À noter que L'impact de la MicroFrontend du ckeditor me parait considérablement moins important que celui de la migration Froala. Faut juste maitriser la partie Devops qu'on met en place une fois et à laquelle on ne devrait plus y toucher)
d- Finalement: Ça sera l'opportunité d'introduire les MicroFrontend dans notre architecture.

Donc en conclusion, et pour résumé, ça sera 3 oiseaux frappés par une seul pierre (migration plus sûre vers Froala + temps de compilation + Intro sur les microFrontend)

2- Et si le POC avec le webpack analyser nous révèle que le ckeditor n'est pas vraiment le coupable, alors ça ne sera que 2 oiseaux frappés par une seule pierre (Une migration plus sûre vers Froala + Intro sur les MicroFrontend)

Bien évidemment, on aura le tas d'autres avantages sur les MicroFrontend que j'avais déjà cité une centaine de fois
1- Telle que l'opportunité de commencer à utiliser le TypeScript sur Froala.
2- Moins de complexités et moins d'inconsistences niveau code
3- Ou encore un mini équivalent d'un storybook gratuit juste par la mise en place d'un MicroForntend (Et franchement le fait de mentionner le fait que ce dernier peut aussi être ajouté dans notre monolithe ne change rien au débat puisque le storybook n'est de 1 Pas notre raison principale de migration et de 2: cette méthode va à l'encontre de ce que j'ai voulu réaliser par ma toute première reflexion qui était d'encapsuler, de simplifier et de minimiser, donc c'est un peu comme aller contre la toute première premise par laquelle j'ai batit toute la logique. Cette suggestion m'a donc paru absurde quelque soit les petits hack alternatives qu'on pourrait mettre en place pour simuler un environnement simple en microFrontend, ce dernier étant plus officiel et plus consistent avec le courant de la stack Frontend actuelle dans le monde.)

En gros, si vous avez des alternatives en tête, il vaut mieux ne pas les communiquer juste pour montrer que l'on sait faire autrement dans le cas ou vous même pensiez que cest alternatives ne sont pas assez signifiantes ou convaicantes. PK, parce que ça fait toute simplement perdre du temps et de l'enrgie dans des débats inutiles.

2 autres dev front - étude de test + po + proxu po + ux +
faire des dev et des tests unitaires sur + rituel agile + scrum + atelier de conception
un gros savoir faire en react + gitlab-ci + kubernetes +

---

Crypto: transparent + scam
on perdait l'idée principale + centralisation + étant le contraire + compliant + transparent
contre le blanchiment d'argent + cleaner l'écosystème + on travaille avec la MF + certifié + déposer un dossier pour travailler avec
les autorité à Singapoure + Client Talking issuers + banque d'investissement + plateforme de trading
4 solutions:

1- La market making as a service (monthly subscription) créer le marché autour de la cripto (créer le hamza coin, payé que par ça:
elle n'est pas connu + pas de marché => voir des market makers)
2- custody (wallet)
3- Borkbrokrage => conversion d'une crytpo vers cryto
4- treasurey management (suivie + conseil)

90 = 60 à Paris
