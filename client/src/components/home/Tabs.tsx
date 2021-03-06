import { useState } from "react"
import Memory from "./outputs/memory/Memory";
import Output from "./outputs/output/Output";
import Registers from "./outputs/Registers";
import styles from "../../assets/css/home.module.css";
import { useTheme } from "../../contexts/ThemeContextProvider";
import LabelButton from "../buttons/LabelButton";
import IconButton from "../buttons/IconButton";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Editor from "./editor/Editor";
import { useCode } from "../../contexts/CodeContextProvider";
import Steps from "./outputs/Steps";


interface IProps
{
    tabs:string[]
}

const Tabs:React.FC<IProps> = ({tabs}) =>
{

    const {build} = useCode();
    const {isLight} = useTheme();
    const [activeTabIndex,setActiveTabIndex] = useState(0);
    const updateActiveTabIndex = (index:number) => setActiveTabIndex(index);

    return(
        <>
            <nav className={`${styles.tab} ${isLight?styles['tab-light'] :styles['tab-dark']}`}>
                <ul className={styles['tab-items']}>
                    {
                        tabs.map((tab,index)=>{
                            return(
                                <LabelButton 
                                    key={index}
                                    styles={`label-btn ${(index === activeTabIndex)? styles['tab-btn-active']:styles['tab-btn-passive']} ${!isLight?'text-dark-text-300':''}`} 
                                    label={tab}  
                                    onClickAction={() => updateActiveTabIndex(index)}
                                />
                            )
                        })
                    }     
                    {!['input','output'].includes(tabs[activeTabIndex]) && <Steps/>}
                </ul>
            </nav>
            
            <div className={`${styles['tab-content']} border-l ${isLight?'text-light-text-300 bg-light-background-300 border-light-background-200':'text-dark-text-300 bg-dark-background-300 border-dark-background-400'}`}>
                {tabs[activeTabIndex] === 'input'     && <Editor/>}
                {tabs[activeTabIndex] === 'output'    && <Output/>}
                {tabs[activeTabIndex] === 'registers' && <Registers/>}
                {tabs[activeTabIndex] === 'memory'    && <Memory/>}
            </div>
            

            {
                activeTabIndex === 0 && tabs[activeTabIndex] === 'input' &&


                <div className="absolute z-30 right-5 bottom-8">
                    <div className="space-x-2 text-2xl">
                        <IconButton styles={`label-btn ${styles['tab-btn-active']} rounded-full `} icon={faPlay} onClickAction={build}/>
                    </div>
                </div>
            }
        </>
    )
}

export default Tabs;