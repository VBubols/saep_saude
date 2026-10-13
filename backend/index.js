import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import auth_router from './routes/auth.routes.js';
import usuario_router from './routes/usuario.routes.js';
import empresa_router from './routes/empresa.routes.js';
import atividade_router from './routes/atividade.routes.js';
import curtida_router from './routes/curtida.routes.js';
import comentario_router from './routes/comentario.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/imagens', express.static('public/imagens'));

app.use('/auth', auth_router);
app.use('/usuarios', usuario_router);
app.use('/empresa', empresa_router);
app.use('/atividades', atividade_router);
app.use('/atividades', curtida_router);
app.use('/atividades', comentario_router);

const PORT = process.env.PORT || 3000;

await sequelize.sync();

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
