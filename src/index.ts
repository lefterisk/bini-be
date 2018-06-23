import * as http from "http";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";

import TapController from "./controllers/TapController";

const app: any = express();
app.use(cors({
    allowedHeaders: ["Content-Type"],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());
app.use(morgan("dev", {}));

app.post("/api/taps", TapController.post);

app.server = http.createServer(app);

app.server.listen(process.env.PORT || 3000, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;
