import { useState } from "react"
import { BsPlusLg } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

const Terminal = () => {
        const [activeIndex, setActiveIndex] = useState<number | null>(null);
        const liItems = [
        "OUTPUT",
        "DEBUG CONSOLE",
        "TERMINAL",
        "PORTS"
    ];

    //Handles
       const handleClick = (index: number) => {
        setActiveIndex(index); // Set the clicked li's index as active
    };
  return (
    <div>
                <ul className="font-semibold flex justify-between  mt-2 ml-2 cursor-pointer">
                    <div className="flex gap-3">
            <div className="flex justify-center items-center gap-2">
                <li>PROBLEMS</li>
                <span className="rounded-full h-6 w-6 bg-blue-500 text-center text-white">3</span>
            </div>
            {liItems.map((item, index) => (
                <li
                    key={index} // Important for React list rendering
                    className={`
                        ${activeIndex === index ? 'border-b-2 border-blue-500' : ''}
                    `}
                    onClick={() => handleClick(index)}
                >
                    {item}
                </li>
            ))}
            </div>
<div className="flex items-center space-x-2 mr-6">
<BsPlusLg />
<MdKeyboardArrowDown />
<HiOutlineDotsHorizontal />
<IoClose />
</div>
        </ul>
    <div className="p-2 text-[#CCCCCC] h-full overflow-auto mt-[40px]">
        <span className="text-[#569CD6]">DELL@DESKTOP-VIK8LMD</span>
        <span className="text-[#4EC9B0]"> MINGW64 </span>
        <span className="text-[#DCDCAA]">~/vscode-clone-project (main)</span>
        <div className="flex items-center">
          <span className="text-[#D16969]">$ </span>
          <span className="ml-1 animate-pulse">|</span>
        </div>
      </div>
    </div>
  )
}

export default Terminal