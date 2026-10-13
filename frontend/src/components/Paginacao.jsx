export default function Paginacao({ pagina, totalPaginas, limite, aoMudarPagina, aoMudarLimite }) {
    const paginas = [];
    for (let numero = 1; numero <= totalPaginas; numero++) {
        paginas.push(numero);
    }

    const primeira = pagina === 1;
    const ultima = pagina === totalPaginas;

    return (
        <nav className="paginacao">
            <button onClick={() => aoMudarPagina(1)} disabled={primeira}>Primeira</button>
            <button onClick={() => aoMudarPagina(pagina - 1)} disabled={primeira}>Anterior</button>

            {paginas.map(numero => (
                <button
                    key={numero}
                    className={numero === pagina ? 'ativa' : ''}
                    onClick={() => aoMudarPagina(numero)}
                >
                    {numero}
                </button>
            ))}

            <button onClick={() => aoMudarPagina(pagina + 1)} disabled={ultima}>Próxima</button>
            <button onClick={() => aoMudarPagina(totalPaginas)} disabled={ultima}>Última</button>

            <select value={limite} onChange={evento => aoMudarLimite(Number(evento.target.value))}>
                <option value={4}>4 por página</option>
                <option value={8}>8 por página</option>
                <option value={12}>12 por página</option>
            </select>
        </nav>
    );
}
