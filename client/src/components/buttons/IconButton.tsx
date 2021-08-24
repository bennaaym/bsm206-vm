import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps
{
    styles:string;
    icon:IconDefinition;
    onClickAction:()=>void;
    onMouseOverAction?:()=>void;
    onMouseOutAction?:()=>void;
}
const IconButton: React.FC<IProps>= ({
                                styles,
                                icon,
                                onClickAction,
                                onMouseOverAction,
                                onMouseOutAction
                            }) => {

    return (
        <>
            <button 
                className={styles}
                onClick={onClickAction}
                onMouseOver={onMouseOverAction}
                onMouseOut={onMouseOutAction}
            >
                <FontAwesomeIcon icon={icon}/>
            </button>
        </>
    );
}
 
export default IconButton;