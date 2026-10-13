import { urlImagem } from '../api.js';

export default function Foto({ imagem, nome, className }) {
    if (!imagem) {
        return <div className={`${className} sem-foto`}>{nome ? nome[0] : '?'}</div>;
    }

    return <img className={className} src={urlImagem(imagem)} alt={nome} />;
}
