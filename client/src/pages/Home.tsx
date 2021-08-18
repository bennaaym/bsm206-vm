import { faStepForward, faSync } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../components/buttons/IconButton";
import CodeEditor from "../components/home/CodeEditor";
import Tabs from "../components/home/Tabs";
import { useTheme } from "../contexts/ThemeContextProvider";
import styles from "../assets/css/home.module.css";

const Home = () =>
{
    const {isLight} = useTheme();

    return(
        <>
            <div className={styles['flex-col-grow']}>
                
                {/*mobile version*/}
                <div className={`${styles['flex-col-grow']} ${styles['mobile-tab']}`}>
                    <Tabs tabs={['input','output','registers','memory']}/>
                </div>

                {/*desktop version*/}
                <div className={styles['desktop-tab']}>
                    <div className={`${styles['flex-col-1']} border-r-2 ${isLight?'border-light-background-200':'border-dark-background-400'}`}>
                        <div className={`${styles['input-bar']} ${isLight?'bg-light-background-200':'bg-dark-background-200'}`}>
                            <div 
                                className={`py-5 px-5 font-medium tracking-wider ${isLight?'text-light-text-300 bg-light-background-300':'text-dark-text-300 bg-dark-background-300'}`}
                            >
                                input
                            </div>
                            <div className="space-x-2">
                                <IconButton 
                                    styles={`label-btn rounded-full hover:bg-opacity-75 ${styles['tab-btn-active']} ${!isLight?'text-dark-text-300':''}`}
                                    icon={faSync} 
                                    onClickAction={()=>{}}
                                /> 
                                <IconButton 
                                    styles={`label-btn rounded-full hover:bg-opacity-75 ${styles['tab-btn-active']} ${!isLight?'text-dark-text-300':''}`}
                                    icon={faStepForward} 
                                    onClickAction={()=>{}}
                                /> 
                            </div>
                        </div>
                        <div className={`flex-grow ${isLight?'text-light-text-300 bg-light-background-300':'text-dark-text-300 bg-dark-background-300'}`}>
                            <CodeEditor/>
                        </div>
                    </div>
                    <div className={styles['flex-col-1']}>
                        <Tabs tabs={['output','registers','memory']}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;