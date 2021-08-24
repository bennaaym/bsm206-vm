import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { useCode } from "../../contexts/CodeContextProvider";
import { useTheme } from "../../contexts/ThemeContextProvider";
import IconButton from "../buttons/IconButton"

const Steps = () => {

    const {isLight} = useTheme();
    const {prevStep,nextStep} = useCode(); 

    return (
        <>
            <div className={`ml-2 flex flex-col items-center justify-center  space-y-2 ${isLight?'text-light-accent':'text-dark-text-300'}`}>
                <IconButton
                        styles={'transform -rotate-90 text-xs sm:text-sm hover:opacity-50 flex justify-center'}
                        icon={faPlay}
                        onClickAction={nextStep}
                />
                <IconButton
                    styles={'transform rotate-90 text-xs sm:text-sm hover:opacity-50 flex justify-center'}
                    icon={faPlay}
                    onClickAction={prevStep}
                />
            </div>
        </>
    );
}
 
export default Steps;