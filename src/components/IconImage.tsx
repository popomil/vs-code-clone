interface IProps{
src:string
}
const IconImage = ({src}:IProps) => {
  return <img src={src}  className="w-5 h-5"/>
}

export default IconImage