import { ReactNode, useState, createContext, useContext } from "react";
import axios from "axios";
import { useEffect } from "react";

export interface ICode
{
    code:string;
    error:string;
    machineCode:string,
    memory:string;
    registers:{[reg:string]:string};
    currentStepIndex:number,
    totalSteps:number;
    isBuilding:boolean;

    setCode:React.Dispatch<React.SetStateAction<string>>;
    build:() => Promise<void>;
    nextStep:() => void;
    prevStep:() => void;
}

interface ITypes
{
    data:{steps:{regs:{[reg:string]:string},memory:string}[],machineCode:string}
    step:{index:number, data:{regs:{[reg:string]:string},memory:string}}
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
    const [data,setData] = useState<ITypes['data']|null>(null);
    const [currentStep,setCurrentStep] = useState<ITypes['step']|null>(null);
    const [error,setError] = useState<ICode['error']>('');
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
                const {data:{data:resData,error:resError}} = await axios.post(API_ENDPOINT,{assemblyCode:code});
                setIsBuilding(false);
                setError(resError);
                if(!resData ) return;
                setData(resData);
                setTotalSteps(resData.steps.length);
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

    const run = (step:ITypes['step']) => setCurrentStep(step);


    useEffect(() => {
        if(data)
        {
            run({index:1, data:data.steps[0]});
        }
    }, [data]);



 

    const nextStep = () =>
    {
       if(!data || !currentStep) return;
       const nextIndex = (currentStep.index % totalSteps) + 1;
       run({
           index:nextIndex,
           data:data.steps[nextIndex - 1]
       })
       
    }

    const prevStep = () =>
    {
        if(!data || !currentStep) return;
        const prevIndex = (currentStep.index > 1)? (currentStep.index - 1) : totalSteps;
        run({
            index:prevIndex,
            data:data.steps[prevIndex - 1]
        })
    }

    return(
        <CodeContext.Provider value={{
            code,
            error,
            machineCode:data?.machineCode||'',
            memory:currentStep?.data.memory||'',
            registers:currentStep?.data.regs||{},
            currentStepIndex:currentStep?.index||0,
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