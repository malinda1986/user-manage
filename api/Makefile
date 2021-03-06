default: start

start:
	yarn dev
init:
	npx sequelize-cli db:drop
	npx sequelize-cli db:create
	npx sequelize-cli db:migrate
	npx sequelize-cli db:seed:all --debug
dev:
	yarn dev
