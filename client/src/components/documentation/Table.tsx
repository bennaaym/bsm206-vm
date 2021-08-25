import styles from "../../assets/css/documentation.module.css";

interface IProps 
{
    header:string[],
    body:{[prop:string]:{[prop:string]:string}};
}
 
const Table: React.FC<IProps> = ({header,body}) => {

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr >
                        {
                          header.map((head)=>
                            {
                                return(
                                    <th key={head}>
                                        {head}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(body).map(key=>{
                            return(
                                <tr key={key}>
                                    <td>{key}</td>
                                    {
                                        Object.values(body[key]).map((key)=>{
                                            return(
                                                <td key={key}>
                                                    {key}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                        )})
                    }
                </tbody>
            </table>
        </>
    );
}
 
export default Table;