import { useState } from 'react';
import { api } from '../api.js';

const camposIniciais = {
    tipo_atividade: '',
    distancia_percorrida: '',
    duracao_atividade: '',
    quantidade_calorias: ''
};

export default function FormAtividade({ usuario, aoCriar }) {
    const [campos, setCampos] = useState(camposIniciais);
    const [erros, setErros] = useState([]);
    const [mensagem, setMensagem] = useState('');

    function alterar(evento) {
        setCampos({ ...campos, [evento.target.name]: evento.target.value });
    }

    function classeDo(nome) {
        return erros.includes(nome) ? 'input-erro' : '';
    }

    function erroDo(nome) {
        if (!erros.includes(nome)) return null;
        return <span className="mensagem-erro">{campos[nome] === '' ? 'Campo obrigatório' : mensagem}</span>;
    }

    async function enviar(evento) {
        evento.preventDefault();

        const vazios = Object.keys(campos).filter(nome => campos[nome] === '');
        if (vazios.length) {
            setErros(vazios);
            return;
        }

        const { ok, dados } = await api('/atividades', { metodo: 'POST', corpo: campos, usuario });

        if (!ok) {
            setErros(dados.campos || []);
            setMensagem(dados.mensagem);
            return;
        }

        setCampos(camposIniciais);
        setErros([]);
        setMensagem('');
        aoCriar();
    }

    return (
        <form className="form-atividade" onSubmit={enviar} noValidate>
            <h2>Crie sua atividade</h2>

            <div className="form-grade">
                <div className="campo">
                    <label htmlFor="tipo_atividade">Tipo da atividade</label>
                    <select
                        id="tipo_atividade"
                        name="tipo_atividade"
                        className={classeDo('tipo_atividade')}
                        value={campos.tipo_atividade}
                        onChange={alterar}
                    >
                        <option value="" disabled>Ex: Caminhada</option>
                        <option value="corrida">Corrida</option>
                        <option value="caminhada">Caminhada</option>
                        <option value="trilha">Trilha</option>
                    </select>
                    {erroDo('tipo_atividade')}
                </div>

                <div className="campo">
                    <label htmlFor="distancia_percorrida">Distância percorrida</label>
                    <input
                        id="distancia_percorrida"
                        name="distancia_percorrida"
                        type="number"
                        min="1"
                        placeholder="Ex: 1000 metros"
                        className={classeDo('distancia_percorrida')}
                        value={campos.distancia_percorrida}
                        onChange={alterar}
                    />
                    {erroDo('distancia_percorrida')}
                </div>

                <div className="campo">
                    <label htmlFor="duracao_atividade">Duração da atividade</label>
                    <input
                        id="duracao_atividade"
                        name="duracao_atividade"
                        type="number"
                        min="1"
                        placeholder="Ex: 120 min"
                        className={classeDo('duracao_atividade')}
                        value={campos.duracao_atividade}
                        onChange={alterar}
                    />
                    {erroDo('duracao_atividade')}
                </div>

                <div className="campo">
                    <label htmlFor="quantidade_calorias">Quantidade de calorias</label>
                    <input
                        id="quantidade_calorias"
                        name="quantidade_calorias"
                        type="number"
                        min="1"
                        placeholder="Ex: 300"
                        className={classeDo('quantidade_calorias')}
                        value={campos.quantidade_calorias}
                        onChange={alterar}
                    />
                    {erroDo('quantidade_calorias')}
                </div>
            </div>

            <button type="submit" className="botao-escuro">Criar Atividade</button>
        </form>
    );
}
