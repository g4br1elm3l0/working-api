# WorKing API

### End Points

#### /login


**POST - FORMATO DE REQUISIÇÃO** > 

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

#### /users

**POST - FORMATO DE REQUISIÇÃO** `STATUS 201`

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

#### /users

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

#### /users/workers

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

#### /users/:id
**DELETE - FORMATO DE RESPOSTA** > `STATUS 204 NO CONTENT`

```
  No body returned for response
```


#### /users/:idUser/services/:idService

**DELETE - FORMATO DE RESPOSTA** > `STATUS 204 NO CONTENT`

```
  No body returned for response
```

#### /users/services

**POST - FORMATO DE REQUISIÇÃO** 

```
{
	"title": "Minha bike",
  "description": "BIKE FUDIDA",
	"category": "CONSERTO"
}
```

**FORMATO DE RESPOSTA** > `STATUS 201`

```
{
	"title": "Minha bike",
	"description": "BIKE FUDIDA",
	"deletedAt": null,
	"id": "42ac91d5-9947-40ee-9bb1-a25a5bcd3c18",
	"femaleOnly": false,
	"status": "pendente",
	"createdAt": "2023-01-13T21:44:44.125Z",
	"updatedAt": "2023-01-13T21:44:44.125Z"
}
```
#### /users/services

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


#### /worker-services

**POST - FORMATO DE REQUISIÇÃO** 


```
 {
	"userId": "f71551e2-ae87-481c-b723-f6965797134a",
  "userServiceId": "90df4a8b-9d4f-4d41-8beb-59a3c3e890b0"
}
```

**POST - FORMATO DE RESPOSTA** > `STATUS 201`

```
EMBREVE
```







####Developers
- [Anibal Farias](https://www.linkedin.com/in/anibal-farias-28a25a163/ "Anibal Farias")
- [Eduardo Henrique](https://www.linkedin.com/in/eduardo-henrique-9b4a911a6/ "Eduardo Henrique")
- [Filipe Lucena](https://www.linkedin.com/in/filipe-de-lucena-paiva/ "Filipe Lucena")
- [Gabriel Melo](https://www.linkedin.com/in/gabrielmelo98dev/ "Gabriel Melo")
- [Joabe Conrado](https://www.linkedin.com/in/joabe-conrado-borges-cavalcante-b77919218/ "Joabe Conrado")
- [Leonardo Miranda](https://www.linkedin.com/in/leonardo-miranda-do-nascimento/ "Leonardo Miranda")
