
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
        //nové
        colorid:string;
        file_id:string;
    }
}