import { useCallback, useEffect } from "react";
import {useState} from "react";
import { useCode } from "../../../../contexts/CodeContextProvider";
import Error from "../Error";
import SearchBar from "./SearchBar";
import styles from "../../../../assets/css/output.module.css";

const ADR_OFFSET = 13;
const SNAPSHOT_LINES = 19;

const Memory = () =>
{
    const {error,memory} = useCode();
    const [snapShot,setSnapshot] = useState<string[]>([]);
    const [startingAddress,setStartingAddress] = useState(0);
    
    
    const createSnapShot = useCallback(()=>
    {
        let res:string[] = [];
        let buffer =''
        memory.split(' ').splice(startingAddress,memory.length).forEach((byte,index)=>{
            buffer += byte + ' ';
            if((index+1)%ADR_OFFSET === 0)
            {
                res.push(buffer);
                buffer = '';
            }
        })
        if(buffer !== '') res.push(buffer);
        setSnapshot(res.splice(0,SNAPSHOT_LINES));
    },[memory,startingAddress])

    useEffect(()=>
    {
        createSnapShot();

    },[createSnapShot,memory])


    return(
        <>
            <div className={styles.output}>
                {error && <Error message={error}/>}  
                {
                    !error && memory &&
                    <div className={styles['memory-wrapper']}>
                        <SearchBar action={setStartingAddress}/>
                        <div className={styles.memory}>
                        {
                            snapShot.map((line,index)=>
                            {
                                return(
                                    <div key={index}>
                                        <span>
                                                {'0x'+(index * ADR_OFFSET + startingAddress).toString(16).padStart(4,'0').toUpperCase()}
                                            </span>
                                        <span>{line}</span>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                
                }
            </div>
        </>
    )
}

export default Memory;