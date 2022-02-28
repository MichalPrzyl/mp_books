export interface IRow {
    id: number;
    title: string;
    author: string
    isSelected?: boolean;
}

export interface IData {
    id: number;
    title: string;
    author: string;
    publication_year: number;
    isSelected?: boolean;
}
