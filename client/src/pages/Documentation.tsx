import AdrModes from "../components/documentation/AdrModes";
import Architecture from "../components/documentation/Architecture";
import AsmLanguage from "../components/documentation/AsmLanguage";
import { useTheme } from "../contexts/ThemeContextProvider";

const Documentation = () =>
{
    const {isLight} = useTheme()
    return(
        <>
            <div className={`flex  w-full items-center justify-center py-12 ${isLight?'text-light-text-300 ':'text-dark-text-300 bg-dark-background-300'} `}>
                <div className="w-8/12 space-y-16">
                    <Architecture/>  
                    <AdrModes/>
                    <AsmLanguage/>
                </div>
            </div>
        </>
    )
}

export default Documentation;