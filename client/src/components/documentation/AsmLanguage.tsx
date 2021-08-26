import styles from "../../assets/css/documentation.module.css";

const AsmLanguage = () =>
{
    return(
        <>
            <section className={styles['section-wrapper']}>
                <h1>assembly language</h1>
                <section>
                    <h4>syntax</h4>
                    <div className="my-2 space-x-2 uppercase bg-dark-background-200 rounded p-2">
                        <span className="text-dark-keyword">mnemonic</span>
                        <span className="text-dark-number">operand</span>
                        <span className ="text-dark-comment">; comment</span>
                    </div>
                </section>   
            </section>
        </>
    )
}

export default AsmLanguage;