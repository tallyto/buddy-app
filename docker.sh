
docker-machine create --driver amazonec2 buddy-api
docker-machine env buddy-api
eval $(docker-machine env buddy-api)
docker-machine inspect buddy-api
eval $(docker-machine env -u)
docker-compose up -d --build
