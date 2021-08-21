import { useCode } from "../../../contexts/CodeContextProvider";
import Error from "./Error";
import styles from "../../../assets/css/output.module.css";

const Output = () =>
{

    const {machineCode,error} = useCode();

    return(
        <>
        <div className={styles.output}>
          {error && <Error message={error}/>}  
          {
            !error &&
            <div>
              {machineCode}
            </div>
          
          }
        </div>
        </>
    )
}

export default Output;