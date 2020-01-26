
Pour lancer le projet sans docker :

Renommer le .env.dist en .env
npm run bdd_script (charge les données)

sudo npm run all (obligé en sudo sur mon pc, par rapport a mon installation de .next)

Lancer le projet avec docker :

docker-compose build && docker-compose up

Application accessible : localhost:3000

Dans le dossier parser existe plusieurs script pour remplir la bdd via les fichiers excell.



