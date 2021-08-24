import { ReactNode, useState, createContext, useContext } from "react";
import axios from "axios";

export interface ICode
{
    code:string;
    error:string;
    machineCode:string,
    memory:string;
    registers:{[reg:string]:string};
    currentStep:number;
    totalSteps:number;
    isBuilding:boolean;

    setCode:React.Dispatch<React.SetStateAction<string>>;
    build:() => Promise<void>;
    nextStep:() => void;
    prevStep:() => void;
}

interface ISteps
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
    const [steps,setSteps] = useState<ISteps['steps']|null>(null);
    const [error,setError] = useState<ICode['error']>('');
    const [machineCode,setMachineCode] = useState<ICode['machineCode']>('');
    const [memory,setMemory] = useState<ICode['memory']>('');
    const [registers,setRegisters] = useState<ICode['registers']>({});
    const [currentStep,setCurrentStep] = useState<ICode['currentStep']>(1);
    const [totalSteps,setTotalSteps] = useState<ICode['totalSteps']>(0);
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
                setTotalSteps(data.steps.length);
                run(data.steps);
                console.log('run');
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

    const run = (steps:ISteps['steps']) =>
    {
        if(!steps) return;
        setMemory(steps[currentStep - 1].memory);
        setRegisters(steps[currentStep - 1].regs);
    }

    const nextStep = () =>
    {
        if(!totalSteps) return;
        setCurrentStep(current => ((current% totalSteps) + 1));
        run(steps);
    }

    const prevStep = () =>
    {
        if(!totalSteps) return;
        setCurrentStep(current => ((current > 1)? (current-1) : totalSteps));
        run(steps);
    }

    return(
        <CodeContext.Provider value={{
            code,
            error,
            machineCode,
            memory,
            registers,
            currentStep,
            totalSteps,
            isBuilding,
            setCode,
            build,
            prevStep,
            nextStep
        }}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeContextProvider;