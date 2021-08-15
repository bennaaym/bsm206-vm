import Error from "./Error";

class OutOfMemoryError extends Error
{
    // Constructor
    constructor(details:string)
    {
        super('OutOfMemoryError ',details);
    }
}

export default OutOfMemoryError;