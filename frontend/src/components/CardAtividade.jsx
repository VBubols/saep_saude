import { useState } from 'react';
import { api } from '../api.js';
import Foto from './Foto.jsx';
import { formatarData, formatarNumero, metrosParaKm, minutosParaHoras } from '../formatar.js';

export default function CardAtividade({ atividade, usuario, exigirLogin, aoAtualizar }) {
    const [aberto, setAberto] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    const [texto, setTexto] = useState('');
    const [erro, setErro] = useState('');

    function curtir() {
        exigirLogin(async () => {
            const { ok, dados } = await api(`/atividades/${atividade.id}/curtida`, { metodo: 'POST', usuario });
            if (ok) {
                aoAtualizar(atividade.id, { curtido_por_mim: dados.curtido, qtd_curtidas: dados.qtd_curtidas });
            }
        });
    }

    function abrirComentarios() {
        exigirLogin(async () => {
            if (aberto) {
                setAberto(false);
                return;
            }
            const { ok, dados } = await api(`/atividades/${atividade.id}/comentarios`);
            if (ok) setComentarios(dados.comentarios);
            setAberto(true);
        });
    }

    async function comentar(evento) {
        evento.preventDefault();

        if (texto.trim().length <= 2) {
            setErro('não é possível enviar um comentário vazio');
            return;
        }

        const { ok, dados } = await api(`/atividades/${atividade.id}/comentarios`, {
            metodo: 'POST',
            corpo: { texto },
            usuario
        });

        if (!ok) {
            setErro(dados.mensagem);
            return;
        }

        setComentarios([...comentarios, { ...dados.comentario, Usuario: usuario }]);
        setTexto('');
        setErro('');
        aoAtualizar(atividade.id, { qtd_comentarios: dados.qtd_comentarios });
    }

    return (
        <article className="card">
            <div className="card-corpo">
                <Foto className="card-foto" imagem={atividade.Usuario.imagem} nome={atividade.Usuario.nome} />

                <div className="card-info">
                    <div className="card-topo">
                        <span className="card-usuario">{atividade.Usuario.nome}</span>
                        <h3 className="card-titulo">{atividade.tipo_atividade}</h3>
                        <span className="card-data">{formatarData(atividade.createdAt)}</span>
                    </div>

                    <div className="card-rodape">
                        <div className="metrica">
                            <strong>{metrosParaKm(atividade.distancia_percorrida)}</strong>
                            <span>Distância</span>
                        </div>
                        <div className="metrica">
                            <strong>{minutosParaHoras(atividade.duracao_atividade)}</strong>
                            <span>Duração</span>
                        </div>
                        <div className="metrica">
                            <strong>{formatarNumero(atividade.quantidade_calorias)}</strong>
                            <span>Calorias</span>
                        </div>

                        <div className="interacoes">
                            <button onClick={curtir} aria-label="Curtir">
                                <img src={atividade.curtido_por_mim ? '/assets/CoracaoVermelho.svg' : '/assets/coracao.svg'} alt="" />
                                {atividade.qtd_curtidas}
                            </button>
                            <button onClick={abrirComentarios} aria-label="Comentários">
                                <img src="/assets/comentario.svg" alt="" />
                                {atividade.qtd_comentarios}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {aberto && usuario && (
                <div className="comentarios">
                    {comentarios.length > 0 && (
                        <ul className="lista-comentarios">
                            {comentarios.map(comentario => (
                                <li key={comentario.id}>
                                    <Foto className="comentario-foto" imagem={comentario.Usuario.imagem} nome={comentario.Usuario.nome} />
                                    <p><strong>{comentario.Usuario.nome}</strong> {comentario.texto}</p>
                                </li>
                            ))}
                        </ul>
                    )}

                    <form className="form-comentario" onSubmit={comentar}>
                        <input
                            className={erro ? 'input-erro' : ''}
                            placeholder="Escrever um comentário..."
                            value={texto}
                            onChange={evento => setTexto(evento.target.value)}
                        />
                        <button type="submit" aria-label="Enviar comentário">
                            <img src="/assets/send.svg" alt="" />
                        </button>
                    </form>

                    {erro && <p className="mensagem-erro">{erro}</p>}
                </div>
            )}
        </article>
    );
}
