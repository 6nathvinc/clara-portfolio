#!/bin/bash
set -e

REMOTE_USER="nathouworks"
REMOTE_HOST="51.75.17.128"
REMOTE_PATH="/home/nathouworks/projects/clara-portfolio/site/"

echo "Déploiement en cours vers $REMOTE_HOST..."

rsync -avz --progress//
	--exclude '.git' \
	--exclude '.gitignore' \
	--exclude 'deploy.sh' \
	--exclude '.DS_Store' \
	./ "$REMOTE_USER@REMOTE_HOST:$REMOTE_PATH"

echo "Déploiement terminé"
