import { useState } from "react"
import { FiMinus } from "react-icons/fi"
import { IoClose } from "react-icons/io5"
import { LiaSearchSolid } from "react-icons/lia"
import { PiCopyLight } from "react-icons/pi"
import ClickedRightTerminial from "./ClickedRightTerminial"


const HeaderVs = () => {
    const [showTerminial,setShowTerminial]=useState<boolean>(false)
   const [menuPosition,setMenuPosition]=useState<{x:number,y:number}>({x:0,y:0})
  
   
  return (
    <div className="flex justify-between items-center space-y-1 h-14 border-b-2">
        <div className="flex ml-2">
        <img src="/icons/vscode.svg" className="w-8 h-8 mr-3" />
        <ul className="flex items-center gap-4 cursor-pointer">
            <li>File</li>
            <li>Edit</li>
            <li>Selection</li>
            <li>View</li>
            <li>Go</li>
            <li>Run</li>
            <li onClick={(e) =>{
                 e.stopPropagation()
                setShowTerminial(prev => !prev)
                 console.log("ClicedTER",showTerminial);
                setMenuPosition({x:e.clientX,y:e.clientY})
                console.log("popop",{x:e.clientX,y:e.clientY});
                
            } }>Terminal</li>
            {showTerminial&&<ClickedRightTerminial menuPosition={menuPosition} setShowTerminial={setShowTerminial} />}
            <li>Help</li>
        </ul>
        </div>
        <div className="flex items-center bg-[#3E3E3E] border-white  border-[1px] h-8 rounded-md px-10 ">
            <span className="mr-3"><LiaSearchSolid size={26}/></span>
            <span>vscode-clone-project-code</span>
        </div>
        <div className="flex items-center justify-center mr-4 space-x-4">
            <FiMinus size={25}/>
            <PiCopyLight size={25} />
            <IoClose size={25}/>
        </div>
        
    </div>
  )
}

export default HeaderVs