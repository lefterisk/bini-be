import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";

import config from "./config";

import { BookInstance, BookInterface } from "./models/Book";
import { CountryInstance, CountryInterface } from "./models/Country";
import { CityInstance, CityInterface } from "./models/City";
import { LibraryInstance, LibraryInterface } from "./models/Library";
import { SubjectInstance, SubjectInterface } from "./models/Subject";

export interface DbConnection {
    sequelize: Sequelize.Sequelize;
    Book: Sequelize.Model<BookInstance, BookInterface>;
    City: Sequelize.Model<CityInstance, CityInterface>;
    Country: Sequelize.Model<CountryInstance, CountryInterface>;
    Library: Sequelize.Model<LibraryInstance, LibraryInterface>;
    Subject: Sequelize.Model<SubjectInstance, SubjectInterface>;
}

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: "mysql",
    logging: console.log,
    dialectOptions: {
        multipleStatements: true
    },
    operatorsAliases: false,
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
