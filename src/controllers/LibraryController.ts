import { Request, Response } from "express";

import db from "../db";

export default class LibrariesController {
    static async get(req: Request, res: Response) {
        try {
            const results = await db.Library.findAll({
                order: [["name", "ASC"]]
            });
            return res.json({libraries: results.map(result => result.name)});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }
}
