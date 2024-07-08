export type NoteModel = {
    id: string;
    title: string;
    content: string;
    category: string;
    created: Date;
};

export type NoteResultModel = {
    count: number;
    next: string;
    previous: string;
    results: NoteModel[];
};

export type CategoryModel = {
    id: number;
    name: string;
    slug: string;
    user: number,
    created: Date;
    updated: Date;
};

export type CategoryResultModel = {
    count: number;
    next: string;
    previous: string;
    results: CategoryModel[];
};