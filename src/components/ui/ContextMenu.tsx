import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setOpenedFilesAction } from "../../app/features/fileTreeSlice";
import { RootState } from "../../app/store";

interface IProps {
    setShowMenu:(val:boolean)=> void;
    position: {
        x: number;
        y: number;
    } 
}

const DropMenu = ({ position,setShowMenu }: IProps) => {
    const menuRef = useRef<HTMLDivElement>(null)
    const { openedFiles, tabIdToRemove } = useSelector((state: RootState) => state.fileTree);
    useEffect(() => {
        const handleClickedOutSide = (event:MouseEvent) => {
            console.log("Cliced");
            if(menuRef.current && !menuRef.current.contains(event?.target as Node)){
                setShowMenu(false)
            }
            
        }
        window.addEventListener("click",handleClickedOutSide)
        return () => {
            window.removeEventListener("click",handleClickedOutSide)
        }
    },[setShowMenu])
    //Handlers
    const dispatch =useDispatch()
    const onRemoveAllTabs = () => {
            dispatch(setOpenedFilesAction([]))
            setShowMenu(false)
    }
  const onClose = () => {
    const filtered = openedFiles.filter(file => file.id !== tabIdToRemove);
    dispatch(setOpenedFilesAction(filtered));
    setShowMenu(false);
  };
    return ( 
        <div ref={menuRef}>
            <ul className="bg-[#4E4E4E] text-white font-semibold w-fit px-7 py-2 rounded-md"
                style={{
                    position: "absolute",
                    left: position.x,
                    top: position.y
                }}>
                <li className="hover:bg-[#0E639C] px-2 py-1 rounded -mx-2"
                onClick={onClose}
                >Close</li>
                <li className="hover:bg-[#0E639C] px-2 py-1 rounded -mx-2">Close Others</li>
                <li className="hover:bg-[#0E639C] px-2 py-1 rounded -mx-2">Close to the right</li>
                <li onClick={onRemoveAllTabs} className="hover:bg-[#0E639C] px-2 py-1 rounded -mx-2">Close All</li>
                 <hr className="border-t-2 border-gray-500 my-1 w-full" />
            </ul>
        </div>
    )
}

export default DropMenu