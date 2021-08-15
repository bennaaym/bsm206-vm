import Error from "./Error";

class MaxExecutionTimeError extends Error
{
    // Constructor
    constructor(details:string)
    {
        super("MaxExecutionTimeError",details);
    }
}

export default MaxExecutionTimeError;