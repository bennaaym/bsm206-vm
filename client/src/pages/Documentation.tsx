import AdrModeTable from "../components/documentation/AdrModesTable";
import InstructionsTable from "../components/documentation/InstructionsTable";
import RegistersTable from "../components/documentation/RegistersTables";

const Documentation = () =>
{
    return(
        <>
            <div className="flex  w-full items-center justify-center">
                <div className="w-8/12">
                    <InstructionsTable/>
                    <RegistersTable/>
                    <AdrModeTable/>
                    
                </div>
            </div>
        </>
    )
}

export default Documentation;