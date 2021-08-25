import {addressingMode} from "../../assembly/documentation/addressingMode.json";
import Table from "./Table";

const AdrModesTable = () =>
{

    return(
        <>
            <Table 
                header={['mode',...Object.keys(addressingMode.direct)]}
                body={addressingMode}
            />
        </>
    )
}
export default AdrModesTable;