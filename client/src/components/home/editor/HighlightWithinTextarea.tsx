import React, { useRef } from "react";
import { ICode } from "../../../contexts/CodeContextProvider";
import styles from "../../../assets/css/editor.module.css";
import { highLightCode } from "../../../assembly/asm";
import { useTheme } from "../../../contexts/ThemeContextProvider";

export interface IProps 
{
    code:ICode['code'],
    setCode:ICode['setCode']    
}
 
const HighlightWithinTextarea: React.FC<IProps> = ({code,setCode}) => {
    

    const {isLight} = useTheme();

    const highlightsRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleCodeChange = (event:React.ChangeEvent<HTMLTextAreaElement>) =>
    {
       const upperCaseCode = event.target.value.toUpperCase();
       setCode(upperCaseCode);
       if(highlightsRef.current) highlightsRef.current.innerHTML = highLightCode(upperCaseCode,isLight);
        
    }


    const handleScroll =(event : React.UIEvent<HTMLTextAreaElement, UIEvent>) =>
    {
        if(textareaRef.current && highlightsRef.current)
        {
            highlightsRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    }
 

    return (
        <div className={styles['textarea-wrapper']}> 
            <textarea
                ref={textareaRef}
                className={`${styles.codearea}  overflow-y-auto bg-transparent text-transparent ${isLight? 'light-caret-color':'dark-caret-color'}`}
                value={code}
                onChange={handleCodeChange}
                onScroll={handleScroll}
            ></textarea>

            <div
                ref={highlightsRef}
                className={`${styles.highlights} overflow-y-auto bg-transparent-keyword `}
            ></div>
        </div>
    );
}
 
export default HighlightWithinTextarea;