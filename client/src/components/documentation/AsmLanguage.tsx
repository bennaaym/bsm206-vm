import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons"
import styles from "../../assets/css/documentation.module.css";

const AsmLanguage = () =>
{
    return(
        <>
            <section className={styles['section-wrapper']}>
                <h1>assembly language</h1>
                <section>
                    <h4>syntax</h4>
                    <div className={styles.snippet}>
                        <span className="text-dark-keyword">mnemonic</span>
                        <span className="text-dark-number">operand</span>
                        <span className ="text-dark-comment">; comment</span>
                    </div>
                </section>   
                <section className="space-y-2">
                    <h4>numbers</h4>
                    <p>
                        all numbers are considered as a hexadecimal value
                    </p>
                    <p>
                        if the hexadecimal value starts with a letter [A-F] an insignificant zero should be added at the beginning otherwise an error will be raised
                    </p>
                    <div className={styles.snippet}>
                        <span className="text-dark-keyword">LDA</span>
                        <span className="text-dark-number">#1234</span>
                        <span className ="text-dark-comment">; 1234 is a hexadecimal value</span>
                    </div>
                    <div className={styles.snippet}>
                        <span className="text-error text-xl">
                            <FontAwesomeIcon icon={faTimesCircle}/>
                        </span>
                        <span className="text-dark-keyword">LDA</span>
                        <span className="text-dark-text-300">#A123</span>
                        <span className ="text-dark-comment">; an error will be raised because A123 won't be evaluated as a numerical value</span>
                    </div>
                    <div className={styles.snippet}>
                        <span className="text-light-comment text-xl">
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </span>
                        <span className="text-dark-keyword">LDA</span>
                        <span className="text-dark-number">#0A123</span>
                        <span className ="text-dark-comment">; no error will be raised and A123 will be evaluated as numerical value</span>
                    </div>
                </section>   
            </section>
        </>
    )
}

export default AsmLanguage;