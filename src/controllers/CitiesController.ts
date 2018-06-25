import { Request, Response } from "express";

import db from "../db";

export default class CitiesController {
    static async get(req: Request, res: Response) {
        try {
            const results = await db.City.findAll({
                order: [["name", "ASC"]]
            });
            return res.json({cities: results.map(result => result.name)});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }
}
