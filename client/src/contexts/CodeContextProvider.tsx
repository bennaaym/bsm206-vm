import { ReactNode, useState,createContext, useContext } from "react";

export interface ICode
{
    code:string,
    setCode:React.Dispatch<React.SetStateAction<string>>,
}

const CodeContext = createContext<ICode|null>(null);

export const useCode = ():ICode =>
{
    const context = useContext(CodeContext);
    if(context) return context;
    throw new Error('CodeContext is null');
}


const CodeContextProvider:React.FC<ReactNode> = ({children}) =>
{

    const [code,setCode] = useState('')

    return(
        <CodeContext.Provider value={{
            code,
            setCode
        }}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeContextProvider;