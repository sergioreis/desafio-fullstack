# Desafio Fullstack

Desafio fullstack ReactJS + Spring Boot.

## BACKEND

Dentro do diretório backend do projeto abrir um terminal de comandos

INICAR O APP SPRING BOOT

1 - Criar/Baixar imagem a partir do Dockerfile


 " docker build -t desafiobackend_api_img  .  "

2 - verificar imagens

 docker images

3 - criar container a partir da imagem

 " docker run -d -p 8080:8080 desafiobackend_api_img "

4 - INICIAR O POSTGRES e a API

  docker-compose up


##  FRONTEND

Dentro do diretório do projeto abrir um terminal de comandos

1 - Criar/Baixar imagem a partir do Dockerfile


 " docker build -t desafiofrontend_img  . "

2 - verificar imagens

 docker images
 

3 - criar container a partir da imagem

 " docker run -d -p 3000:3000  desafiofrontend_img "

 ## ENDERECOS e PORTAS
 FRONTEND: http://localhost:3000
 
 BACKEND: http://localhost:8080

 SWAGGER: http://localhost:8080/swagger-ui/index.html

 
