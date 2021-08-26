import { useEffect } from "react";
import { useState, createContext, useContext, ReactNode } from "react";

interface ITheme
{
    isLight:boolean,
    toggleTheme:() => void;
}

const ThemeContext = createContext<ITheme|null>(null);

export const useTheme = (): ITheme => 
{
    const context = useContext(ThemeContext);
    if(context) return context;
    throw new Error('ThemeContext is null');
}


const ThemeContextProvider:React.FC<ReactNode> = ({children}) =>
{

    const [isLight,setIsLight] = useState(true);
    const toggleTheme = () => setIsLight((current) => !current);

    useEffect(()=>{
        const saveTheme = localStorage.getItem('bsm206-vm-theme');
        setIsLight((saveTheme === 'dark')?false:true);
    },[])

    useEffect(()=>{  
        localStorage.setItem('bsm206-vm-theme',isLight?'light':'dark')   
    },[isLight])

    return(
        <ThemeContext.Provider value={{
            isLight,
            toggleTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}


export default ThemeContextProvider;
