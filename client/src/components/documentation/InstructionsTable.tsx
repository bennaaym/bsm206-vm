import {instructions} from "../../assembly/documentation/instructions.json"; 
import styles from "../../assets/css/documentation.module.css";
const arr :{
    [instruction:string]:{
        function:string,
        modes:{[adr:string]:{[attr:string]:string}}
    }
} = instructions;

const headers = ['mnemonis','mode','opcode','bytes','cycles','function','example'];

const InstructionsTable = () =>
{
       return(
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                       {
                           headers.map(head=><th key={head}>{head}</th>)
                       }
                    </tr>
                </thead>
                <tbody>
                   {
                       Object.keys(arr).map(instruction=>{
                            const modes =  Object.keys(arr[instruction].modes)
                            return (
                                modes.map((mode,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{instruction}</td>
                                        <td>{mode}</td>
                                        <td>{arr[instruction].modes[mode].opcode}</td>
                                        <td>{arr[instruction].modes[mode].bytes}</td>
                                        <td className={styles['before-last']}>
                                            {arr[instruction].modes[mode].cycles}
                                        </td>
                                        {
                                            (index === 0)&&
                                            <td rowSpan={modes.length} className="text-left">
                                                {arr[instruction].function}
                                            </td>
                                        }
                                        <td className="w-28 text-base">
                                            {arr[instruction].modes[mode].exemple}
                                        </td>
                                    </tr>
                                )
                            }))
                            
                       })
                   }
                </tbody>
            </table>
        </>
    )
}

export default InstructionsTable;