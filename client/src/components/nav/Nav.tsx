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

const documentation:IMenu['items']=[
    {label:'architecutre',path:'/documentation/architecture'},
    {label:'addressing',path:'/documentation/addressing-modes'},
    {label:'instructions',path:'/documentation/instruction-set'},
    {label:'assembly',path:'/documentation/assembly-language'},
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
                    <li>
                        <Link to='/'>home</Link>
                    </li>
                    <ul className={styles.dropdown}>
                        <li>
                            documentation
                        </li>
                        <div className={`${styles['dropdown-content']} ${isLight?'bg-light-background-100 text-light-text-300':'bg-dark-background-100 text-dark-text-300'}`}>
                        {
                            documentation.map(item=>{
                                return(
                                    <li key={item.label}>
                                       <Link to={item.path}>
                                           {item.label}
                                       </Link>
                                    </li>
                                )
                            })
                        }
                        </div>
                    </ul>
                    <IconButton styles={'icon-btn'} icon={isLight?faAdjust:faSun} onClickAction={toggleTheme} />
                </ul>
            </nav>

            <SideBar items={[{label:'home',path:''},...documentation]}
                    active={sideBarState} 
                    toggle={toggleSideBarMenu}
            />
        </>
    )
}


export default Nav;