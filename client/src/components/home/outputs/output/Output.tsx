import { useState } from "react";
import { useCode } from "../../../../contexts/CodeContextProvider";
import Error from "../Error";
import SpinAnimation from "./SpinAnimation";
import LabelButton from "../../../buttons/LabelButton";
import { useEffect } from "react";
import styles from "../../../../assets/css/output.module.css";

const Output = () =>
{

    const {machineCode,error,isBuilding} = useCode();

    const [output,setOutput] = useState('');
    const [base, setBase] = useState('hex');

    useEffect(()=>
    {
      setOutput(machineCode);
    },[machineCode]);

    const convertBase = () =>
    {
      let res = machineCode;

      if(!res) return ;

      if(base === 'hex')
      {
        res = machineCode.split(' ').map(opcode=>{
            return parseInt(opcode,2).toString(16).padStart(2,'0').toUpperCase();
        }).join(' ');

        setBase('bin');
        setOutput(res);
        return;
      }
      
      setBase('hex');
      setOutput(res);
    }

    return(
        <>
          {!isBuilding && error && <Error message={error}/>}  
          {
            !isBuilding && !error &&
            <>
              <LabelButton 
                styles={styles['hex-bin-btn']}
                label={base}
                onClickAction = {convertBase}
              >
              </LabelButton>

              <div className={styles['machine-code']}>
                <p>
                  {output}
                </p>
              </div>
            </>
          }
          {
            isBuilding && <SpinAnimation message="building"/>
          }
        </>
    )
}

export default Output;