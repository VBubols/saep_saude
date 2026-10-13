export const API_URL = 'http://localhost:3000';

export async function api(caminho, { metodo = 'GET', corpo, usuario } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (usuario) headers['x-usuario-id'] = usuario.id;

    try {
        const resposta = await fetch(`${API_URL}${caminho}`, {
            method: metodo,
            headers,
            body: corpo ? JSON.stringify(corpo) : undefined
        });
        const dados = await resposta.json();
        return { ok: resposta.ok, dados };
    } catch (error) {
        return { ok: false, dados: { mensagem: 'Não foi possível conectar ao servidor' } };
    }
}

export function urlImagem(imagem) {
    if (!imagem) return '';
    if (imagem.startsWith('http')) return imagem;
    return `${API_URL}/imagens/${imagem}`;
}
