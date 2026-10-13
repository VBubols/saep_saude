import { useState } from 'react';
import { api } from '../api.js';

export default function ModalLogin({ aoFechar, aoEntrar }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [camposErro, setCamposErro] = useState([]);

    async function entrar(evento) {
        evento.preventDefault();

        const vazios = [];
        if (!email.trim()) vazios.push('email');
        if (!senha) vazios.push('senha');

        if (vazios.length) {
            setCamposErro(vazios);
            setErro('email ou senha obrigatório');
            return;
        }

        const { ok, dados } = await api('/auth/login', { metodo: 'POST', corpo: { email: email.trim(), senha } });

        if (!ok) {
            setCamposErro(dados.campos || ['email', 'senha']);
            setErro(dados.mensagem);
            return;
        }

        aoEntrar(dados.usuario);
    }

    return (
        <div className="fundo-modal" onClick={aoFechar}>
            <form className="modal" onClick={evento => evento.stopPropagation()} onSubmit={entrar} noValidate>
                <div className="modal-topo">
                    <h2>Login</h2>
                    <button type="button" className="botao-fechar" onClick={aoFechar} aria-label="Fechar">
                        <img src="/assets/x.svg" alt="" />
                    </button>
                </div>

                <div className="modal-corpo">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className={camposErro.includes('email') ? 'input-erro' : ''}
                        value={email}
                        onChange={evento => setEmail(evento.target.value)}
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        className={camposErro.includes('senha') ? 'input-erro' : ''}
                        value={senha}
                        onChange={evento => setSenha(evento.target.value)}
                    />

                    {erro && <p className="mensagem-erro">{erro}</p>}

                    <div className="modal-botoes">
                        <button type="submit" className="botao-escuro">Login</button>
                        <button type="button" className="botao-contorno" onClick={aoFechar}>Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
