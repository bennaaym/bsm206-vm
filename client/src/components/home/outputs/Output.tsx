import { useState } from "react";
import { useCode } from "../../../contexts/CodeContextProvider";
import Error from "./Error";
import SpinAnimation from "./SpinAnimation";
import LabelButton from "../../buttons/LabelButton";
import { useEffect } from "react";

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
                styles="z-10 absolute bottom-8  hover:opacity-50 right-5 flex items-center justify-center text-dark-text-300 text-sm  uppercase bg-light-accent rounded-full p-2"
                label={base}
                onClickAction = {convertBase}
              >
              </LabelButton>

              <div className="p-2 h-full w-full absolute tracking-wide font-semibold  break-words overflow-y-auto ">
                {output}
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