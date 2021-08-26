import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import { useCode } from "../../../contexts/CodeContextProvider";
import { useTheme } from "../../../contexts/ThemeContextProvider";
import IconButton from "../../buttons/IconButton";
import styles from "../../../assets/css/output.module.css";

const Steps = () => {

    const {isLight} = useTheme();
    const {currentStepIndex,totalSteps,prevStep,nextStep} = useCode(); 
    const [toolTip,setToolTip] = useState(false);

    const toggleToolTip = () => setToolTip(current => !current);


    return (
        <>
            <div className={`${styles.steps} ${isLight?'text-light-accent':'text-dark-text-300'}`}>
                <IconButton
                        styles={`${styles['step-btn']} transform -rotate-90`}
                        icon={faPlay}
                        onClickAction={nextStep}
                        onMouseOverAction={toggleToolTip}
                        onMouseOutAction={toggleToolTip}

                />
                <IconButton
                    styles={`${styles['step-btn']} transform rotate-90`}
                    icon={faPlay}
                    onClickAction={prevStep}
                    onMouseOverAction={toggleToolTip}
                    onMouseOutAction={toggleToolTip}

                />
                <div className={`${toolTip? styles['steps-tooltip']: 'hidden'} `}>
                    <span>steps</span>
                    <span>{`${currentStepIndex}/${totalSteps}`}</span>
                </div>
            </div>
        </>
    );
}
 
export default Steps;