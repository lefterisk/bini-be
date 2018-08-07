import { Request, Response } from "express";

import { BookInstance } from "../models/Book";

import { FilterTypes, allFields } from "../constants";

import db from "../db";

interface FilterInstance {
    type: string;
    values: string[];
}

export default class BooksController {
    static async post(req: Request, res: Response) {
        const {itemsPerPage = 20, page = 1, filters = []}: { itemsPerPage: number, page: number, filters: FilterInstance[] } = req.body;
        const offset: number = (page - 1) * itemsPerPage;
        const where: any = {
            [db.sequelize.Op.and]: []
        };

        filters.map(filter => {
            const array: any[] = [];
            switch (filter.type) {
                case FilterTypes.ALL:
                    filter.values.map(value => {
                        allFields.filter(field => field !== "libraries").map(field => {
                            array.push({
                                [field]: {
                                    [db.sequelize.Op.like]: `%${value}%`
                                }
                            });
                        });
                    });
                    break;
                case FilterTypes.AUTHOR:
                    filter.values.map(value => {
                        array.push({
                            book_author: {
                                [db.sequelize.Op.like]: `%${value}%`
                            }
                        });
                    });
                    break;
                case FilterTypes.LANGUAGE:
                    filter.values.map(value => {
                        array.push({
                            tekmirio_language: {
                                [db.sequelize.Op.like]: `%${value}%`
                            }
                        });
                    });
                    break;
                case FilterTypes.THEMATICAL_CLASSIFICATION:
                    filter.values.map(value => {
                        array.push({
                            thematical_classification: {
                                [db.sequelize.Op.like]: `%${value}%`
                            }
                        });
                    });
                    break;
                case FilterTypes.IDOLOGICAL_CLASSIFICATION:
                    filter.values.map(value => {
                        array.push({
                            idological_classification: {
                                [db.sequelize.Op.like]: `%${value}%`
                            }
                        });
                    });
                    break;
                case FilterTypes.CHRONOLOGICAL_CLASSIFICATION:
                    filter.values.map(value => {
                        array.push({
                            cronological_classification: value
                        });
                    });
                    break;
                case FilterTypes.COUNTRY_OF_PUBLICATION:
                    filter.values.map(value => {
                        array.push({
                            book_publication_country: value
                        });
                    });
                    break;
                case FilterTypes.CITY_OF_PUBLICATION:
                    filter.values.map(value => {
                        array.push({
                            book_publication_city: value
                        });
                    });
                    break;
                case FilterTypes.PUBLICATION_TYPE:
                    filter.values.map(value => {
                        array.push({
                            book_publication_type: value
                        });
                    });
                    break;
                case FilterTypes.PUBLISHER:
                    filter.values.map(value => {
                        array.push({
                            [db.sequelize.Op.or]: [
                                {
                                    book_publisher: {
                                        [db.sequelize.Op.like]: `%${value}%`
                                    }
                                },
                                {
                                    book_printer: {
                                        [db.sequelize.Op.like]: `%${value}%`
                                    }
                                },
                            ]

                        });
                    });
                    break;
                case FilterTypes.SUBJECT:
                    filter.values.map(value => {
                        array.push({
                            book_subject: value
                        });
                    });
                    break;
                case FilterTypes.TITLE:
                    filter.values.map(value => {
                        array.push({
                            [db.sequelize.Op.or]: [
                                {
                                    book_title: {
                                        [db.sequelize.Op.like]: `%${value}%`
                                    }
                                },
                                {
                                    book_parallel_title: {
                                        [db.sequelize.Op.like]: `%${value}%`
                                    }
                                },
                                {
                                    book_sub_title: {
                                        [db.sequelize.Op.like]: `%${value}%`
                                    }
                                },
                            ]

                        });
                    });
                    break;
                case FilterTypes.YEAR_OF_PUBLICATION:
                    filter.values.map(value => {
                        const dates = value.split("-");

                        if (dates[0] && dates[1]) {
                            if (dates[0] <= dates[1]) {
                                array.push({
                                    book_publication_year: {
                                        [db.sequelize.Op.between]: [Number(dates[0]), Number(dates[1])]
                                    }
                                });
                            } else if (dates[0] > dates[1]) {
                                array.push({
                                    book_publication_year: {
                                        [db.sequelize.Op.or]: {
                                            [db.sequelize.Op.gte]: Number(dates[0]),
                                            [db.sequelize.Op.lte]: Number(dates[1])
                                        }
                                    }
                                });
                            }
                        }

                        if (dates[0] && !dates[1]) {
                            array.push({
                                book_publication_year: {
                                    [db.sequelize.Op.gte]: Number(dates[0])
                                }
                            });
                        }

                        if (!dates[0] && dates[1]) {
                            array.push({
                                book_publication_year: {
                                    [db.sequelize.Op.lte]: Number(dates[1])
                                }
                            });
                        }
                    });
                    break;
            }
            where[db.sequelize.Op.and].push({
                [db.sequelize.Op.or]: array
            });
        });

        try {
            const {rows, count}: {rows: BookInstance[], count: number} = await db.Book.findAndCountAll({
                attributes: [
                    "id",
                    "book_author",
                    "book_title",
                    "book_publication_year",
                    "book_publication_country",
                    "book_publication_city",
                    "book_pages"
                ],
                where,
                limit: itemsPerPage,
                offset: offset,
                order: [["book_publication_year", "ASC"]]
            });
            return res.json({books: rows.map((book: any) => book.toShortJS()), count});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }

    static async get(req: Request, res: Response) {
        try {
            const book: any = await db.Book.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!book) {
                return res.status(404).json({err: "BOOK_DOESNT_EXIST"});
            }
            return res.json({book: book.toLongJS()});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }
}
