import { ReactNode, useState,createContext, useContext } from "react";
import axios from "axios";

export interface ICode
{
    code:string;
    error:string;
    machineCode:string,
    memory:string;
    registers:{[reg:string]:string}[];
    
    setCode:React.Dispatch<React.SetStateAction<string>>;
    build:() => Promise<void>;
    run:() => void;
}

interface ISypes
{
    steps:{regs:{[reg:string]:string}[],memory:string}[]|null;
}


const CodeContext = createContext<ICode|null>(null);

export const useCode = ():ICode =>
{
    const context = useContext(CodeContext);
    if(context) return context;
    throw new Error('CodeContext is null');
}



const API_ENDPOINT = process.env.REACT_APP_API_URL;


const CodeContextProvider:React.FC<ReactNode> = ({children}) =>
{

    const [code,setCode] = useState('');
    const [steps,setSteps] = useState<ISypes['steps']|null>(null);
    const [error,setError] = useState<ICode['error']>('');
    const [machineCode,setMachineCode] = useState<ICode['machineCode']>('');
    const [memory,setMemory] = useState<ICode['memory']>('');
    const [registers,setRegisters] = useState<ICode['registers']>([]);


    const build = async () =>
    {
        if(!code) return ;

        try
        {
            if(API_ENDPOINT)
            {
                const {data:{data,error}} = await axios.post(API_ENDPOINT,{assemblyCode:`${code}\nHLT`});
                setError(error);
                setMachineCode(data.machineCode);
                setSteps(data.steps);
            }                    
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const run = () =>
    {
        if(!steps) return;
        setMemory(steps[steps.length - 1].memory);
        setRegisters(steps[steps.length - 1].regs)
    }

    return(
        <CodeContext.Provider value={{
            code,
            error,
            machineCode,
            memory,
            registers,
            setCode,
            build,
            run
        }}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeContextProvider;