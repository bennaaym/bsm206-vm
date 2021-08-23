import React, { useState } from "react";

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
                className="flex justify-center pt-2"
            >
                <div className="text-light-text-300 relative w-full sm:w-8/12 md:w-full lg:w-10/12 xl:w-8/12 px-4 flex items-center">
                    <span className ="absolute  left-6 opacity-50 ">
                        @:
                    </span>
                    <input
                        className="px-6 w-full border border-light-text-100  uppercase  outline-none rounded"
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