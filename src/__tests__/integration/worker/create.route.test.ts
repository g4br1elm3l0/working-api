import request from "supertest";
import { DataSource, Repository } from "typeorm";
import dataSource from "../../../data-source";
import Workers from "../../../Entities/workers.entity";
import app from "../../../app";

describe("Create worker route tests", () => {
    let conn: DataSource;
    const baseUrl: string = "/workers";
    const workerRepo: Repository<Workers> = dataSource.getRepository(Workers);

    beforeAll(async () => {
       await dataSource.initialize()
            .then( res => conn = res ) 
            .catch( err => console.log(err) );
    });

    beforeEach(async () => {
        const workers = await workerRepo.find();
        await workerRepo.remove(workers);
    });

    afterAll(async () => {
        await conn.destroy();
    });

    it("Should be able to create worker",async () => {
        const response = await request(app).post(baseUrl).send()
    })
});