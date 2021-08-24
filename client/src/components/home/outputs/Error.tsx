import styles from "../../../assets/css/output.module.css";

interface IProps 
{
    message:string;    
}

const Error: React.FC<IProps> = ({message}) => {
    
    return (
        <>
            <div className={styles.error}>
                    <div>
                        {message}
                    </div>
            </div>
        </>
    );
}
 
export default Error;