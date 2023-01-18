import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import { mockedUser, mockedUserAdm, mockedUserAdmLogin, mockedUserLogin, mockedUserWorker, mockedUserWorkerLogin } from "../../Mocks/Integration/user.mock";
import { mockedService1, mockedService2 } from "../../Mocks/Integration/service.mock";

describe("/worker-services", () => {
    let connection: DataSource;

    beforeAll( async () => {
        await dataSource.initialize()
            .then( res => connection = res )
            .catch( err => console.log(err) );
    });

    afterAll( async () => {
       await connection.destroy(); 
    });

    test("POST /worker-services/:userId - Should be able to list a service", async () => {
        await request(app).post("/users").send(mockedUser);
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        const service = await request(app).post("/users/services").send(mockedService1).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
        
        await request(app).post("/users").send(mockedUserWorker);
        
        await request(app).post("/users").send(mockedUserAdm);
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        
        const data = {
            userServiceId: service.body.id,
            acceptedAt: "17.01.23"
        };
        
        const loginWorkerResponse = await request(app).post("/login").send(mockedUserWorkerLogin);

        const response = await request(app).post(`/worker-services/${service.body.id}`).send(data).set("Authorization", `Bearer ${loginWorkerResponse.body.token}`);
        
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("acceptedAt");
        expect(response.body).toHaveProperty("userService");
        expect(response.body).toHaveProperty("worker");

        expect(response.body.userService).toHaveProperty("location");
        expect(response.body.userService).toHaveProperty("category");
        expect(response.body.userService).toHaveProperty("user");
        expect(response.body.userService).toHaveProperty("createdAt");
        expect(response.body.userService).toHaveProperty("status");
        expect(response.body.userService).toHaveProperty("description");
        expect(response.body.userService).toHaveProperty("title");
        expect(response.body.userService).toHaveProperty("id");

        expect(response.body.worker).toHaveProperty("isActive");
        expect(response.body.worker).toHaveProperty("isWorker");
        expect(response.body.worker).toHaveProperty("deletedAt");

        expect(response.body.deletedAt).toEqual(null);
        expect(response.body.acceptedAt).not.toEqual(null);

        expect(response.body.userService.user).not.toHaveProperty("password");
        expect(response.body.userService.createdAt).not.toEqual(null);
        expect(response.body.userService.status).toEqual("aceito");

        expect(response.body.worker).not.toHaveProperty("password");
        expect(response.body.worker.isActive).toEqual(true);
        expect(response.body.worker.isWorker).toEqual(true);
        expect(response.body.worker.deletedAt).toEqual(null);

        expect(response.status).toBe(201);
    });

    test("POST /worker-services/:userId - Should not be able to get a service without authentication", async () => {
        await request(app).post("/users").send(mockedUser);
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        const service = await request(app).post("/users/services").send(mockedService2).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
        
        await request(app).post("/users").send(mockedUserWorker);
        
        await request(app).post("/users").send(mockedUserAdm);
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const users = await request(app).get("/users/workers").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const data = {
            userId: users.body[0].id,
            userServiceId: service.body.id,
            acceptedAt: "17.01.23"
        };
        const response = await request(app).post(`/worker-services/${users.body[0].id}`).send(data)
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("POST /worker-services/:userId - Should not be able to get a service with invalid id", async () => {
        await request(app).post("/users").send(mockedUser);
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        const service = await request(app).post("/users/services").send(mockedService1).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
        
        await request(app).post("/users").send(mockedUserWorker);
        
        await request(app).post("/users").send(mockedUserAdm);
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const users = await request(app).get("/users/workers").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const data = {
            userId: users.body[0].id,
            userServiceId: service.body.id,
            acceptedAt: "17.01.23"
        };
        
        const loginWorkerResponse = await request(app).post("/login").send(mockedUserWorkerLogin);

        const response = await request(app).post("/worker-services/123456789").send(data).set("Authorization", `Bearer ${loginWorkerResponse.body.token}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("GET /worker-services - Must be able to list services", async () => {
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        
        const response = await request(app).get("/worker-services").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("acceptedAt");
        expect(response.body[0]).toHaveProperty("user");
        expect(response.body[0]).toHaveProperty("userService");

        expect(response.body[0].userService).toHaveProperty("id");
        expect(response.body[0].userService).toHaveProperty("title");
        expect(response.body[0].userService).toHaveProperty("description");
        expect(response.body[0].userService).toHaveProperty("status");
        expect(response.body[0].userService).toHaveProperty("femaleOnly");
        
        expect(response.body[0].userService.status).toEqual("aceito");

        expect(response.body[0].user).not.toHaveProperty("password");
        expect(response.body[0].user).toHaveProperty("id");
        expect(response.body[0].user).toHaveProperty("name");
        expect(response.body[0].user).toHaveProperty("email");
        expect(response.body[0].user).toHaveProperty("telephone");
        expect(response.body[0].user).toHaveProperty("isWorker");
        expect(response.body[0].user).toHaveProperty("isActive");
        
        expect(response.body[0].acceptedAt).not.toEqual(null);

        expect(response.status).toBe(200);
    });
    
    test("GET /worker-services - It should not be able to list services without authentication", async () => {
        const response = await request(app).get("/worker-services")
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });
    
    test("GET /worker-services - You shouldn't be able to list all services if you're not an administrator or owner", async () => {
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);

        const response = await request(app).get("/worker-services").set("Authorization", `Bearer ${loginUserResponse.body.token}`)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("GET /worker-services/:userId - Must be able to list a service", async () => {
        const loginWorkerResponse = await request(app).post("/login").send(mockedUserWorkerLogin);
        const services = await request(app).get("/users/services").set("Authorization", `Bearer ${loginWorkerResponse.body.token}`);
        
        const myService = await request(app).post(`/worker-services/${services.body[0].id}`).set("Authorization", `Bearer ${loginWorkerResponse.body.token}`);

        const response = await request(app).get(`/worker-services/${myService.body.id}`).set("Authorization", `Bearer ${loginWorkerResponse.body.token}`);
        
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("acceptedAt");
        expect(response.body[0]).toHaveProperty("user");
        expect(response.body[0]).toHaveProperty("userService");

        expect(response.body[0].userService).toHaveProperty("id");
        expect(response.body[0].userService).toHaveProperty("title");
        expect(response.body[0].userService).toHaveProperty("description");
        expect(response.body[0].userService).toHaveProperty("status");
        expect(response.body[0].userService).toHaveProperty("femaleOnly");
        
        expect(response.body[0].userService.status).toEqual("aceito");

        expect(response.body[0].user).not.toHaveProperty("password");
        expect(response.body[0].user).toHaveProperty("id");
        expect(response.body[0].user).toHaveProperty("name");
        expect(response.body[0].user).toHaveProperty("email");
        expect(response.body[0].user).toHaveProperty("telephone");
        expect(response.body[0].user).toHaveProperty("isWorker");
        expect(response.body[0].user).toHaveProperty("isActive");
        
        expect(response.body[0].acceptedAt).not.toEqual(null);

        expect(response.status).toBe(200);
    });

    test("GET /worker-services/:userId - Must not be able to list a service without authentication", async () => {
        const loginWorkerResponse = await request(app).post("/login").send(mockedUserWorkerLogin);
        const services = await request(app).get("/users/services").set("Authorization", `Bearer ${loginWorkerResponse.body.token}`);
        
        const myService = await request(app).post(`/worker-services/${services.body[0].id}`).set("Authorization", `Bearer ${loginWorkerResponse.body.token}`);

        const response = await request(app).get(`/worker-services/${myService.body.id}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });
});