
const formatador = new Intl.NumberFormat('pt-BR',
{
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}
);

export const formataDinheiro = (valor: number) => {

    return formatador.format(valor)
}

export function getNumbers(string: string)
{
    const numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr);
}
