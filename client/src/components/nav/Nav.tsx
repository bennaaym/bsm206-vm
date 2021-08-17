import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from '../../assets/css/nav.module.css';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { useTheme } from '../../contexts/ThemeContextProvider';
import ThemeButton from './ThemeButton';

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

    const {isLight} = useTheme();
    

    const [sideBarState,setSideBarState] = useState(false);
    const toggleSideBarMenu = () => setSideBarState((currentState) => !currentState);

    return(
        <>  
            <nav className={`${styles.nav} ${isLight? styles['nav-light']:styles['nav-dark']} `}>
                <h1 className={styles.logo}>
                    bsm206 vm
                </h1>

                <button 
                    className ={styles['mobile-menu-bar']}
                    onClick={toggleSideBarMenu}
                >
                    <FontAwesomeIcon icon={faBars}/>
                </button>

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

                    <ThemeButton/>
                </ul>
            </nav>

            <SideBar items={items} active={sideBarState} toggle={toggleSideBarMenu}/>
        </>
    )
}


export default Nav;