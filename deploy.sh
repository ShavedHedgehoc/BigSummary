set -e


# GH_USER="ВАШ_ЛОГИН_GITHUB"
# GH_PAT="ВАШ_ТОКЕН_ПЕРСОНАЛЬНОГО_ДОСТУПА_GHP"
# REGISTRY="ghcr.io"

# echo "🔑 Логин в GitHub Container Registry..."
# echo "$GH_PAT" | docker login $REGISTRY -u $GH_USER --password-stdin

echo "📥 Скачивание обновленных образов из GHCR..."
docker compose -f docker-compose.deploy.yml pull

echo "🚀 Перезапуск 9 контейнеров монорепозитория..."
docker compose -f docker-compose.deploy.yml up -d --remove-orphans

echo "🧹 Безопасная очистка места от старых версий образов..."
docker image prune -f

echo "✅ Деплой успешно завершен!"