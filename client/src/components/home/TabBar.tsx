import { useState } from "react"
import CodeEditor from "./CodeEditor";
import Memory from "./Memory";
import Output from "./Output";
import Registers from "./Registers";
import styles from "../../assets/css/home.module.css";
import { useTheme } from "../../contexts/ThemeContextProvider";
import LabelButton from "../buttons/LabelButton";

const tabs = [
    'input',
    'output',
    'registers',
    'memory'
]

const TabBar = () =>
{

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
                </ul>
            </nav>

            <div className="flex-grow bg-light-background-300">
                {activeTabIndex === 0 && <CodeEditor/>}
                {activeTabIndex === 1 && <Output/>}
                {activeTabIndex === 2 && <Registers/>}
                {activeTabIndex === 3 && <Memory/>}
            </div>
        </>
    )
}

export default TabBar;