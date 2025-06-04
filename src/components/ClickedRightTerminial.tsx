import { useDispatch } from "react-redux";
import { setCloseTerminialAction } from "../app/features/fileTreeSlice";
import { useEffect, useRef } from "react";

    interface IProps{
        setShowTerminial:(val:boolean) => void;
        menuPosition:{
            x:number;
            y:number
        }
    }
const ClickedRightTerminial = ({menuPosition,setShowTerminial}:IProps) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleCliced = (event:MouseEvent) => {
            if (ref.current  && !ref.current.contains(event?.target as Node)) {
                setShowTerminial(false)
            }
        }
        window.addEventListener("click",handleCliced)
        return () => {
            window.removeEventListener("click",handleCliced)
        }
    },[setShowTerminial])
const dispatch = useDispatch()
  return (
    <div ref={ref} >
        <ul className="bg-[#4E4E4E] font-semibold text-white p-5 cursor-pointer rounded-md"  style={{
        position:"absolute",
        left: menuPosition.x,
        top: menuPosition.y
    }}>
            <li onClick={() => {dispatch(setCloseTerminialAction(true))}}>New Terminial</li>
            <li>Split Terminial</li>
            <li>Run Task...</li>
            <li>Run Build Task...</li>
            <li>Run Active File</li>
        </ul>
    </div>
  )
}

export default ClickedRightTerminial