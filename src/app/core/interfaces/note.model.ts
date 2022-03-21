
export interface Note {
    uid: string,
    data: {
        title: string,
        body: string,
        date: number,
        state: boolean,
        dateOfCreation: number,
        noteid: number,
        color: object,
        colorid:string;
        file_id:string;
    }
}