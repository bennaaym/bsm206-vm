import { useCode } from "../../../contexts/CodeContextProvider";
import Error from "./Error";
import styles from "../../../assets/css/output.module.css";
import SpinAnimation from "./SpinAnimation";

const Output = () =>
{

    const {machineCode,error,isBuilding} = useCode();

    return(
        <>
        <div className={styles.output}>
          {!isBuilding && error && <Error message={error}/>}  
          {
            !isBuilding && !error &&
            <div>
              {machineCode}
            </div>
          
          }
          {
            isBuilding && <SpinAnimation message="building"/>
          }
        </div>
        </>
    )
}

export default Output;