export interface Note {
    noteId: string;
    userId: string;
    title: string;
    content: string | null;
    createdDate: string;
    updatedDate: string;
}
