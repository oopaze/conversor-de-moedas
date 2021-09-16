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
    const apiUrl = 'https://free.currconv.com/api/v7/'
    const apiKey = 'do-not-use-this-api-key-XTPJVcEeuzLuRYtP8qWIR'

    async function getMoedas () {
        const moedas_url = `${apiUrl}currencies?apiKey=${apiKey}`;
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
                value: 'USD'
            })
            moedas.push({
                label: 'Real (BRL)',
                value: 'BRL'
            })
        })

        return moedas
    }

    async function getValueConverted(fr: string, to: string, value: number) {
        const contation_url = `${apiUrl}convert?apiKey=${apiKey}&q=${fr}_${to}`;

        var cotation = await fetch(
            contation_url
        ).then(
            async (response) => await response.json()
        ).catch((err) => {
            console.log(err)
        })

        return value * cotation.results[`${fr}_${to}`].val
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