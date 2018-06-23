import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";

import config from "./config";

import { FareInstance, FareInterface } from "./models/Fare";
import { RouteInstance, RouteInterface } from "./models/Route";
import { StageInstance, StageInterface } from "./models/Stage";
import { StopInstance, StopInterface } from "./models/Stop";
import { StageStopInstance, StageStopInterface } from "./models/StageStop";
import { RouteStageInstance, RouteStageInterface } from "./models/RouteStage";
import { BalanceInstance, BalanceInterface } from "./models/Balance";
import { JourneyInstance, JourneyInterface } from "./models/Journey";
import { TapInstance, TapInterface } from "./models/Tap";
import { ValidityInstance, ValidityInterface } from "./models/Validity";
import { ZoneInstance, ZoneInterface } from "./models/Zone";

export interface DbConnection {
    sequelize: Sequelize.Sequelize;
    Fare: Sequelize.Model<FareInstance, FareInterface>;
    Route: Sequelize.Model<RouteInstance, RouteInterface>;
    Stage: Sequelize.Model<StageInstance, StageInterface>;
    Stop: Sequelize.Model<StopInstance, StopInterface>;
    StageStop: Sequelize.Model<StageStopInstance, StageStopInterface>;
    RouteStage: Sequelize.Model<RouteStageInstance, RouteStageInterface>;
    Balance: Sequelize.Model<BalanceInstance, BalanceInterface>;
    Journey: Sequelize.Model<JourneyInstance, JourneyInterface>;
    Tap: Sequelize.Model<TapInstance, TapInterface>;
    Validity: Sequelize.Model<ValidityInstance, ValidityInterface>;
    Zone: Sequelize.Model<ZoneInstance, ZoneInterface>;
}

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: "mysql",
    dialectOptions: {
        multipleStatements: true
    },
    operatorsAliases: false,
    logging: false
});

sequelize.authenticate().then(() => {
    console.log("Successfully connected to DB");
    // sequelize.sync();
}, err => {
    console.log("Could not connect to DB", err);
});

const db: any = {};

fs
    .readdirSync(path.join(__dirname , "models"))
    .filter(function(file) {
        return file.indexOf(".") !== 0 && (file.slice(-3) === ".ts" || file.slice(-3) === ".js");
    })
    .forEach(function(file) {
        const model: any = sequelize["import"](path.join(__dirname , "models", file));
        // NOTE: you have to change from the original property notation to
        // index notation or tsc will complain about undefined property.
        db[model["name"]] = model;
    });

Object.keys(db).forEach(function(modelName: string) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db["sequelize"] = sequelize;

export default <DbConnection>db;
