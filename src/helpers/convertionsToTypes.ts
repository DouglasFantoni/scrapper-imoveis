import { ImovelType } from "src/constants/imovelTypes";


export const convertImovelType = (imovelType: string): ImovelType => {

    // Deixa em caixa baixa e remove espaços/caracteres especiais
    const imovelTypeFormated = imovelType.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    return (imovelTypeFormated.includes('casa') && 'Casa') || (imovelTypeFormated.includes('apartamento') && 'Apartamento') || 'Desconhecido';
}

export const convertToNumber = (value: string): number => {

    return parseFloat(value.replace(/[^0-9,]/g, '').replace(',', '.'))
} 