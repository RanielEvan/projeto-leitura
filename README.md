# Projeto Leitura

### Configurações da Maquina Virtual

## BANCO DE DADOS

- Docker:
  `sudo docker network create --driver bridge leitura`
  `sudo docker volume create leitura-vl`

- Postgres:
  `sudo docker run --name db-leitura --network=leitura -e "POSTGRES_PASSWORD=teste@123" -p 5432:5432 -v "leitura-vl:/var/lib/postgresql/data" -d postgres`
  Depois de criado, foi necessário acessa-lo e criar o banco de dados 'leitura'.

- MySQL (não funcionou):
  `sudo docker run -p 3306:3306 --network leitura --name leitura-db -e MYSQL_ROOT_PASSWORD=teste@12345 -e MYSQL_DATABASE=leitura -e MYSQL_USER=leitura -e MYSQL_PASSWORD=teste@123 -d mysql/mysql-server --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
