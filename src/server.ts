import app from "./app";
import AppDataSource from "./data-source";

(async () => {

    await AppDataSource.initialize().then(() => { console.log("Database connected!"); })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        });

    app.listen(3000, () => {
        console.log("Server is running in PORT: https://localhost:3000")
    })
})()