import {addressingMode} from "../../assembly/documentation/addressingMode.json";
import Table from "./Table";
import styles from "../../assets/css/documentation.module.css";

const AdrModes = () =>
{

    return(
        <>
           <section className={styles['section-wrapper']}>
            <h1>
                addressing modes
            </h1>
            <section>
                <p>
                     a total of {Object.keys(addressingMode).length} addressing modes are available
                </p>
                <div>
                    <Table 
                        header={['mode',...Object.keys(addressingMode.direct)]}
                        body={addressingMode}
                    />
                </div>
            </section>
           </section>
        </>
    )
}
export default AdrModes;