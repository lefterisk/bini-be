import { Request, Response } from "express";

import db from "../db";

export default class CountriesController {
    static async get(req: Request, res: Response) {
        try {
            const results = await db.Country.findAll({
                order: [["name", "ASC"]]
            });
            return res.json({countries: results.map(result => result.name)});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }
}
