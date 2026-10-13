import { useEffect, useState } from 'react';
import { api } from './api.js';
import Perfil from './components/Perfil.jsx';
import Filtros from './components/Filtros.jsx';
import CardAtividade from './components/CardAtividade.jsx';
import Paginacao from './components/Paginacao.jsx';
import ModalLogin from './components/ModalLogin.jsx';
import FormAtividade from './components/FormAtividade.jsx';

function usuarioSalvo() {
    try {
        return JSON.parse(localStorage.getItem('usuario'));
    } catch {
        return null;
    }
}

export default function App() {
    const [usuario, setUsuario] = useState(usuarioSalvo);
    const [perfil, setPerfil] = useState(null);
    const [atividades, setAtividades] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [limite, setLimite] = useState(4);
    const [filtro, setFiltro] = useState('');
    const [tela, setTela] = useState('inicio');
    const [modalAberto, setModalAberto] = useState(false);
    const [recarregar, setRecarregar] = useState(0);

    useEffect(() => {
        carregarPerfil();
    }, [usuario, recarregar]);

    useEffect(() => {
        carregarAtividades();
    }, [usuario, pagina, limite, filtro, tela, recarregar]);

    async function carregarPerfil() {
        const { ok, dados } = usuario
            ? await api('/usuarios/perfil', { usuario })
            : await api('/empresa');

        if (!ok && usuario) return sair();
        if (ok) setPerfil(dados);
    }

    async function carregarAtividades() {
        const parametros = new URLSearchParams({ pagina, limite });
        if (filtro) parametros.append('tipo', filtro);
        if (tela === 'criar') parametros.append('minhas', 'true');

        const { ok, dados } = await api(`/atividades?${parametros}`, { usuario });
        if (ok) {
            setAtividades(dados.atividades);
            setTotalPaginas(dados.total_paginas);
        }
    }

    function exigirLogin(acao) {
        if (!usuario) {
            setModalAberto(true);
            return;
        }
        acao();
    }

    function entrar(dadosUsuario) {
        localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
        setUsuario(dadosUsuario);
        setModalAberto(false);
    }

    function sair() {
        localStorage.removeItem('usuario');
        setUsuario(null);
        setTela('inicio');
        setFiltro('');
        setPagina(1);
        setLimite(4);
    }

    function trocarFiltro(tipo) {
        exigirLogin(() => {
            setFiltro(filtro === tipo ? '' : tipo);
            setTela('inicio');
            setPagina(1);
        });
    }

    function trocarPagina(numero) {
        exigirLogin(() => setPagina(numero));
    }

    function trocarLimite(numero) {
        exigirLogin(() => {
            setLimite(numero);
            setPagina(1);
        });
    }

    function alternarTela() {
        setTela(tela === 'criar' ? 'inicio' : 'criar');
        setFiltro('');
        setPagina(1);
    }

    function atividadeCriada() {
        setPagina(1);
        setRecarregar(recarregar + 1);
    }

    function atualizarAtividade(id, novosDados) {
        setAtividades(lista => lista.map(atividade =>
            atividade.id === id ? { ...atividade, ...novosDados } : atividade
        ));
    }

    return (
        <div className="app">
            <Perfil
                dados={perfil}
                logado={!!usuario}
                telaCriar={tela === 'criar'}
                aoClicarAtividade={alternarTela}
            />

            <main className="principal">
                <header className="cabecalho">
                    {usuario ? (
                        <button className="botao-logout" onClick={sair}>Logout</button>
                    ) : (
                        <button className="botao-login" onClick={() => setModalAberto(true)}>Login</button>
                    )}
                </header>

                <Filtros ativo={filtro} aoSelecionar={trocarFiltro} />

                {tela === 'criar' && (
                    <>
                        <FormAtividade usuario={usuario} aoCriar={atividadeCriada} />
                        <h2 className="titulo-secao">Suas Atividades</h2>
                    </>
                )}

                <section className="lista">
                    {atividades.length === 0 && <p className="vazio">Nenhuma atividade encontrada.</p>}

                    {atividades.map(atividade => (
                        <CardAtividade
                            key={atividade.id}
                            atividade={atividade}
                            usuario={usuario}
                            exigirLogin={exigirLogin}
                            aoAtualizar={atualizarAtividade}
                        />
                    ))}
                </section>

                <Paginacao
                    pagina={pagina}
                    totalPaginas={totalPaginas}
                    limite={limite}
                    aoMudarPagina={trocarPagina}
                    aoMudarLimite={trocarLimite}
                />
            </main>

            {modalAberto && (
                <ModalLogin aoFechar={() => setModalAberto(false)} aoEntrar={entrar} />
            )}
        </div>
    );
}
