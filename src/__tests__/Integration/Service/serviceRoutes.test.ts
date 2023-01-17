import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedService1, mockedService2, mockedUpdateService1 } from "../../Mocks/Integration/service.mock";
import { mockedUser, mockedUserAdm, mockedUserAdmLogin, mockedUserLogin, mockedUserWorker, mockedUserWorkerLogin } from "../../Mocks/Integration/user.mock";

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
        
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("femaleOnly");
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");

        expect(response.body.title).toEqual("Meu celular caiu na piscina")
        expect(response.body.description).toEqual("Me empurraram e acabei caindo na piscina. Ele não quis ligar")
        expect(response.body.femaleOnly).toEqual(false)
        expect(response.body.status).toEqual("pendente")
        
        expect(response.status).toBe(201);
    });

    test("POST /users/services - Should not be able to create a service without authentication", async () => {
        await request(app).post("/users").send(mockedUserWorker);
        await request(app).post("/login").send(mockedUserWorkerLogin);
        const response = await request(app).post("/users/services").send(mockedService2);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });
    
    test("GET /users/services - It should be able to list all services", async () => {
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        await request(app).post("/users/services").send(mockedService2).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
        
        const loginWorkerResponse = await request(app).post("/login").send(mockedUserWorkerLogin);
        const response = await request(app).get("/users/services").set("Authorization", `Bearer ${loginWorkerResponse.body.token}`);
        
        expect(response.body).toHaveLength(2);
    });
        
    test("GET /users/services - It should not be able to list services without authentication", async () => {
        await request(app).post("/login").send(mockedUserWorkerLogin);
        const response = await request(app).get("/users/services");
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("GET /users/services - Should not be able to list services if isWorker = false", async () => {
        const loginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get("/users/services").set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });
    //--- verificado
    test("GET users/services/:servicesId - Must be able to list a service", async () => {
        const loginUserResponse = await request(app).post("/login").send(mockedUserWorkerLogin);
        const service = await request(app).get("/users/services").set("Authorization", `Bearer ${loginUserResponse.body.token}`);
        
        const response = await request(app).get(`/users/services/${service.body[0].id}`).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
        
        expect(response.status).toBe(200);
    });
    
    test("GET users/services/:servicesId - Must not be able to list a service without authentication", async () => {
        const loginResponse = await request(app).post("/login").send(mockedUserWorkerLogin);
        const service = await request(app).post("/users/services").send(mockedService2).set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        const response = await request(app).get(`/users/services/${service.body.id}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("GET users/services/:servicesId - Must not be able to list a service if isWorker = false", async () => {
        const loginResponse = await request(app).post("/login").send(mockedUserLogin);
        const service = await request(app).post("/users/services").send(mockedService2).set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        const response = await request(app).get(`/users/services/${service.body.id}`).set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("GET users/services/:servicesId - Should not be able to list a service with invalid id", async () => {
        await request(app).post("/users").send(mockedUserWorker);
        const loginResponse = await request(app).post("/login").send(mockedUserWorkerLogin);
        
        const response = await request(app).get("/users/services/13970660-5dbe-423a-9a9d-5c23b37943cf").set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("GET users/:userId/services - It should be possible to list all services for a single user", async () => {
        const loginUserRespone = await request(app).post("/login").send(mockedUser);
        await request(app).post("/users/services").send(mockedService1).set("Authorization", `Bearer ${loginUserRespone.body.token}`);
        await request(app).post("/users/services").send(mockedService2).set("Authorization", `Bearer ${loginUserRespone.body.token}`);
        
        await request(app).post("/users").send(mockedUserAdm);
        const loginAdmRespone = await request(app).post("/login").send(mockedUserAdmLogin);
        const users = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmRespone.body.token}`);
        
        const response = await request(app).get(`/users/${users.body[0].id}/services`).set("Authorization", `Bearer ${loginAdmRespone.body.token}`);
        
        expect(response.body).toHaveLength(2);
        expect(response.status).toBe(200);
    });

    test("GET users/:userId/services - Must not be able to list a user's services without authentication", async () => {
        await request(app).post("/users").send(mockedUserAdm);
        const loginRespone = await request(app).post("/login").send(mockedUserAdmLogin);        
        const users = await request(app).get("/users").set("Authorization", `Bearer ${loginRespone.body.token}`);
        const response = await request(app).get(`/users/${users.body[0].id}/services`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });
    
    test("GET users/:userId/services - You shouldn't be able to list a service if you're not an administrator or owner", async () => {
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const users = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const loginWorkerResponse = await request(app).post("/login").send(mockedUserWorkerLogin);
        
        const response = await request(app).get(`/users/${users.body[0].id}/services`).set("Authorization", `Bearer ${loginWorkerResponse.body.token}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    // test("GET users/:userId/services - Should not be able to list a service with invalid id", async () => {
    //     const loginRespone = await request(app).post("/login").send(mockedUserAdmLogin);
    //     const response = await request(app).get(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf/services`).set("Authorization", `Bearer ${loginRespone.body.token}`);
        
    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(404);
    // });
    // // // --- verificado
    
    // test("PATCH users/:userId/services/:servicesId - It must be possible to update a service", async () => {
    //     const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
    //     const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
    //     const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
    //     const service = await request(app).post("/users/services").send(mockedService1).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
    //     const findService = await request(app).get(`/users/${findUser.body[0].id}/services`).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
    //     const response = await request(app).patch(`/users/${findUser.body[0].id}/services/${findService.body[0].id}`).send(mockedUpdateService1).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
        
    //     expect(response.body).toHaveProperty("id");
    //     expect(response.body).toHaveProperty("title");
    //     expect(response.body).toHaveProperty("description");
    //     expect(response.body).toHaveProperty("category");
    //     expect(response.body).toHaveProperty("femaleOnly");
    //     expect(response.body).toHaveProperty("status");
    //     expect(response.body).toHaveProperty("createdAt");
    //     expect(response.body).toHaveProperty("updatedAt");
        
    //     expect(response.body.title).toEqual("Meu celular caiu na piscina atualizado");
    //     expect(response.body.description).toEqual("Me empurraram e acabei caindo na piscina. Ele não quis ligar atualizado");
    //     expect(response.body.deletedAt).toEqual(null);
    //     expect(response.body.femaleOnly).toEqual(false);
    //     expect(response.body.status).toEqual("pendente");

    //     expect(response.status).toBe(200);
    // });

    // test("PATCH users/:userId/services/:servicesId - Must not be able to update a service without authentication", async () => {
    //     const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
    //     const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
    //     const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
    //     const service = await request(app).post("/users/services").send(mockedService1).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
    //     const findService = await request(app).get(`/users/${findUser.body[0].id}/services`).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
    //     const response = await request(app).patch(`/users/${findUser.body[0].id}/services/${findService.body[0].id}`).send(mockedUpdateService1);
        
    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    // });

    // test("PATCH users/:userId/services/:servicesId - Should not be able to update a service with invalid id", async () => {
    //     const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
    //     const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
    //     const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
    //     const service = await request(app).post("/users/services").send(mockedService1).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
    //     const findService = await request(app).get(`/users/${findUser.body[0].id}/services`).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
    //     const response = await request(app).patch(`/users/${findUser.body[0].id}/services/13970660-5dbe-423a-9a9d-5c23b37943cf`).send(mockedUpdateService1);
        
    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(404);
    // });

    // test("DELETE users/:userId/services/:servicesId - It must be possible to delete a service", async () => {
    //     const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
    //     const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
    //     const loginUserRespone = await request(app).post("/login").send(mockedUserLogin);
    //     const findService = await request(app).get(`/users/${findUser.body[0].id}/services`).set("Authorization", `Bearer ${loginUserRespone.body.token}`);
    //     const response = await request(app).delete(`/users/${findUser.body[0].id}/services/${findService.body[0].id}`).set("Authorization", `Bearer ${loginUserRespone.body.token}`);
        
    //     expect(response.status).toBe(204);
    // });

    test("DELETE users/:userId/services/:servicesId - Must not be able to delete a service without authentication", async () => {
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        console.log(findUser.body);
        
        const loginUserRespone = await request(app).post("/login").send(mockedUserLogin);
        await request(app).post("/users/services").send(mockedService1).set("Authorization", `Bearer ${loginUserRespone.body.token}`);
        const findService = await request(app).get(`/users/${findUser.body[0].id}/services`).set("Authorization", `Bearer ${loginUserRespone.body.token}`);
        console.log(findService.body);
        
        const response = await request(app).delete(`/users/${findUser.body[0].id}/services/${findService.body[0].id}`)
        console.log(response.body);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("DELETE users/:userId/services/:servicesId - Should not be able to delete a service with invalid id", async () => {
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const loginUserRespone = await request(app).post("/login").send(mockedUserLogin);
        
        const response = await request(app).delete(`/users/${findUser.body[0].id}/services/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${loginUserRespone.body.token}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });
});
