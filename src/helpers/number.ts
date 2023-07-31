
const formatador = new Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL'}
);

export const formataDinheiro = (valor: string) => {

    const value = (valor.slice(0,valor.length-2) as unknown as number)

    return formatador.format(value)
}

export function getNumbers(string: string)
{
    const numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr);
}
