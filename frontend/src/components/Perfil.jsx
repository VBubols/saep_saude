import Foto from './Foto.jsx';
import { formatarNumero } from '../formatar.js';

export default function Perfil({ dados, logado, telaCriar, aoClicarAtividade }) {
    return (
        <aside className="perfil">
            {dados && (
                <div className="perfil-topo">
                    <Foto className="perfil-foto" imagem={dados.imagem} nome={dados.nome} />
                    <h2 className="perfil-nome">{dados.nome}</h2>

                    <div className="perfil-numeros">
                        <div>
                            <strong>{dados.qtd_atividade}</strong>
                            <span>Qtd. Atividades</span>
                        </div>
                        <div>
                            <strong>{formatarNumero(dados.qtd_calorias)}</strong>
                            <span>Qtd. Calorias</span>
                        </div>
                    </div>
                </div>
            )}

            <button
                className={telaCriar ? 'botao-atividade ativo' : 'botao-atividade'}
                disabled={!logado}
                onClick={aoClicarAtividade}
            >
                <img src="/assets/progresso.svg" alt="" />
                Atividade
            </button>

            <footer className="rodape">
                <strong>SAEPSaúde</strong>
                <div className="rodape-icones">
                    <img src="/assets/instagram.svg" alt="Instagram" />
                    <img src="/assets/twitter.svg" alt="Twitter" />
                    <img src="/assets/tiktok.svg" alt="TikTok" />
                </div>
                <small>Copyright-2024</small>
            </footer>
        </aside>
    );
}
