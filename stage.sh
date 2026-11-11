set -e

# Оставляем логин закомментированным, если вы уже авторизовались на сервере вручную
# GH_USER="ВАШ_ЛОГИН_GITHUB"
# GH_PAT="ВАШ_ТОКЕН_ПЕРСОНАЛЬНОГО_ДОСТУПА_GHP"
# REGISTRY="ghcr.io"
# echo "$GH_PAT" | docker login $REGISTRY -u $GH_USER --password-stdin

# Указываем ОБА файла конфигурации для стейджа, чтобы скачались нужные версии
echo "📥 Скачивание обновленных образов из GHCR для stage..."
docker compose -f docker-compose.yaml -f docker-compose.stage.yaml pull

echo "🚀 Перезапуск 9 контейнеров монорепозитория..."
docker compose -f docker-compose.yaml -f docker-compose.stage.yaml up -d --remove-orphans

echo "🧹 Безопасная очистка места от старых версий образов..."
docker image prune -f

echo "✅ Деплой на stage успешно завершен!"
