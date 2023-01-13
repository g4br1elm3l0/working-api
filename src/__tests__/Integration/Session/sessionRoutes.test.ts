import { DataSource } from "typeorm";
import dataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedUserAdm, mockedUserAdmLogin } from "../../Mocks/Integration/user.mock";

describe("/login", () => {
    let connection: DataSource;

    beforeAll( async () => {
        await dataSource.initialize()
            .then( res => connection = res )
            .catch( err => console.log( err ) );

        await request(app).post("/users").send(mockedUserAdm);
    });

    afterAll( async () => {
        await connection.destroy();
    });

    test("POST /login - Should be able to login with the user", async () => {
        const response = await request(app).post("/login").send(mockedUserAdmLogin);

        expect(response.body).toHaveProperty("token");
        expect(response.status).toBe(200);
    });

    test("POST /login - Should not be able to login with the user with incorrect password or email", async () => {
        const response = await request(app).post("/login").set({
            email: "leonardo@mail.com",
            password: "125leo"
        });

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("POST /login - Should not be able to login with the user with isActive = false", async () => {
        const loginResponse = await request(app).post("/login").send(mockedUserAdmLogin);
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${loginResponse.body.token}`);
        
        await request(app).delete(`/users/${findUser.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`);
        const response = await request(app).post("/login").send(mockedUserAdmLogin);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });
});