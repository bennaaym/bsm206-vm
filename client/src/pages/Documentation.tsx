import { Route, Switch } from "react-router-dom";
import AdrModes from "../components/documentation/AdrModes";
import Architecture from "../components/documentation/Architecture";
import AsmLanguage from "../components/documentation/AsmLanguage";
import InstructionSet from "../components/documentation/InstructionSet";
import { useTheme } from "../contexts/ThemeContextProvider";
import styles from "../assets/css/documentation.module.css";
const Documentation = () =>
{
    const {isLight} = useTheme()
    return(
        <>
            <div className={`${styles['documentation']} ${isLight?'text-light-text-300 ':'text-dark-text-300 bg-dark-background-300'} `}>
                <div className={styles['documentation-wrapper']}>
                  <Switch>
                    <Route path='/documentation/architecture' component={Architecture}/>
                    <Route path='/documentation/addressing-modes' component={AdrModes}/>
                    <Route path='/documentation/instruction-set' component={InstructionSet}/>
                    <Route path='/documentation/assembly-language' component={AsmLanguage}/>
                  </Switch>
                </div>
            </div>
        </>
    )
}

export default Documentation;