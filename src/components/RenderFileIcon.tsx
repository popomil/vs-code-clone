import { extentsionIconPath } from "../constant";
import IconImage from "./IconImage"
import FileIcon from "./SVG/File"


interface IProps{
    filename:string
    isFolder?:boolean;
    isOpen?:boolean
}
const RenderFileIcon = ({filename,isOpen,isFolder}:IProps) => {
    const fileExtension = filename.split('.').pop()
    // console.log("PPPPP",fileExtension);
    
    if(fileExtension && Object.prototype.hasOwnProperty.call(extentsionIconPath,fileExtension)){
        const iconPath = isFolder?isOpen?`${extentsionIconPath[fileExtension]}-open.svg`:`${extentsionIconPath[fileExtension]}.svg`:`${extentsionIconPath[fileExtension]}.svg`
        return <IconImage src={iconPath}/>
    }
//     if(fileExtension === "tsx") return <IconImage src="/icons/react_ts.svg" />
//     if(fileExtension === "jsx") return <IconImage src="/icons/react.svg" />
//     if(fileExtension === "js") return <IconImage src="/icons/react.svg" />
//     if(fileExtension === "html") return <IconImage src="/icons/html.svg" />
//     //folders
//     if(fileExtension === "node_modules" && isFolder) return isOpen? (
//     <IconImage src="/icons/folder-node-open.svg" />
// ):(
// <IconImage src="/icons/folder-node.svg" />
// )
// if(fileExtension === "public" && isFolder) return isOpen? (
//     <IconImage src="/icons/folder-public-open.svg" />
// ):(
// <IconImage src="/icons/folder-public.svg" />
// )
// if(fileExtension === "src" && isFolder) return isOpen? (
//     <IconImage src="/icons/folder-src-open.svg" />
// ):(
// <IconImage src="/icons/folder-src.svg" />
// )
// if(fileExtension === "components" && isFolder) return isOpen? (
//     <IconImage src="/icons/folder-components-open.svg" />
// ):(
// <IconImage src="/icons/folder-components.svg" />
// )
if(isFolder && isOpen) return <IconImage src="/icons/folder-default-open.svg" />
if(isFolder && !isOpen) return <IconImage src="/icons/folder-default.svg" />
return <FileIcon/>
}

export default RenderFileIcon