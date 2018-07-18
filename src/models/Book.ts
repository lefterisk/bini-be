import * as Sequelize from "sequelize";
import * as _ from "lodash";

export interface BookInterface {
    id?: Number;
    book_author?: String;
    book_title?: String;
    book_parallel_title?: String;
    book_sub_title?: String;
    book_publisher?: String;
    book_printer?: String;
    book_publication_country?: String;
    book_publication_city?: String;
    book_publication_year?: Number;
    book_publication_number?: Number;
    book_shape?: String;
    book_height?: Number;
    book_volumes?: Number;
    book_pages?: Number;
    book_pagination?: String;
    book_illustration?: String;
    book_publication_type?: String;
    book_bibliography?: String;
    book_subject?: String;
    included_book_author?: String;
    included_book_title?: String;
    series_title?: String;
    volume_number?: Number;
    magazine_title?: String;
    magazine_opuscule?: Number;
    magazine_volume?: Number;
    newspaper_title?: String;
    newspaper_volume?: Number;
    idological_classification?: String;
    cronological_classification?: String;
    thematical_classification?: String;
    tekmirio_language?: String;
    prototype?: String;
    original_language?: String;
    original_translated_language?: String;
    libraries?: String;
    url?: String;
    contributors?: String;
    funding?: String;
    copublished_book_author?: String;
    copublished_book_title?: String;
    other_publication?: String;
    other_publication_type?: String;
    republication_title?: String;
    republication_publisher?: String;
    republication_instructor?: String;
    republication_place?: String;
    republication_year?: Number;
    title_page_text?: String;
    kolofonas_text?: String;
    description?: String;
    prototype_author?: String;
    prototype_title?: String;
    prototype_parallel_title?: String;
    prototype_subtitle?: String;
    prototype_publisher?: String;
    prototype_printer?: String;
    prototype_publication_country?: String;
    prototype_publication_city?: String;
    prototype_publication_year?: Number;
    prototype_shape?: String;
    prototype_volumes?: Number;
    prototype_pages?: Number;
    prototype_pagination?: String;
    prototype_illustration?: String;
    prototype_publication_type?: String;
    prototype_original_prototype?: String;
    prototype_original_language?: String;
    translated_prototype_original_language?: String;
    prototype_description?: String;
    prototype_url?: String;
}

export interface BookInstance extends Sequelize.Instance<BookInterface>, BookInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    const Book: any = sequelize.define("Book", {
        book_author: {type: DataTypes.TEXT, allowNull: true},
        book_title: {type: DataTypes.STRING(255), allowNull: true},
        book_parallel_title: {type: DataTypes.STRING(255), allowNull: true},
        book_sub_title: {type: DataTypes.STRING(255), allowNull: true},
        book_publisher: {type: DataTypes.STRING(255), allowNull: true},
        book_printer: {type: DataTypes.STRING(255), allowNull: true},
        book_publication_country: {type: DataTypes.STRING(255), allowNull: true},
        book_publication_city: {type: DataTypes.STRING(255), allowNull: true},
        book_publication_year: {type: DataTypes.SMALLINT(6), allowNull: true},
        book_publication_number: {type: DataTypes.SMALLINT(6), allowNull: true},
        book_shape: {type: DataTypes.STRING(255), allowNull: true},
        book_height: {type: DataTypes.SMALLINT(6), allowNull: true},
        book_volumes: {type: DataTypes.SMALLINT(6), allowNull: true},
        book_pages: {type: DataTypes.SMALLINT(6), allowNull: true},
        book_pagination: {type: DataTypes.STRING(255), allowNull: true},
        book_illustration: {type: DataTypes.STRING(255), allowNull: true},
        book_publication_type: {type: DataTypes.STRING(255), allowNull: true},
        book_bibliography: {type: DataTypes.TEXT, allowNull: true},
        book_subject: {type: DataTypes.TEXT, allowNull: true},
        included_book_author: {type: DataTypes.STRING(255), allowNull: true},
        included_book_title: {type: DataTypes.STRING(255), allowNull: true},
        series_title: {type: DataTypes.STRING(255), allowNull: true},
        volume_number: {type: DataTypes.SMALLINT(6), allowNull: true},
        magazine_title: {type: DataTypes.STRING(255), allowNull: true},
        magazine_opuscule: {type: DataTypes.SMALLINT(6), allowNull: true},
        magazine_volume: {type: DataTypes.SMALLINT(6), allowNull: true},
        newspaper_title: {type: DataTypes.STRING(255), allowNull: true},
        newspaper_volume: {type: DataTypes.SMALLINT(6), allowNull: true},
        idological_classification: {type: DataTypes.STRING(255), allowNull: true},
        cronological_classification: {type: DataTypes.STRING(255), allowNull: true},
        thematical_classification: {type: DataTypes.TEXT, allowNull: true},
        tekmirio_language: {type: DataTypes.STRING(400), allowNull: true},
        prototype: {type: DataTypes.STRING(255), allowNull: true},
        original_language: {type: DataTypes.STRING(255), allowNull: true},
        original_translated_language: {type: DataTypes.STRING(255), allowNull: true},
        libraries: {type: DataTypes.TEXT, allowNull: true},
        url: {type: DataTypes.STRING(255), allowNull: true},
        contributors: {type: DataTypes.STRING(255), allowNull: true},
        funding: {type: DataTypes.STRING(255), allowNull: true},
        copublished_book_author: {type: DataTypes.STRING(255), allowNull: true},
        copublished_book_title: {type: DataTypes.STRING(255), allowNull: true},
        other_publication: {type: DataTypes.STRING(255), allowNull: true},
        other_publication_type: {type: DataTypes.STRING(255), allowNull: true},
        republication_title: {type: DataTypes.STRING(255), allowNull: true},
        republication_publisher: {type: DataTypes.STRING(255), allowNull: true},
        republication_instructor: {type: DataTypes.STRING(255), allowNull: true},
        republication_place: {type: DataTypes.STRING(255), allowNull: true},
        republication_year: {type: DataTypes.SMALLINT(6), allowNull: true},
        title_page_text: {type: DataTypes.TEXT, allowNull: true},
        kolofonas_text: {type: DataTypes.TEXT, allowNull: true},
        description: {type: DataTypes.TEXT, allowNull: true},
        prototype_author: {type: DataTypes.TEXT, allowNull: true},
        prototype_title: {type: DataTypes.STRING(255), allowNull: true},
        prototype_parallel_title: {type: DataTypes.STRING(255), allowNull: true},
        prototype_subtitle: {type: DataTypes.STRING(255), allowNull: true},
        prototype_publisher: {type: DataTypes.STRING(255), allowNull: true},
        prototype_printer: {type: DataTypes.STRING(255), allowNull: true},
        prototype_publication_country: {type: DataTypes.STRING(255), allowNull: true},
        prototype_publication_city: {type: DataTypes.STRING(255), allowNull: true},
        prototype_publication_year: {type: DataTypes.SMALLINT(6), allowNull: true},
        prototype_shape: {type: DataTypes.STRING(255), allowNull: true},
        prototype_volumes: {type: DataTypes.SMALLINT(6), allowNull: true},
        prototype_pages: {type: DataTypes.SMALLINT(6), allowNull: true},
        prototype_pagination: {type: DataTypes.STRING(255), allowNull: true},
        prototype_illustration: {type: DataTypes.STRING(255), allowNull: true},
        prototype_publication_type: {type: DataTypes.STRING(255), allowNull: true},
        prototype_original_prototype: {type: DataTypes.STRING(255), allowNull: true},
        prototype_original_language: {type: DataTypes.STRING(255), allowNull: true},
        translated_prototype_original_language: {type: DataTypes.STRING(255), allowNull: true},
        prototype_description: {type: DataTypes.TEXT, allowNull: true},
        prototype_url: {type: DataTypes.STRING(255), allowNull: true},
    }, {
        timestamps: false
    });

    Book.prototype.toShortJS = function () {
        const book = this.toJSON();
        book.book_author = _.filter(this.book_author.split("#"), item => Boolean(item));
        // book.book_subject = _.filter(this.book_subject.split("#"), item => Boolean(item));
        return book;
    };

    Book.prototype.toLongJS = function () {
        const book = this.toJSON();
        book.book_author = _.filter(this.book_author.split("#"), item => Boolean(item));
        book.book_subject = _.filter(this.book_subject.split("#"), item => Boolean(item));
        book.thematical_classification = _.filter(this.thematical_classification.split("#"), item => Boolean(item));
        book.tekmirio_language = _.filter(this.tekmirio_language.split("#"), item => Boolean(item));
        book.libraries = _.filter(this.libraries.split("#"), item => Boolean(item));
        book.contributors = _.filter(this.contributors.split("#"), item => Boolean(item)).map(item => {
            const parts: string[] = item.split("=");
            return `${parts[0]} (${parts[1]})`;
        });
        book.prototype_author = _.filter(this.prototype_author.split("#"), item => Boolean(item));
        book.url = _.filter(this.url.split(", "), item => Boolean(item));
        return book;
    };

    return Book;
}
