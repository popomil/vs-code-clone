import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../../interfaces";
interface IClickedFile{
    activeTabId:string|null,
    filename:string;
    fileContent:string|undefined;
    changeBg:boolean
}
interface IInitialState{
    openedFiles:IFile[];
    closeTerminial:boolean,
    clickedFile:IClickedFile;
    tabIdToRemove:string | null
}
const initialState:IInitialState = {
    openedFiles:[],
    closeTerminial:true,
    clickedFile:{
        activeTabId:null,
        filename:"",
        fileContent:"",
        changeBg:false
    },
    tabIdToRemove: null
}
const fileTreeSlice = createSlice({
    name:"fileTree",
    initialState,
    reducers:{
        setOpenedFilesAction:(state,action:PayloadAction<IFile[]>) => {
            state.openedFiles = action.payload

        },
        setClickedFilesAction:(state,action:PayloadAction<IClickedFile>) => {
            state.clickedFile = action.payload
            // state.clickedFile.filename = action.payload.filename
            // state.clickedFile.fileContent = action.payload.fileContent
        },
        setTabIdToRemoveAction:(state,action:PayloadAction<string|null>) => {
            state.tabIdToRemove = action.payload
        },
        setCloseTerminialAction:(state,action:PayloadAction<boolean>) => {
            state.closeTerminial = action.payload
        },

    }
})

export const {setOpenedFilesAction,setClickedFilesAction,setTabIdToRemoveAction,setCloseTerminialAction} = fileTreeSlice.actions
export default fileTreeSlice.reducer