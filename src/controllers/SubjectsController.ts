import { Request, Response } from "express";

import db from "../db";

export default class SubjectsController {
    static async get(req: Request, res: Response) {
        try {
            const results = await db.Subject.findAll({
                order: [["name", "ASC"]]
            });
            return res.json({subjects: results.map(result => result.name)});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }
}
