import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps
{
    styles:string,
    icon:IconDefinition,
    onClickAction:()=>void
}
const IconButton: React.FC<IProps>= ({styles,icon,onClickAction}) => {

    return (
        <>
            <button 
                className={styles}
                onClick={onClickAction}
            >
                <FontAwesomeIcon icon={icon}/>
            </button>
        </>
    );
}
 
export default IconButton;