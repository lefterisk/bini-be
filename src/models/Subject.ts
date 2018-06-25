import * as Sequelize from "sequelize";

export interface SubjectInterface {
    id?: Number;
    name?: String;
}

export interface SubjectInstance extends Sequelize.Instance<SubjectInterface>, SubjectInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define("Subject", {
        name: {type: DataTypes.STRING(255), allowNull: true},
    }, {
        timestamps: false
    });
}
