
Pour lancer le projet sans docker :

Renommer le .env.dist en .env

Vous devez avoir aussi le service mongo démarré : sudo service mongodb start
npm run bdd_script (charge les données)

sudo npm run all (obligé en sudo sur mon pc, par rapport a mon installation de .next)

Lancer le projet avec docker :

Le service mongo doit etre stoppé en local : sudo service mongodb stop
docker-compose build && docker-compose up

Application accessible : localhost:3000

Dans le dossier parser existe plusieurs script pour remplir la bdd via les fichiers excell.



