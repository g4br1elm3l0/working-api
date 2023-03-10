import request from "supertest";
import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import app from "../../../app";
import { mockedUser, mockedUserAdm, mockedUserAdmLogin, mockedUserAdmWorker, mockedUserAdmWorkerLogin, mockedUserLogin, mockedUserWorker, mockedUserWorkerLogin, mokedUserUpdate } from "../../Mocks/Integration/user.mock";

describe("/users", () => {
    let connection: DataSource;

    beforeAll( async () => {
       await dataSource.initialize()
            .then( res => connection = res ) 
            .catch( err => console.log(err) );
    });

    afterAll( async () => {
        await connection.destroy();
    });

    test("POST /users - Must be able to create user", async () => {
        const response = await request(app).post("/users").send(mockedUser);
        
        expect(response.body).toHaveProperty("id");;
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("gender");
        expect(response.body).toHaveProperty("birthday");
        expect(response.body).toHaveProperty("profileImg");
        expect(response.body).toHaveProperty("telephone");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("isWorker");
        expect(response.body).toHaveProperty("isAdm");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        
        expect(response.body.name).toEqual("leonardo");
        expect(response.body.email).toEqual("leonardo@mail.com");
        expect(response.body.birthday).toEqual("02/07/01");
        expect(response.body.gender).toEqual("masculino");
        expect(response.body.profileImg).toEqual("profileleo");
        expect(response.body.telephone).toEqual("67999956325");
        expect(response.body.isActive).toEqual(true);
        expect(response.body.isWorker).toEqual(false);
        expect(response.body.isAdm).toEqual(false);

        expect(response.status).toBe(201);
    });

    test("POST /users - Should not be able to create a user that already exists", async () => {
        const response = await request(app).post("/users").send(mockedUser);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    });
    
    test("GET /users - Must be able to list users", async () => {
        await request(app).post("/users").send(mockedUserAdm);
        const loginResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        
        const response = await request(app).get("/users").set("Authorization", `Bearer ${loginResponse.body.token}`);

        expect(response.body).toHaveLength(2);
        expect(response.body[0]).not.toHaveProperty("password");
    });

    test("GET /users - Should not be able to list users if not admin.", async () => {
        const loginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${loginResponse.body.token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("GET /users - Should not be able to list user without authetication", async () => {
        const response = await request(app).get("/users");

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("GET /users/workers - Must be able to list workers", async () => {
        await request(app).post("/users").send(mockedUserWorker);
        const loginResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const response = await request(app).get("/users/workers").set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).not.toHaveProperty("password");
    });

    test("GET /users/workers - Should not be able to list workers if not admin.", async () => {
        await request(app).post("/users").send(mockedUser);
        const loginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get("/users/workers").set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("GET /users/workers - Should not be able to list workers without authetication", async () => {
        const response = await request(app).get("/users/workers");

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("PATCH /users/:userId - It must be possible to update a user", async () => {
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        
        const response = await request(app).patch(`/users/${findUser.body[0].id}`).send(mokedUserUpdate).set("Authorization", `Bearer ${loginUserResponse.body.token}`);
        
        expect(response.body).toHaveProperty("id");;
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("gender");
        expect(response.body).toHaveProperty("birthday");
        expect(response.body).toHaveProperty("profileImg");
        expect(response.body).toHaveProperty("telephone");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("isWorker");
        expect(response.body).toHaveProperty("isAdm");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        
        expect(response.body.name).toEqual("leonardo atualizado");
        expect(response.body.email).toEqual("leonardoatualizado@mail.com");
        expect(response.body.birthday).toEqual("02/07/01");
        expect(response.body.gender).toEqual("masculino");
        expect(response.body.profileImg).toEqual("profileleo");
        expect(response.body.telephone).toEqual("67999956325");
        expect(response.body.isActive).toEqual(true);
        expect(response.body.isWorker).toEqual(false);
        expect(response.body.isAdm).toEqual(false);

        expect(response.status).toBe(200);
    });

    test("PATCH /users/:userId - It should not be possible to update a user without authentication", async () => {
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const response = await request(app).patch(`/users/${findUser.body[0].id}`).send(mokedUserUpdate);
        
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    });

    test("PATCH /users/:userId - should not be able to update id field value", async () => {
        const newValues = { id: "1" };
        
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        
        const response = await request(app).patch(`/users/${findUser.body[0].id}`).send(newValues).set("Authorization", `Bearer ${loginUserResponse.body.token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    });

    test("PATCH /users/:userId - should not be able to update birthday field value", async () => {
        const newValues = { birthday: "15/06/04" };
        
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        
        const response = await request(app).patch(`/users/${findUser.body[0].id}`).send(newValues).set("Authorization", `Bearer ${loginUserResponse.body.token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    });

    test("PATCH /users/:userId - should not be able to update birthday field value", async () => {
        const newValues = { birthday: "15/06/04" };
        
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        
        const response = await request(app).patch(`/users/${findUser.body[0].id}`).send(newValues).set("Authorization", `Bearer ${loginUserResponse.body.token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    });

    test("PATCH /users/:userId - should not be able to update isWorker field value", async () => {
        const newValues = { isWorker: true };
        
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        
        const response = await request(app).patch(`/users/${findUser.body[0].id}`).send(newValues).set("Authorization", `Bearer ${loginUserResponse.body.token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    });

    test("PATCH /users/:userId - should not be able to update isAdm field value", async () => {
        const newValues = { isAdm: true };
        
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        
        const response = await request(app).patch(`/users/${findUser.body[0].id}`).send(newValues).set("Authorization", `Bearer ${loginUserResponse.body.token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    });

    test("PATCH /users/:userId - should not be able to update isActive field value", async () => {
        const newValues = { isActive: false };
        
        const loginAdmResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginAdmResponse.body.token}`);
        
        const loginUserResponse = await request(app).post("/login").send(mockedUserLogin);
        
        const response = await request(app).patch(`/users/${findUser.body[0].id}`).send(newValues).set("Authorization", `Bearer ${loginUserResponse.body.token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    });
    
    test("DELETE /users/:userId - Must be able to soft delete user", async () => {
        const loginResponse = await request(app).post("/login").send(mockedUserAdm);
        const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        expect(response.status).toBe(204);
    });

    test("DELETE /users/:userId - Should not be able to delete user without authentication", async () => {
       const loginResponse = await request(app).post("/login").send(mockedUserAdmLogin);
       const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${loginResponse.body.token}`);
       
       const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`);
        
       expect(response.body).toHaveProperty("message");
       expect(response.status).toBe(401);
    });

    test("DELETE /users/:userId - Should not be able to delete user not being admin", async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        
        await request(app).post("/users").send(mockedUser);
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        
        const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("DELETE /users/:userId - Should not be able to delete user with invalid id", async () => {
        await request(app).post("/users").send(mockedUserAdmWorker);
        const loginResponse = await request(app).post("/login").send(mockedUserAdmWorker);    
        
        const response = await request(app).delete("/users/13970660-5dbe-423a-9a9d-5c23b37943cf").set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });
});