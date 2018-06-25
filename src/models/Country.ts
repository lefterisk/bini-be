import * as Sequelize from "sequelize";

export interface CountryInterface {
    id?: Number;
    name?: String;
}

export interface CountryInstance extends Sequelize.Instance<CountryInterface>, CountryInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define("Country", {
        name: {type: DataTypes.STRING(255), allowNull: true},
    }, {
        timestamps: false
    });
}
