import { useSelector } from "react-redux"
import { RootState } from "../app/store"
import OpenedFileBartabs from "./OpenedFileBarTabs"
import RunAndDebugIcon from "./ui/RunAndDebugIcon"
import { useState } from "react"
import ContextMenu from "./ui/ContextMenu"



const OpenedFileBar = () => {
    const [showMenu,setShowMenu] = useState(false)
    const [menuPosition,setMenuPosition]=useState<{x:number,y:number}>({x:0,y:0})
    const {openedFiles} = useSelector((state:RootState) => state.fileTree)
  return (
    <div >
    <div className="flex justify-between border-b-[1px] border-[#ffffff1f] ">
      <div className="flex"
        onContextMenu={e => {
        e.preventDefault();
        console.log(e.clientX,e.clientY);
        setMenuPosition({x:e.clientX,y:e.clientY})
        setShowMenu(prev => !prev)
        console.log("Mouse",e)

      }}>
      {
        openedFiles.map((file) => <OpenedFileBartabs key={file.id} file={file} />)
      }
      </div>
      <div className="mr-3 m-auto">
        <RunAndDebugIcon/>
      </div>
          {showMenu && <ContextMenu position={menuPosition} setShowMenu={setShowMenu}/>}
    </div>
   
    </div>
  )
}

export default OpenedFileBar