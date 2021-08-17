import { IMenu } from "./Nav";
import { Link } from "react-router-dom";
import styles from "../../assets/css/nav.module.css";
import {useTheme} from "../../contexts/ThemeContextProvider";
import IconButton from "../buttons/IconButton";
import { faAdjust, faSun } from "@fortawesome/free-solid-svg-icons";

interface IProps
{
    items:IMenu['items'],
    active:boolean,
    toggle:() => void
}

const SideBar:React.FC<IProps> = ({items,active,toggle}) => {

    const {isLight,toggleTheme} = useTheme();

    return (
        <>
            {active && <div className={styles['side-bar-overlay']} onClick={toggle}></div>}
            <div className={`${styles['side-bar']} ${active? 'translate-x-0':' -translate-x-full'} ${isLight? styles['side-bar-light']:styles['side-bar-dark'] }`}>
                <div className="flex items-center justify-between mx-2 my-3">
                    <h1 className={`${styles.logo} ${styles['side-bar-logo']}`}>
                        bsm206 vm 
                    </h1>
                    {
                        active && 
                        <IconButton styles={'icon-btn'} icon={isLight?faAdjust:faSun} onClickAction={toggleTheme} />
                    }
                </div>
                <ul className={styles['side-bar-menu']}>
                    {
                        items.map(item=>{
                            return(
                                <li key={item.label}>
                                    <Link to={item.path}>
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    );
}
 
export default SideBar;