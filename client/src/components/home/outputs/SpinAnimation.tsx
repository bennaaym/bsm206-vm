import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export interface IProps 
{
    message:string  
}
 
const SpinAnimation: React.FC<IProps> = ({message}) => {
    return (
        <>
            <div className="flex-grow flex justify-center items-center">
                    <span className="animate-spin text-xl mr-4">
                        <FontAwesomeIcon icon={faSync}/>
                    </span>
                    <div className="text-xl capitalize font-medium tracking-wide">
                        {message}
                    </div>
            </div>
        </>
    );
}
 
export default SpinAnimation;