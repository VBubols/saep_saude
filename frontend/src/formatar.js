function doisDigitos(numero) {
    return String(numero).padStart(2, '0');
}

export function formatarData(data) {
    const d = new Date(data);
    const hora = `${doisDigitos(d.getHours())}:${doisDigitos(d.getMinutes())}`;
    const dia = `${doisDigitos(d.getDate())}/${doisDigitos(d.getMonth() + 1)}/${String(d.getFullYear()).slice(-2)}`;
    return `${hora} - ${dia}`;
}

export function formatarNumero(numero) {
    return Number(numero).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
}

export function metrosParaKm(metros) {
    return `${formatarNumero(metros / 1000)} km`;
}

export function minutosParaHoras(minutos) {
    return `${formatarNumero(minutos / 60)} h`;
}
