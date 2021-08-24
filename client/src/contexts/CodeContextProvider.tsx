import { ReactNode, useState,createContext, useContext } from "react";
import axios from "axios";

export interface ICode
{
    code:string;
    error:string;
    machineCode:string,
    memory:string;
    registers:{[reg:string]:string};
    isBuilding:boolean;

    setCode:React.Dispatch<React.SetStateAction<string>>;
    build:() => Promise<void>;
    run:() => void;
}

interface ISypes
{
    steps:{regs:{[reg:string]:string},memory:string}[]|null;
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
    const [registers,setRegisters] = useState<ICode['registers']>({});
    const [isBuilding,setIsBuilding] = useState(false);


    const build = async () =>
    {
        if(!code) return ;

        setIsBuilding(true);

        try
        {
            if(API_ENDPOINT)
            {
                const {data:{data,error}} = await axios.post(API_ENDPOINT,{assemblyCode:code});
                setError(error);
                setIsBuilding(false);
                if(!data ) return;
                setMachineCode(data.machineCode);
                setSteps(data.steps);
            }                    
        }
        catch(error)
        {
            setIsBuilding(false);
            
            const err = error.toString().toLowerCase();
            let message = err;
            if(err.includes('network error'))
                message = 'Could not connect to server. Please check your internet connexion and try again'
            
            alert(message);
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
            isBuilding,
            setCode,
            build,
            run
        }}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeContextProvider;