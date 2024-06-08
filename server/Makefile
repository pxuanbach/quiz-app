# development
dev:
	npm run dev

up:
	docker-compose down && docker-compose up -d

upb:
	docker-compose down && docker-compose up -d --build

down:
	docker-compose down

downv:
	docker-compose down -v

pull:
	docker-compose pull


# production
up-prod:
	docker-compose -f docker-compose.yml -f production.yml -f monitoring.yml down && docker-compose -f docker-compose.yml -f production.yml -f monitoring.yml up -d 

down-prod:
	docker-compose -f docker-compose.yml -f production.yml -f monitoring.yml down

downv-prod:
	docker-compose -f docker-compose.yml -f production.yml -f monitoring.yml down -v

pull-prod:
	docker-compose -f docker-compose.yml -f production.yml -f monitoring.yml pull


# build & push in bash script
TIME_TAG := $(shell date +%Y%m%ds)
build:
	docker build -t registry.gitlab.com/vocab-building/vocab-building-server:latest -t registry.gitlab.com/vocab-building/vocab-building-server:$(TIME_TAG) . -f Dockerfile.prod

push:
	docker push registry.gitlab.com/vocab-building/vocab-building-server --all-tags

