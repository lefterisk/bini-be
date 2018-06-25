import * as Sequelize from "sequelize";

export interface LibraryInterface {
    id?: Number;
    name?: String;
}

export interface LibraryInstance extends Sequelize.Instance<LibraryInterface>, LibraryInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define("Library", {
        name: {type: DataTypes.STRING(255), allowNull: true},
    }, {
        timestamps: false
    });
}
