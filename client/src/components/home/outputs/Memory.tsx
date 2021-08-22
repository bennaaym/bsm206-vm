import { useEffect } from "react";
import {useState} from "react";
import styles from "../../../assets/css/output.module.css";
import { useCode } from "../../../contexts/CodeContextProvider";
import Error from "./Error";

const ADR_OFFSET = 13;
const SNAPSHOT_LINES = 20;

const Memory = () =>
{
    const [localMemory,setLocalMemory] = useState<string[]>([]);
    const [snapShot,setSnapshot] = useState<string[]>([]);
    const {error,memory} = useCode();
    
    useEffect(()=>{
        setLocalMemory(memory.split(' '));
    },[setLocalMemory,memory])

    useEffect(()=>
    {
        let res:string[] = [];
        let buffer =''
        localMemory.forEach((byte,index)=>{
            buffer += byte + ' ';
            if((index+1)%ADR_OFFSET === 0)
            {
                res.push(buffer);
                buffer = '';
            }
        })
        if(buffer !== '') res.push(buffer);
        setSnapshot(res.splice(0,SNAPSHOT_LINES));
    },[setSnapshot,localMemory]);


    return(
        <>
            <div className={styles.output}>
                {error && <Error message={error}/>}  
                {
                    !error &&
                    <div className="p-2 break-words w-full flex flex-col items-center justify-center ">
                       {
                           snapShot.map((line,index)=>
                           {
                               return(
                                   <div 
                                    key={index}
                                    className="flex items-center justify-between space-x-4"
                                   >
                                       <span 
                                        className="opacity-50 text-center">
                                            {'0x'+(index * ADR_OFFSET).toString(16).padStart(4,'0').toUpperCase()}
                                        </span>
                                       <span>{line}</span>
                                   </div>
                               )
                           })
                       }
                    </div>
                
                }
            </div>
        </>
    )
}

export default Memory;