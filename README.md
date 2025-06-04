переименовать в backend .env.example в .env

cd backend
composer update

cd ..
docker compose up


docker-compose exec backend php artisan key:generate

docker-compose exec backend php artisan migrate