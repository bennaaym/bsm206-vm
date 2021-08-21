
export interface IProps 
{
    message:string;    
}

const Error: React.FC<IProps> = ({message}) => {
    
    return (
        <>
            <div className="flex-grow flex flex-col text-error items-center">
                    <div>
                        {message}
                    </div>
            </div>
        </>
    );
}
 
export default Error;