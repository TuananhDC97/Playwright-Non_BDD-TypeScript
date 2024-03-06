export interface BookModel {
    isbn: string,
    title: string,
    subTitle: string,
    author:	string,
    publish_date: string,
    publisher: string,
    pages: number,
    description: string,
    website: string
}

export interface CollectionOfIsbn {
    isbn: string
}

export interface AddListOfBookModel {
    userId: string,
    collectionOfIsbns: CollectionOfIsbn[]
}
