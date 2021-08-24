import React, { useRef } from "react";
import { ICode, useCode } from "../../../contexts/CodeContextProvider";
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
    const {currentStepIndex} = useCode();

    const highlightsRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaIndexRef = useRef(0);
    const lineCounterRef = useRef<HTMLDivElement|null>(null);

    const handleCodeChange = (event:React.ChangeEvent<HTMLTextAreaElement>) =>
    {
       const upperCaseCode = event.target.value.toUpperCase();
       if(textareaIndexRef && textareaRef.current) 
       {
           textareaIndexRef.current = textareaRef.current.selectionStart;
       }
       setCode(upperCaseCode);        
    }

    useEffect(()=>
    {
        if(highlightsRef.current) highlightsRef.current.innerHTML = highLightCode(code.toUpperCase(),isLight,(code?currentStepIndex:-1));
        if(textareaRef.current)
        {
            textareaRef.current.selectionStart = textareaIndexRef.current;
            textareaRef.current.selectionEnd = textareaIndexRef.current;
        }
        
    },[code,isLight,currentStepIndex])
    
    const handleScroll =() =>
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
                className={`${styles.codearea}  bg-transparent text-transparent ${isLight? 'light-caret-color':'dark-caret-color'}`}
                value={code}
                onChange={handleCodeChange}
                onScroll={handleScroll}
            ></textarea>

            <div
                ref={highlightsRef}
                className={`${styles.highlights} bg-transparent`}
            ></div>
        </div>
    );
}
 
export default HighlightWithinTextarea;