import React, { useState } from "react";
import styles from "../../../../assets/css/output.module.css";

interface IProps
{
    action:any    
}
 
const SearchBar: React.FC<IProps> = ({action}) => {

    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setValue(event.target.value);
    }

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        if(value) action(parseInt(value,16))
    }
    return (
        <>
            <form 
                onSubmit={handleSubmit}
                className={styles['search-bar-form']}
            >
                <div>
                    <span>@:</span>
                    <input
                        type="text"
                        pattern="0x[0-9a-fA-F]{4}"
                        placeholder="0x0000"
                        onChange={handleChange}
                    />
                </div>
            </form>
        </>
    );
}
 
export default SearchBar;