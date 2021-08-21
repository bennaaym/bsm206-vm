export interface IProps
{
    code:string,
    reference:React.MutableRefObject<HTMLDivElement | null>
}
 
const LineCounter: React.FC<IProps> = ({code,reference}) => {
    return (
            <div 
                ref={reference}
                className="h-full pl-2 opacity-40 z-0 absolute text-center overflow-y-auto">
                {
                    [...Array(code.split('\n').length)].map((line,index)=>{
                        return <div key={index}>{index + 1}</div>
                    })
                }
            </div>
    );
}
 
export default LineCounter;