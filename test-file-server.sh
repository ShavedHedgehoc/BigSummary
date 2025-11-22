#!/bin/bash

# Скрипт для тестирования nginx файлового сервера
# Использование: ./test-file-server.sh [start|stop|status|add-files|clean]

set -e

CONTAINER_NAME="nginx_file_server_container"
VOLUME_NAME="files-data"
PORT="8080"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода цветного текста
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Функция проверки Docker
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker не установлен"
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        print_error "Docker не запущен или нет доступа"
        exit 1
    fi
}

# Функция запуска файлового сервера
start_file_server() {
    print_status "Запуск nginx файлового сервера..."
    
    # Проверяем, запущен ли уже контейнер
    if docker ps | grep -q $CONTAINER_NAME; then
        print_warning "Контейнер $CONTAINER_NAME уже запущен"
        return 0
    fi
    
    # Запускаем сервис
    if docker-compose up -d nginx-file-server; then
        print_status "Nginx файловый сервер запущен на порту $PORT"
        sleep 3
        check_status
    else
        print_error "Ошибка при запуске файлового сервера"
        exit 1
    fi
}

# Функция остановки файлового сервера
stop_file_server() {
    print_status "Остановка nginx файлового сервера..."
    
    if docker-compose stop nginx-file-server; then
        print_status "Файловый сервер остановлен"
    else
        print_warning "Возможно, контейнер не был запущен"
    fi
}

# Функция проверки статуса
check_status() {
    print_status "Проверка статуса файлового сервера..."
    
    # Проверяем контейнер
    if docker ps | grep -q $CONTAINER_NAME; then
        print_status "✅ Контейнер $CONTAINER_NAME запущен"
        
        # Проверяем доступность порта
        if curl -s http://localhost:$PORT > /dev/null; then
            print_status "✅ Сервер доступен на http://localhost:$PORT"
        else
            print_warning "⚠️ Сервер запущен, но не отвечает на порту $PORT"
        fi
        
        # Проверяем volume
        if docker volume ls | grep -q $VOLUME_NAME; then
            print_status "✅ Volume $VOLUME_NAME существует"
        else
            print_warning "⚠️ Volume $VOLUME_NAME не найден"
        fi
        
    else
        print_error "❌ Контейнер $CONTAINER_NAME не запущен"
    fi
}

# Функция добавления тестовых файлов
add_test_files() {
    print_status "Добавление тестовых файлов..."
    
    # Создаем тестовые директории
    docker exec $CONTAINER_NAME mkdir -p /usr/share/nginx/files/{documents,images,archives,web}
    
    # Создаем тестовый документ
    cat > /tmp/test-document.txt << EOF
Тестовый документ для nginx файлового сервера
==============================================

Дата создания: $(date)
Хост: $(hostname)

Этот файл создан для тестирования файлового сервера.
Если вы видите этот текст, значит сервер работает правильно!

Содержимое файла может быть любым.
EOF

    # Создаем HTML файл
    cat > /tmp/test-page.html << EOF
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Тестовая страница</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        .status { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Nginx файловый сервер работает!</h1>
        <div class="status">
            <strong>Статус:</strong> Успешно запущен и работает<br>
            <strong>Время:</strong> $(date)<br>
            <strong>Порт:</strong> $PORT
        </div>
        <p>Если вы видите эту страницу, значит файловый сервер настроен правильно!</p>
        <p>Вы можете загружать файлы в volume и они будут доступны по адресу:</p>
        <code>http://localhost:$PORT/files/</code>
    </div>
</body>
</html>
EOF

    # Создаем JSON файл
    cat > /tmp/test-data.json << EOF
{
  "test": true,
  "message": "Nginx файловый сервер работает!",
  "timestamp": "$(date -Iseconds)",
  "server": "nginx-file-server",
  "port": $PORT
}
EOF

    # Копируем файлы в контейнер
    docker cp /tmp/test-document.txt $CONTAINER_NAME:/usr/share/nginx/files/
    docker cp /tmp/test-page.html $CONTAINER_NAME:/usr/share/nginx/files/web/
    docker cp /tmp/test-data.json $CONTAINER_NAME:/usr/share/nginx/files/
    
    # Удаляем временные файлы
    rm -f /tmp/test-document.txt /tmp/test-page.html /tmp/test-data.json
    
    print_status "✅ Тестовые файлы добавлены:"
    print_status "   • /files/test-document.txt"
    print_status "   • /files/test-data.json"
    print_status "   • /files/web/test-page.html"
    
    # Показываем ссылки для тестирования
    echo
    print_status "Тестовые ссылки:"
    echo "  📄 Документ: http://localhost:$PORT/files/test-document.txt"
    echo "  🌐 Веб-страница: http://localhost:$PORT/files/web/test-page.html"
    echo "  📊 JSON данные: http://localhost:$PORT/files/test-data.json"
    echo "  📁 Список файлов: http://localhost:$PORT/files/"
}

# Функция очистки
clean_up() {
    print_warning "Удаление всех данных файлового сервера..."
    
    # Останавливаем контейнер
    docker-compose stop nginx-file-server 2>/dev/null || true
    docker-compose rm -f nginx-file-server 2>/dev/null || true
    
    # Удаляем volume
    if docker volume ls | grep -q $VOLUME_NAME; then
        docker volume rm $VOLUME_NAME
        print_status "✅ Volume $VOLUME_NAME удален"
    fi
    
    print_status "✅ Очистка завершена"
}

# Функция просмотра логов
show_logs() {
    print_status "Логи файлового сервера (последние 20 строк):"
    echo "=============================================="
    docker logs --tail=20 $CONTAINER_NAME 2>/dev/null || print_error "Не удалось получить логи"
}

# Функция помощи
show_help() {
    echo "Nginx File Server - Скрипт управления"
    echo "======================================"
    echo
    echo "Использование: $0 [команда]"
    echo
    echo "Команды:"
    echo "  start       - Запустить файловый сервер"
    echo "  stop        - Остановить файловый сервер"
    echo "  status      - Проверить статус сервера"
    echo "  add-files   - Добавить тестовые файлы"
    echo "  logs        - Показать логи сервера"
    echo "  clean       - Полная очистка (ОСТОРОЖНО!)"
    echo "  help        - Показать эту справку"
    echo
    echo "Примеры:"
    echo "  $0 start"
    echo "  $0 add-files"
    echo "  $0 status"
    echo
}

# Основная логика
main() {
    check_docker
    
    case "${1:-}" in
        "start")
            start_file_server
            ;;
        "stop")
            stop_file_server
            ;;
        "status")
            check_status
            ;;
        "add-files")
            add_test_files
            ;;
        "logs")
            show_logs
            ;;
        "clean")
            clean_up
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        "")
            print_error "Не указана команда"
            show_help
            exit 1
            ;;
        *)
            print_error "Неизвестная команда: $1"
            show_help
            exit 1
            ;;
    esac
}

# Запуск основной функции
main "$@"