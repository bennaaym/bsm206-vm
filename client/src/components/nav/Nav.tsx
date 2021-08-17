import { useState } from 'react';
import { faAdjust, faBars, faSun } from '@fortawesome/free-solid-svg-icons';
import styles from '../../assets/css/nav.module.css';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { useTheme } from '../../contexts/ThemeContextProvider';
import IconButton from '../buttons/IconButton';

export interface IMenu 
{
    items:{label:string,path:string}[]
}

const items:IMenu['items'] = [
    {label:'home',path:'/'},
    {label:'documentation',path:'/documentation'},
]

const Nav = () =>
{

    const {isLight,toggleTheme} = useTheme();
    const [sideBarState,setSideBarState] = useState(false);
    const toggleSideBarMenu = () => setSideBarState((currentState) => !currentState);

    return(
        <>  
            <nav className={`${styles.nav} ${isLight? styles['nav-light']:styles['nav-dark']} `}>
                <h1 className={styles.logo}>
                    bsm206 vm
                </h1>

                <IconButton styles={styles['mobile-menu-bar']} icon={faBars} onClickAction={toggleSideBarMenu} />


                <ul className={styles['desktop-menu']}>
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

                    <IconButton styles={'icon-btn'} icon={isLight?faAdjust:faSun} onClickAction={toggleTheme} />
                </ul>
            </nav>

            <SideBar items={items} active={sideBarState} toggle={toggleSideBarMenu}/>
        </>
    )
}


export default Nav;