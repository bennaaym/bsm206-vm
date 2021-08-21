import HighlightWithinTextarea from "./HighlightWithinTextarea"
import { useCode } from "../../../contexts/CodeContextProvider";

const Editor = () =>
{

    const {code,setCode} = useCode(); 

    return(
        <>
            <div className="h-full flex-grow flex flex-col ">
                <HighlightWithinTextarea code={code} setCode={setCode}/>
            </div>
        </>
    )
}

export default Editor;