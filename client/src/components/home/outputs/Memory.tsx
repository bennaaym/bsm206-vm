import styles from "../../../assets/css/output.module.css";
import { useCode } from "../../../contexts/CodeContextProvider";
import Error from "./Error";

const Memory = () =>
{

    const {error} = useCode();

    return(
        <>
            <div className={styles.output}>
                {error && <Error message={error}/>}  
                {
                    !error &&
                    <div className="break-words">
                        memory
                    </div>
                
                }
            </div>
        </>
    )
}

export default Memory;