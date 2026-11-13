set -e

echo "📥 Скачивание обновленных образов из GHCR для stage..."
docker compose -f docker-compose.deploy.yml -f docker-compose.stage.yml pull

echo "🚀 Перезапуск 9 контейнеров монорепозитория..."
docker compose -f docker-compose.deploy.yml -f docker-compose.stage.yml up -d --remove-orphans

echo "🧹 Безопасная очистка места от старых версий образов..."
docker image prune -f

echo "✅ Деплой на stage успешно завершен!"
