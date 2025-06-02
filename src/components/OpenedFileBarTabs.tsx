
import { useDispatch, useSelector } from 'react-redux'
import { IFile } from '../interfaces'
import RenderFileIcon from './RenderFileIcon'
import CloseIcon from './SVG/CloseIcon'
import { setClickedFilesAction, setOpenedFilesAction, setTabIdToRemoveAction } from '../app/features/fileTreeSlice'
import { RootState } from '../app/store'
interface IProps{
    file:IFile
}
const OpenedFileBartabs = ({file}:IProps) => {
  const dispatch = useDispatch()
      const {openedFiles,clickedFile:{activeTabId,changeBg}} = useSelector((state:RootState) => state.fileTree)
  //Handlers
  const onClick = () => {
    const {id,name,content} = file
    dispatch(setClickedFilesAction({filename:name,fileContent:content,activeTabId:id,changeBg:true}))
  }
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
<div className={`border-[1px] border-[#ffffff1f] ${file.id === activeTabId&& changeBg && "bg-[#ffffff1f]"}`}>
      <div className={`flex items-center p-[2px] border-t-[4px]  ${file.id === activeTabId? "border-[#007ACC]":"border-transparent"}`}
       onClick={onClick} 
        onContextMenu={ e => {
          e.preventDefault();
          dispatch(setTabIdToRemoveAction(file.id))
        }
        }>
            <RenderFileIcon filename={file.name}/>
        <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md">{file.name}</span>
        <span className="cursor-pointer hover:bg-[#64646475] duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md"
        onClick={(e) => {
          e.stopPropagation()
          onRemove(file.id)
        }}
        ><CloseIcon/></span>
    </div>

</div>
  )
}

export default OpenedFileBartabs