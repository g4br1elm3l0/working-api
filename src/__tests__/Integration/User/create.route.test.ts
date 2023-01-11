import request from "supertest";
import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import app from "../../../app";
import { mockedUser, mockedUserLogin, mockedUserWorker } from "../../Mocks/Integration/user.mock";

describe("/users", () => {
    let connection: DataSource;

    beforeAll(async () => {
       await dataSource.initialize()
            .then( res => connection = res ) 
            .catch( err => console.log(err) );
    });

    afterAll(async () => {
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
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        
        expect(response.body.name).toEqual("leonardo");
        expect(response.body.email).toEqual("leonardo@mail.com");
        expect(response.body.birthday).toEqual("02/10/98");
        expect(response.body.gender).toEqual("masculino");
        expect(response.body.profileImg).toEqual("profileleo");
        expect(response.body.telephone).toEqual("67999956325");
        expect(response.body.isActive).toEqual(true);
        expect(response.body.isWorker).toEqual(true);

        expect(response.status).toBe(201);
    });

    test("POST /users - should not be able to create a user that already exists", async () => {
        const response = await request(app).post("/users").send(mockedUser);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    });

    test("GET /users - Must be able to list users", async () => {
        await request(app).post("/users").send(mockedUserWorker);        
        const userWorkerLoginResponse = await request(app).post("/login").send(mockedUserWorker);
        const response = await request(app).get("/users").set("Authorization", `Bearer ${userWorkerLoginResponse.body.token}`);

        expect(response.body).toHaveLength(2);
        expect(response.body)[0].not.toHaveProperty("password");
    });

    
});