# Nginx File Server

Этот документ описывает настройку и использование nginx файлового сервера с Docker volume для отдачи статических файлов.

## Описание

Nginx файловый сервер предоставляет удобный способ хранения и распространения статических файлов через веб-интерфейс. Сервер работает в Docker контейнере и использует named volume для постоянного хранения файлов.

## Компоненты

### Docker образ
- **Dockerfile**: `docker/nginx/Dockerfile.file-server`
- **Базовая image**: `nginx:alpine`
- **Порт**: `8080`

### Конфигурация nginx
- **Конфигурационный файл**: `docker/nginx/nginx-file-server.conf`
- **Возможности**:
  - Автоиндекс директорий
  - CORS поддержка
  - Правильные MIME типы
  - Настройки кэширования
  - Принудительное скачивание для документов и архивов

### Volume
- **Имя**: `files-data`
- **Точка монтирования**: `/usr/share/nginx/files`
- **Назначение**: Постоянное хранение файлов

## Запуск

### Development
```bash
# Запуск с базовой конфигурацией
docker-compose up -d nginx-file-server

# Или запуск всех сервисов
docker-compose up -d
```

### Production
```bash
# Запуск с production конфигурацией
docker-compose -f docker-compose.prod.yml up -d nginx-file-server

# Или запуск всех production сервисов
docker-compose -f docker-compose.prod.yml up -d
```

## Использование

### Веб-интерфейс
Откройте в браузере: `http://localhost:8080`

Вы увидите:
- Информационную страницу с инструкциями
- Автоиндекс файлов и директорий

### Прямой доступ к файлам
```
http://localhost:8080/files/имя_файла
http://localhost:8080/files/директория/файл
```

### Примеры URL
- Документ PDF: `http://localhost:8080/files/documents/report.pdf`
- Изображение: `http://localhost:8080/files/images/photo.jpg`
- Архив: `http://localhost:8080/files/backup.zip`

## Добавление файлов

### Через volume
Файлы автоматически доступны в контейнере через volume `files-data`.

### Копирование файлов в volume
```bash
# Скопировать файл в volume (через временный контейнер)
docker cp local_file.txt nginx_file_server_container:/usr/share/nginx/files/

# Или используйте docker volume commands
docker volume inspect files-data
```

### Создание структуры директорий
```bash
# Создать директории в volume
docker exec -it nginx_file_server_container mkdir -p /usr/share/nginx/files/{documents,images,archives}
```

## Поддерживаемые типы файлов

### Автоматическое скачивание
- **Документы**: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, RTF
- **Архивы**: ZIP, RAR, 7Z, TAR, GZ, BZ2, XZ

### Просмотр в браузере
- **Изображения**: PNG, JPG, JPEG, GIF, ICO, SVG
- **Веб-файлы**: HTML, CSS, JS
- **Шрифты**: WOFF, WOFF2, TTF, EOT

## Настройки безопасности

### CORS
Сервер настроен с поддержкой CORS для кросс-доменных запросов:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range
```

### Логи
- **Access лог**: `/var/log/nginx/file-server-access.log`
- **Error лог**: `/var/log/nginx/file-server-error.log`

### Ограничения
- **Размер файла**: до 1GB
- **Server tokens**: отключены (скрыта версия nginx)

## Мониторинг

### Просмотр логов
```bash
# Логи контейнера
docker logs nginx_file_server_container

# Логи nginx в реальном времени
docker exec -it nginx_file_server_container tail -f /var/log/nginx/file-server-access.log
```

### Проверка статуса
```bash
# Статус контейнера
docker ps | grep nginx_file_server

# Проверка volume
docker volume ls | grep files-data
```

## Остановка

```bash
# Остановить только файловый сервер
docker-compose stop nginx-file-server

# Остановить и удалить контейнер
docker-compose rm -f nginx-file-server

# Полная очистка (включая volume - ОСТОРОЖНО!)
docker-compose down -v
```

## Примеры интеграции

### В веб-приложении
```javascript
// Скачивание файла
fetch('http://localhost:8080/files/document.pdf')
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    a.click();
  });
```

### С API
```bash
# Скачивание через curl
curl -O http://localhost:8080/files/archive.zip

# Получение списка файлов
curl http://localhost:8080/files/
```

## Устранение неполадок

### Проблема: Файлы не отображаются
1. Проверьте, что volume примонтирован: `docker volume inspect files-data`
2. Проверьте права доступа к файлам в контейнере
3. Убедитесь, что файлы находятся в правильной директории

### Проблема: Ошибки CORS
1. Проверьте настройки CORS в конфигурации nginx
2. Убедитесь, что клиент отправляет правильные заголовки

### Проблема: Медленная работа
1. Проверьте логи на наличие ошибок
2. Увеличьте настройки keepalive_timeout если необходимо
3. Проверьте производительность диска для volume

## Расширенные настройки

### Добавление аутентификации
Можно добавить HTTP Basic Auth в конфигурацию nginx:

```nginx
location / {
    auth_basic "Restricted Area";
    auth_basic_user_file /etc/nginx/.htpasswd;
    # остальные настройки...
}
```

### SSL/HTTPS
Для production рекомендуется настроить SSL:

```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    # остальные настройки...
}
```

### Ограничение доступа по IP
```nginx
location / {
    allow 192.168.1.0/24;
    allow 10.0.0.0/8;
    deny all;
    # остальные настройки...
}
```