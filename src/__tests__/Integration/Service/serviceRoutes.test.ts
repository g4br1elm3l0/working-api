import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedService1, mockedService2 } from "../../Mocks/Integration/service.mock";
import { mockedUser, mockedUserLogin, mockedUserWorker, mockedUserWorkerLogin } from "../../Mocks/Integration/user.mock";

/*
    POST users/services
    [v] - Must be able to create a service
    [v] - Should not be able to create a service without authentication
    [v] - Should not be able to create a service with isWorker = true
    GET users/services
    [v] - It should be able to list all services
    [v] - It should not be able to list services without authentication
    [v] - Should not be able to list services if isWorker = false
    GET users/services/:servicesId
    [x] - Must be able to list a service
    [x] - Must not be able to list a service without authentication
    GET users/:userId/services
    [x] - It should be possible to list all services for a single user
    [x] - Must not be able to list a user's services without authentication
    PATCH users/:userId/services/:servicesId
    [x] - It must be possible to update a service
    [x] - Must not be able to update a service without authentication
    DELETE users/:userId/services/:servicesId
    [x] - It must be possible to delete a service
    [x] - Must not be able to delete a service without authentication
*/

describe("/services", () => {
    let connection: DataSource;

    beforeAll( async () => {
        await dataSource.initialize()
            .then( res => connection = res )
            .catch( err => console.log(err) );
    });

    afterAll( async () => {
        await connection.destroy();
    });

    test("POST /users/services - Must be able to create a service", async () => {
        await request(app).post("/users").send(mockedUser);
        const loginRespone = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).post("/users/services").send(mockedService1).set("Authorization", `Bearer ${loginRespone.body.token}`);

        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("description");

        expect(response.body).toHaveProperty("category");
        expect(response.body.category).toHaveProperty("name");
        expect(response.body.category).toHaveProperty("id");

        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user).toHaveProperty("name");
        expect(response.body.user).toHaveProperty("email");
        expect(response.body.user).toHaveProperty("gender");
        expect(response.body.user).toHaveProperty("birthday");
        expect(response.body.user).toHaveProperty("profileImg");
        expect(response.body.user).toHaveProperty("telephone");
        expect(response.body.user).toHaveProperty("isActive");
        expect(response.body.user).toHaveProperty("isWorker");
        expect(response.body.user).toHaveProperty("isAdm");
        expect(response.body.user).toHaveProperty("createdAt");
        expect(response.body.user).toHaveProperty("updatedAt");
        expect(response.body.user).toHaveProperty("deletedAt");

        expect(response.body).toHaveProperty("deletedAt");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("femaleOnly");
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");

        expect(response.body.title).toEqual("Meu celular caiu na piscina")
        expect(response.body.description).toEqual("Me empurraram e acabei caindo na piscina. Ele não quis ligar")

        expect(response.body.category.name).toEqual("Assistência Técnica")

        expect(response.body.user.name).toEqual("leonardo");
        expect(response.body.user.email).toEqual("leonardo@mail.com");
        expect(response.body.user.birthday).toEqual("02/10/98");
        expect(response.body.user.gender).toEqual("masculino");
        expect(response.body.user.profileImg).toEqual("profileleo");
        expect(response.body.user.telephone).toEqual("67999956325");
        expect(response.body.user.isActive).toEqual(true);
        expect(response.body.user.isWorker).toEqual(false);
        expect(response.body.user.isAdm).toEqual(false);
        expect(response.body.user.deletedAt).toEqual(null);

        expect(response.body.deletedAt).toEqual(null)
        expect(response.body.femaleOnly).toEqual(false)
        expect(response.body.status).toEqual("pendente")
        
        expect(response.status).toBe(201);
    });

    test("POST /users/services - Should not be able to create a service without authentication", async () => {
        await request(app).post("/users").send(mockedUserWorker);
        const loginRespone = await request(app).post("/login").send(mockedUserWorkerLogin);
        const response = await request(app).post("/users/services").send(mockedService2);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("POST /users/services - Should not be able to create a service with isWorker = true", async () => {
        await request(app).post("/users").send(mockedUserWorker);
        const loginRespone = await request(app).post("/login").send(mockedUserWorkerLogin);
        const response = await request(app).post("/users/services").send(mockedService2).set("Authorization", `Bearer ${loginRespone.body.token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });

    test("GET /users/services - It should be able to list all services", async () => {
        await request(app).post("/users").send(mockedUserWorker);
        const loginRespone = await request(app).post("/login").send(mockedUserWorker);
        const response = await request(app).get("/users/services").set("Authorization", `Bearer ${loginRespone.body.token}`);

        expect(response.body).toHaveLength(2);
        expect(response.body.user).not.toHaveProperty("password");
    });
    
    test("GET /users/services - It should not be able to list services without authentication", async () => {
        await request(app).post("/users").send(mockedUserWorker);
        const loginRespone = await request(app).post("/login").send(mockedUserWorkerLogin);
        const response = await request(app).get("/users/services");
        
        expect(response.body).toHaveProperty("message");
        expect(response.body).toBe(401);
    });

    test("GET /users/services - Should not be able to list services if isWorker = false", async () => {
        await request(app).post("/users").send(mockedUser);
        const loginRespone = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get("/users/services").set("Authorization", `Bearer ${loginRespone.body.token}`);
    
        expect(response.body).toHaveProperty("message");
        expect(response.body).toBe(403);
    });
});