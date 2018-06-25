import * as Sequelize from "sequelize";

export interface CityInterface {
    id?: Number;
    name?: String;
}

export interface CityInstance extends Sequelize.Instance<CityInterface>, CityInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define("City", {
        name: {type: DataTypes.STRING(255), allowNull: true},
    }, {
        timestamps: false
    });
}
