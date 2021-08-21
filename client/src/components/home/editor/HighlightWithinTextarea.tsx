import React, { useRef } from "react";
import { ICode } from "../../../contexts/CodeContextProvider";
import styles from "../../../assets/css/editor.module.css";
import { highLightCode } from "../../../assembly/asm";
import { useTheme } from "../../../contexts/ThemeContextProvider";
import { useEffect } from "react";
import LineCounter from "./LineCounter";

export interface IProps 
{
    code:ICode['code'],
    setCode:ICode['setCode']    
}
 
const HighlightWithinTextarea: React.FC<IProps> = ({code,setCode}) => {
    

    const {isLight} = useTheme();

    const highlightsRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineCounterRef = useRef<HTMLDivElement|null>(null);

    const handleCodeChange = (event:React.ChangeEvent<HTMLTextAreaElement>) =>
    {
       const upperCaseCode = event.target.value.toUpperCase();
       setCode(upperCaseCode);        
    }

    useEffect(()=>
    {
        if(highlightsRef.current) highlightsRef.current.innerHTML = highLightCode(code.toUpperCase(),isLight);
    },[code,isLight])


    const handleScroll =(event : React.UIEvent<HTMLTextAreaElement, UIEvent>) =>
    {
        if(textareaRef.current && highlightsRef.current && lineCounterRef.current)
        {
            highlightsRef.current.scrollTop = textareaRef.current.scrollTop;
            lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    }
 

    return (
        
        <div className={styles['textarea-wrapper']}>

            <LineCounter code={code} reference={lineCounterRef}/>
            
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