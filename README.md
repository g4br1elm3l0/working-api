## Developers

- [Anibal Farias](https://www.linkedin.com/in/anibal-farias-28a25a163/ "Anibal Farias")
- [Eduardo Henrique](https://www.linkedin.com/in/eduardo-henrique-9b4a911a6/ "Eduardo Henrique")
- [Filipe Lucena](https://www.linkedin.com/in/filipe-de-lucena-paiva/ "Filipe Lucena")
- [Gabriel Melo](https://www.linkedin.com/in/gabrielmelo98dev/ "Gabriel Melo")
- [Joabe Conrado](https://www.linkedin.com/in/joabe-conrado-borges-cavalcante-b77919218/ "Joabe Conrado")
- [Leonardo Miranda](https://www.linkedin.com/in/leonardo-miranda-do-nascimento/ "Leonardo Miranda")

#### Principais tecnologias e ferramentas:
<div align="center" margin="auto">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="Express.Js" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
</div>

<div align="center">
  <img alt="GitHub Stats" width="45%" margin_right="10%" src="https://github-readme-stats-rho-vert.vercel.app/api?username=g4br1elm3l0&show_icons=true&theme=dracula&include_all_commits=true&count_private=true" />
    <img alt="GitHub Stats" width="45%" margin_right="10%" src="https://github-readme-stats-rho-vert.vercel.app/api?username=miranda-Leonardo&show_icons=true&theme=dracula&include_all_commits=true&count_private=true" />
        <img alt="GitHub Stats" width="45%" margin_right="10%" src="https://github-readme-stats-rho-vert.vercel.app/api?username=filipelucena1&show_icons=true&theme=dracula&include_all_commits=true&count_private=true" />
    <img alt="GitHub Stats" width="45%" margin_right="10%" src="https://github-readme-stats-rho-vert.vercel.app/api?username=eduardohenri22&show_icons=true&theme=dracula&include_all_commits=true&count_private=true" />
        <img alt="GitHub Stats" width="45%" margin_right="10%" src="https://github-readme-stats-rho-vert.vercel.app/api?username=joabeconrado19&show_icons=true&theme=dracula&include_all_commits=true&count_private=true" />
	    <img alt="GitHub Stats" width="45%" margin_right="10%" src="https://github-readme-stats-rho-vert.vercel.app/api?username=anibalmoraes&show_icons=true&theme=dracula&include_all_commits=true&count_private=true" />
	    
	    
</div>
	
	
 ## E algumas bibliotecas (JWT, YUP, PG, BcriptJS, Express Async Errors e outras)
   
   ## "A melhor plataforma para se conseguir um trabalho de modo rápido, fácil e sem burocracias"
   
   
   ### AQUI ESTÁ NO ARQUIVO PARA UTILIZAR NO INSOMNIA : https://drive.google.com/file/d/148mV_Wr-7GVfYI27V-SSDLsbzrEp07Ud/view?usp=sharing
   
   
  

### End Points

#### /login `LOGIN`


**POST - FORMATO DE REQUISIÇÃO** > `NÃO PRECISA DE AUTHORIZATION` 

```
{
	"email": "adm@kenzie.com",
	"password": "12345"
}
```

**POST - FORMATO DE RESPOSTA** > `STATUS 200`

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1dvcmtlciI6dHJ1ZSwiaXNBY3RpdmUiOnRydWUsImlzQWRtIjp0cnVlLCJpYXQiOjE2NzM4NzkzNjMsImV4cCI6MTY3Mzk2NTc2Mywic3ViIjoiZWIyOTI1MDEtZmYyNy00NzdjLTkzMDYtMjgzNTY5YTBlNTA5In0.LR3hdBAUAZ2J-VRUjjpFisXM1v15Puc3us64VvDy75c"
}
```

#### /users  `CRIAÇÃO DO USER`

**POST - FORMATO DE REQUISIÇÃO** `NÃO PRECISA DE AUTHORIZATION`

```
{
	"name": "Adm",
	"email": "adm@kenzie.com",
	"password": "12345",
	"birthday": "11-20-1999",
	"gender": "Masculino",
	"profileImg": "oi",
	"isWorker": true,
	"isAdm": true,
	"telephone": "89976999925"
}
```

**POST - FORMATO DE RESPOSTA**  > `STATUS 201`

```
{
	"name": "workerAdbm",
	"email": "adm1@kenzie.com",
	"gender": "Masculino",
	"birthday": "11-20-1999",
	"profileImg": "oi",
	"telephone": "79656533324",
	"isWorker": true,
	"isAdm": true,
	"deletedAt": null,
	"id": "3ba2d878-5e2c-4ddb-be5b-01b610d4607e",
	"isActive": true,
	"createdAt": "2023-01-18T18:19:01.422Z",
	"updatedAt": "2023-01-18T18:19:01.422Z"
}
```


#### /users   `LISTAGEM DE TODOS OS USERS`

**GET - FORMATO DE RESPOSTA** > `STATUS 200`

```
[
	{
		"isAdm": false,
		"isActive": true,
		"updatedAt": "2023-01-12T20:06:22.353Z",
		"createdAt": "2023-01-12T20:06:22.353Z",
		"isWorker": false,
		"telephone": "89976999944",
		"profileImg": "oi",
		"gender": "Masculino",
		"birthday": "11-20-1999",
		"email": "teste3@kenzie.com",
		"name": "teste3",
		"id": "bc013e4f-1856-4f88-b8c1-b363522f1af4"
	}
]

```

#### /users/workers  `LISTAGEM DE TODOS OS TRABALHADORES`

**GET - FORMATO DE RESPOSTA** > `STATUS 200`

```
[
	{
		"isAdm": false,
		"isActive": true,
		"updatedAt": "2023-01-12T20:06:22.353Z",
		"createdAt": "2023-01-12T20:06:22.353Z",
		"isWorker": false,
		"telephone": "89976999944",
		"profileImg": "oi",
		"gender": "Masculino",
		"birthday": "11-20-1999",
		"email": "teste3@kenzie.com",
		"name": "teste3",
		"id": "bc013e4f-1856-4f88-b8c1-b363522f1af4"
	}
]
```

#### /users/:id

**GET - FORMATO DE RESPOSTA** > `STATUS 200`

```
[
	{
		"isAdm": false,
		"isActive": true,
		"updatedAt": "2023-01-12T20:06:22.353Z",
		"createdAt": "2023-01-12T20:06:22.353Z",
		"isWorker": true,
		"telephone": "89976999944",
		"profileImg": "oi",
		"gender": "Masculino",
		"birthday": "11-20-1999",
		"email": "teste3@kenzie.com",
		"name": "teste3",
		"id": "bc013e4f-1856-4f88-b8c1-b363522f1af4"
	}
]
```

#### /users/:id  `ROTA PARA ATUALIZAR USUARIO`
**PATCH - EXEMPLO DE REQUISIÇÃO** > 

```
 {
  "name": "Léo"
 }
```


**PATCH - FORMATO DE RESPOSTA** > `STATUS 204`

```
{
	"isAdm": false,
	"isActive": true,
	"updatedAt": "2023-01-13T17:45:20.230Z",
	"createdAt": "2023-01-13T17:45:20.230Z",
	"isWorker": false,
	"telephone": "89976999944",
	"profileImg": "oi",
	"gender": "Masculino",
	"birthday": "11-20-1999",
	"email": "teste1@kenzie.com",
	"name": "Léo",
	"id": "a623fb9a-6686-4f74-aed1-d3d402f51e7f"
}
```

#### /users/:id  `ROTA PARA MOSTRAR UM USER POR ID, APENAS ADM PODE UTILIZAR!`


**DELETE - FORMATO DE RESPOSTA** > `STATUS 204 NO CONTENT`

```
  No body returned for response
```


#### /users/:userId/services/:idService  `DELETAR UM SERVIÇO`

```
  No body returned for response
```

**DELETE - FORMATO DE RESPOSTA** > `STATUS 204 NO CONTENT`


#### /users/services  `CRIAR UM SERVIÇO` 

**POST - FORMATO DE REQUISIÇÃO** 

```
{
	"title": "Consertem meu Celular",
  "description": "Preciso de alguém para consertar meu Celular",
	"category": "Assistência Técnica",
	"location": {
		"latitude": -15.798439165783435,
		"longitude": -20.20674897036983
	}
}
```

**FORMATO DE RESPOSTA** > `STATUS 201`

```
{
	"title": "Consertem meu Celular",
	"description": "Preciso de alguém para consertar meu Celular",
	"category": {
		"name": "assistência técnica",
		"id": "6b77294f-1dc9-4c3d-ab63-a821c1cde284"
	},
	"user": {
		"id": "b7cae3d9-84fa-4bf1-82b1-2cdc22dfc44f",
		"name": "ADM2",
		"email": "ADM2@kenzie.com",
		"gender": "Masculino",
		"birthday": "11-20-1999",
		"profileImg": "oi",
		"telephone": "79652553324",
		"isActive": true,
		"isWorker": false,
		"isAdm": true,
		"createdAt": "2023-01-18T18:46:40.068Z",
		"updatedAt": "2023-01-18T18:46:40.068Z",
		"deletedAt": null
	},
	"location": {
		"longitude": -20.20674897036983,
		"latitude": -15.798439165783435,
		"id": "0edef0d1-3623-4671-9286-b819d1beea5c"
	},
	"deletedAt": null,
	"id": "ac2b063e-d1ea-4fed-ae6f-436462ae7c9e",
	"femaleOnly": false,
	"status": "pendente",
	"createdAt": "2023-01-18T18:46:55.502Z",
	"updatedAt": "2023-01-18T18:46:55.502Z"
}
```
#### /users/services `LISTAR OS SERVIÇOS DISPONIVEIS`

**GET - FORMATO DE RESPOSTA** > `STATUS 200`

```
[
	{
		"id": "42ac91d5-9947-40ee-9bb1-a25a5bcd3c18",
		"title": "Minha bike",
		"description": "BIKE FUDIDA",
		"femaleOnly": false,
		"status": "pendente",
		"createdAt": "2023-01-13T21:44:44.125Z",
		"updatedAt": "2023-01-13T21:44:44.125Z",
		"deletedAt": null
	}
]
```
```
 {
	"userId": "f71551e2-ae87-481c-b723-f6965797134a",
  "userServiceId": "90df4a8b-9d4f-4d41-8beb-59a3c3e890b0"
}
```




#### /worker-services/:userId `POST`

#### /worker-services/:userId `DELETE`









