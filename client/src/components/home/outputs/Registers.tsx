import { useCode } from "../../../contexts/CodeContextProvider";
import styles from "../../../assets/css/output.module.css";
import Error from "./Error";
import { useTheme } from "../../../contexts/ThemeContextProvider";

const Registers = () =>
{
    const {error,registers} = useCode();
    const {isLight} = useTheme();

    return(
        <>
            <div className={styles.output}>
                {error && <Error message={error}/>}  
                {
                    !error &&
                    <ul className={styles.registers}>
                        {
                            Object.keys(registers).map(key=>
                                {
                                    return(
                                        <li 
                                        className={`${styles.register} ${isLight? 'bg-light-background-200':'bg-dark-background-100'}`}
                                        key={key}>
                                            <span className="font-semibold">{key}</span>
                                            <span className="font-medium">0x{registers[key]}</span>
                                        </li>
                                    )
                                })
                        }
                    </ul>
                
                }
            </div>
        </>
    )
}

export default Registers;