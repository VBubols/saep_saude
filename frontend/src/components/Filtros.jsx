const tipos = [
    { valor: 'corrida', texto: 'Corrida' },
    { valor: 'caminhada', texto: 'Caminhada' },
    { valor: 'trilha', texto: 'Trilha' }
];

export default function Filtros({ ativo, aoSelecionar }) {
    return (
        <nav className="filtros">
            {tipos.map(tipo => (
                <button
                    key={tipo.valor}
                    className={ativo === tipo.valor ? 'ativo' : ''}
                    onClick={() => aoSelecionar(tipo.valor)}
                >
                    {tipo.texto}
                </button>
            ))}
        </nav>
    );
}
