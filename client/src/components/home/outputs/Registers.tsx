import { useCode } from "../../../contexts/CodeContextProvider";
import styles from "../../../assets/css/output.module.css";
import Error from "./Error";

const Registers = () =>
{
    const {error,registers} = useCode();
    return(
        <>
            <div className={styles.output}>
                {error && <Error message={error}/>}  
                {
                    !error &&
                    <ul className="flex-grow flex flex-col space-y-1">
                        registers
                    </ul>
                
                }
            </div>
        </>
    )
}

export default Registers;