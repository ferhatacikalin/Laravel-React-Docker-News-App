#!/bin/bash

# ! bring down any service instance if it exists
docker-compose down

# ? Change Permissions for Artisan
chmod +x artisan

# ? Remove everything in the storage/database & bootstrap/cache directory
sudo rm -rf storage/database/*
sudo rm -rf bootstrap/cache/*.php

# Start & Build Container Stack
docker-compose up -d --build

# * Install Laravel Dependencies

docker exec -i backend composer install

# * Install Front-end Dependencies & Build
docker exec -i client npm i
docker exec -i client npm run prod

# ! Generate Key & Caching/Optimizing Config
docker exec -i backend php artisan key:generate

# ! Migrate and Generate Passport Encryption Key

docker exec -i backend composer dump-autoload
docker exec -i backend php artisan migrate:fresh --seed
docker exec -i backend chmod o+w ./storage/ -R

docker exec -i backend php artisan news:fetch
