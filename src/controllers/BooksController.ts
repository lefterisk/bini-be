import { Request, Response, Router } from "express";
import * as _ from "lodash";

import { BookInstance } from "../models/Book";


import db from "../db";

export default class BooksController {
    static async post (req: Request, res: Response) {
        const itemsPerPage: number = req.body.itemsPerPage ? Number(req.body.itemsPerPage) : 20;
        const page: number = req.body.page ? Number(req.body.page) : 1;
        const offset: number = (page - 1) * itemsPerPage;
        try {
            const {rows, count} = await db.Book.findAndCountAll({
                where: {},
                limit: itemsPerPage,
                offset: offset
            });
            return res.json({ books: rows.map((book: any) => book.toShortJS()), count });
        } catch (err) {
            return res.status(500).json({err: err.message });
        }
    }

    static async get (req: Request, res: Response) {
        return res.json({ method: "get" });
    }
}
