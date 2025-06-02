export interface IFile{
    id:string;
    name:string;
    isFolder:boolean;
    content?:string;
    children?:IFile[];
}