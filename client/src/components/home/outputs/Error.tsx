
export interface IProps 
{
    message:string;    
}

const Error: React.FC<IProps> = ({message}) => {
    
    return (
        <>
            <div className="p-2 text-justify flex-grow flex flex-col text-error ">
                    <div>
                        {message}
                    </div>
            </div>
        </>
    );
}
 
export default Error;