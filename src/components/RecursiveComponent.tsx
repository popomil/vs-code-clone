import { useState } from "react";
import { IFile } from "../interfaces";
import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { setClickedFilesAction, setOpenedFilesAction } from "../app/features/fileTreeSlice"; 
import { RootState } from "../app/store";
import { doesFileObjectExist } from "../utils/functions";
interface IProps{
    fileTree:IFile;
}
const RecursiveComponent= ({fileTree}:IProps) => {
  const {id,isFolder,name,children,content} = fileTree
  const [isOpen,setIsOpen] = useState<boolean>(true)
  const toggle = () => {
    setIsOpen(prev => !prev)
  }
  const {openedFiles,clickedFile} = useSelector((state:RootState) => state.fileTree)
  const dispatch = useDispatch()
  //handlers 
  const onFileClicked = () => {
    const exists = doesFileObjectExist(openedFiles,id)
    dispatch(setClickedFilesAction({filename:name,fileContent:content,activeTabId:id,changeBg:true}))
    console.log("Bg",clickedFile.changeBg);
    
    if(exists) return;
    dispatch(setOpenedFilesAction([...openedFiles,fileTree]))
  }
  return (
    <div className="mb-2 ml-2 cursor-pointer">
<div className="flex items-center mb-1">
      
         {isFolder?(
          <div onClick={toggle} className="flex items-center">
          {isOpen? <BottomArrowIcon/>:<RightArrowIcon/>}
          <RenderFileIcon isFolder={isFolder} isOpen={isOpen} filename={name}/>
          <span>{name}</span>
          </div>
         ):(
          <div onClick={onFileClicked} className="flex items-center mr-2">
            <RenderFileIcon filename={name}/>
            <span className="ml-2">{name}</span>
          </div>
         )}
</div>
    {isOpen&&children && children.map((file) => (
          <>
          <RecursiveComponent fileTree={file}   key={file.id}/>
          </>
        ))
      }
    </div>
  );
};

export default RecursiveComponent;