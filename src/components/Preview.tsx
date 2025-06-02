import FileSyntaxHighlighter from './FileSyntaxHighlighter'
import { RootState } from '../app/store'
import { useSelector } from 'react-redux'
import OpenedFileBar from './OpenedFileBar'

const Preview = () => {
    const {clickedFile} = useSelector((state:RootState) => state.fileTree)
  return (
    <>
        <OpenedFileBar/>
         <FileSyntaxHighlighter content={clickedFile.fileContent}/>
    </>
  )
}

export default Preview