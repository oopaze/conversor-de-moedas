import { createContext, ReactNode, useEffect } from "react";

interface CalculatorBoxProviderProps {
    children: ReactNode
}

type moeda = {
    label: string,
    value: string
}

interface CalculatorBoxContextData {
    getMoedas: () => Array<moeda>;
    getOptionsNode: () => string[];
    getValueConverted: (value: number, fr: string, to: string) => number;
}

export const CalculatorBoxContext = createContext({} as CalculatorBoxContextData);

export function CalculatorBoxProvider({ children }: CalculatorBoxProviderProps) {
    const apiUrl = 'https://api.exchangeratesapi.io/v1'
    const apiKey = '038513807fa50afcf14e24decfa1fc48'

    async function getMoedas () {
        const moedas_url = `currencies?apiKey=${apiKey}`;
        var moedas: moeda[] = [];

        await fetch(moedas_url).then(async (response) => {
            var data = await response.json();
            if (data){
                data = data.results
                Object.keys(data).forEach((element: string) => {
                    let label: string = data[element].currencyName + ` (${element})`;
                    let value: string = data[element].id;

                    moedas.push({
                        label: label,
                        value: value
                    });
                })
            }
        }).catch((err) => {
            moedas.push({
                label: 'Dolar (USD)',
                value: 'GBP'
            })
            moedas.push({
                label: 'Real (BRL)',
                value: 'JPY'
            })
        })

        return moedas
    }

    async function getValueConverted(value: number, fr: string, to: string) {
        const contation_url = `${apiUrl}/convert?access_key=${apiKey}&from=${fr}&to=${to}&amount=${value}`;
        console.log(contation_url)
        var cotation = await fetch(
            contation_url
        ).then(
            async (response) => await response.json()
        )
        if (cotation.success){
            return value * cotation.result
        } else {
            return "API indisponível"
        }
    }

    async function getOptionsNode() {
        let moedas = await getMoedas();
        var elements: string[] = [`<option value="">---------</option>`];

        moedas.forEach((element) => {
            elements.push(
                `<option value="${element.value}">${element.label}</option>`
            );
        });

        return elements
    }

    return (
        <CalculatorBoxContext.Provider value = {{
            getMoedas,
            getOptionsNode,
            getValueConverted
        }}>
            { children }
        </CalculatorBoxContext.Provider>
    )
}