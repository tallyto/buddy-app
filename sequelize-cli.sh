yarn sequelize migration:create --name=create-users

yarn sequelize migration:create --name=create-files

yarn sequelize db:migrate

yarn sequelize db:migrate:undo 