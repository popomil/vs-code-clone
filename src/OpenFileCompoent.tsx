
import { RootState } from "./app/store";
import RenderFileIcon from "./components/RenderFileIcon";
import RightArrowIcon from "./components/SVG/Right";
import { useState } from "react";
import CloseIcon from "./components/SVG/CloseIcon";
import { useDispatch, useSelector } from "react-redux";
import { setClickedFilesAction, setOpenedFilesAction } from "./app/features/fileTreeSlice";

const OpenFileComponent = () => {
    const { openedFiles} = useSelector((state: RootState) => state.fileTree);
    const [openFile, setOpenFile] = useState<boolean>(true);
    const dispatch = useDispatch()
      const onRemove = (id:string) => {
    const filtered = openedFiles.filter((file) => file.id !== id)
    const lastTab = filtered[filtered.length - 1]
    if(!lastTab){
      dispatch(setOpenedFilesAction([]))
      dispatch(setClickedFilesAction({activeTabId:null,fileContent:"",filename:"",changeBg:false}))
      return;
    }
    console.log("LastTab",lastTab);
    
    dispatch(setOpenedFilesAction(filtered))
    dispatch(setClickedFilesAction({activeTabId:lastTab.id,fileContent:lastTab.content,filename:lastTab.name,changeBg:true}))
  }
    return (
        <div className="flex flex-col gap-2 w-full">
            <button 
                className="font-semibold flex items-center gap-1 hover:text-gray-600" 
                onClick={() => setOpenFile(prev => !prev)}
            >
                <RightArrowIcon className={`transition-transform ${openFile ? 'rotate-90' : ''}`} />
                OPEN EDITORS
            </button>
            
            {openFile && (
                <>
                    {openedFiles.map((file) => (
                        <div 
                            key={file.id} 
                            className="flex items-center gap-1 pl-4 py-1 rounded hover:bg-gray-100/40 transition-colors cursor-pointer"
                        >
                          <span onClick={(e) => {
          e.stopPropagation()
          onRemove(file.id)
        }
                          }>
                            <CloseIcon/>
                          </span>
                            <RenderFileIcon filename={file.name} />
                            <span className="text-sm">{file.name}</span>
                        </div>
                    ))}
                    <hr className="border" />
                </>
            )}
        </div>
    );
};

export default OpenFileComponent;