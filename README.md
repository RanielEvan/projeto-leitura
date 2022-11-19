# Projeto Leitura

### Configurações da Maquina Virtual

## BANCO DE DADOS

- Docker:
  `sudo docker volume create leitura-vl`

- MySQL:
  `sudo docker run -p 3306:3306 --name leitura-db -e MYSQL_ROOT_PASSWORD=teste@12345 -e MYSQL_DATABASE=leitura -e MYSQL_USER=leitura -e MYSQL_PASSWORD=teste@123 -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
