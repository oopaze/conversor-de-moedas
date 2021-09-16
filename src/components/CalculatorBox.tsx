import styles from '../styles/components/CalculatorBox.module.css';
import { FaExchangeAlt, FaRedo } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import { CalculatorBoxContext } from '../contexts/CalculatorBoxContext';


export function CalculatorBox() {
    const {
        getOptionsNode,
        getValueConverted
    } = useContext(CalculatorBoxContext);

    async function populateSelect(){
        let options: string[] = await getOptionsNode();
        let de = document.querySelector('#converter_de') as HTMLSelectElement;
        let para = document.querySelector('#para') as HTMLSelectElement;

        de.innerHTML += options;
        para.innerHTML += options;

    } 

    function reverseOptions (): void {
        let de = document.querySelector('#converter_de') as HTMLSelectElement;
        let para = document.querySelector('#para') as HTMLSelectElement;

        let de_value = de.value;
        
        de.value = para.value;
        para.value = de_value;
    }

    async function calculateValue() {
        let de = document.querySelector('#converter_de') as HTMLSelectElement;
        let para = document.querySelector('#para') as HTMLSelectElement;
        let valor = document.querySelector('#valor') as HTMLInputElement;

        let value_convertido = await getValueConverted(parseFloat(valor.value), de.value, para.value) 
    }

    useEffect(() => {
        populateSelect() 
    })

    return (
        <div className={styles.calculatorContent}>
            <div className={styles.calculatorHead}>
                <div className={styles.formGroup}>
                    <label htmlFor="valor"> Valor </label>
                    <input 
                    type="number" 
                    placeholder="0,00" 
                    id="valor" 
                    name="valor"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="converter_de"> Converter De </label>
                    <select name="converter_de" id="converter_de">
                        
                    </select>
                </div>
                <div className={styles.formButtonGroup}>
                    <button className={styles.reverseCurrency} onClick={reverseOptions}>
                        <FaExchangeAlt/>
                    </button>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="para"> Para </label>
                    <select name="para" id="para">
                        
                    </select>
                </div>
                <div className={styles.formButtonGroup} onClick={ calculateValue }>
                    <button className={styles.converter}>
                        <FaRedo/>
                    </button>
                </div>
            </div>
        </div>
    );
}