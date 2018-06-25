import * as http from "http";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";

import BooksController from "./controllers/BooksController";
import CountriesController from "./controllers/CountriesController";
import CitiesController from "./controllers/CitiesController";
import LibrariesController from "./controllers/LibraryController";
import SubjectsController from "./controllers/SubjectsController";

const app: any = express();
app.use(cors({
    allowedHeaders: ["Content-Type"],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());
app.use(morgan("dev", {}));

app.post("/api/books", BooksController.post);
app.get("/api/books", BooksController.get);
app.get("/api/countries", CountriesController.get);
app.get("/api/cities", CitiesController.get);
app.get("/api/libraries", LibrariesController.get);
app.get("/api/subjects", SubjectsController.get);

app.server = http.createServer(app);

app.server.listen(process.env.PORT || 3000, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;
