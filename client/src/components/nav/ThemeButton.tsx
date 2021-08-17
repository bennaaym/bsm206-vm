import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faAdjust } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../contexts/ThemeContextProvider";

const ThemeButton= () => {

    const {isLight,toggleTheme} = useTheme();

    return (
        <>
            <button 
                className="text-2xl"
                onClick={toggleTheme}
            >
                <FontAwesomeIcon icon={isLight? faAdjust:faSun}/>
            </button>
        </>
    );
}
 
export default ThemeButton;