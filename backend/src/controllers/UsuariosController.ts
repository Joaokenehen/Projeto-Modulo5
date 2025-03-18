import { Request, Response } from "express";
import UsuarioModelo from "../models/UsuarioModelo";
import { formatarErros } from "../interfaces/Erros";
import { RequisicaoAutenticada } from "../interfaces/usuarioAuth";


interface AuthRequest extends Request {
    usuarioId?: number;
}

export const buscarTodosUsuarios = async (req: Request, res: Response) => {
    const users = await UsuarioModelo.findAll();
    res.send(users)
}

export const buscarUsuarioPorId = async (req: Request, res: Response) => {
    const usuario = await UsuarioModelo.findByPk(req.params.id);
    if (usuario) {
        return res.json(usuario);
    } else {
        res.status(404).send({ message: `O Usuario não foi encontrado` });
    }
}


export const criarUsuario =  async (req: Request, res: Response) => {
    try {
        const dadosUsuario = {
            nome: req.body.nome,
            email: req.body.email,
            cpf: req.body.cpf,
            senha: req.body.senha,
            dataNascimento: req.body.dataNascimento,
            fotoDePerfil: req.body.fotoDePerfil,
            genero: req.body.genero
        }

        if(dadosUsuario.nome =="", dadosUsuario.email =="", dadosUsuario.cpf =="", dadosUsuario.senha =="", dadosUsuario.dataNascimento =="", dadosUsuario.fotoDePerfil =="", dadosUsuario.genero =="")
        {
            res.status(400).send({ message: 'Preencha todos os campos' });
        }
        const usuario = await UsuarioModelo.create(dadosUsuario);
        res.status(201).send(usuario);
    } catch (error) {
        res
            .status(400)
            .send({ message: 'Erro no servidor', error });
    }
}

export const atualizarUsuario = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { email, ...dadosAtualizacao } = req.body;

        console.log('Dados recebidos para atualização:', {
            ...dadosAtualizacao,
            fotoDePerfil: dadosAtualizacao.fotoDePerfil ? 'Foto presente' : 'Sem foto'
        });

        const usuario = await UsuarioModelo.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ 
                message: 'Usuário não encontrado' 
            });
        }

        if (req.usuarioId !== parseInt(id)) {
            return res.status(403).json({ 
                message: 'Você não tem permissão para editar este usuário' 
            });
        }

        if (email) {
            return res.status(400).json({ 
                message: 'Não é permitido alterar o email' 
            });
        }

        // Remove validação de campos obrigatórios para permitir atualização parcial
        const dadosParaAtualizar = {
            ...dadosAtualizacao,
            // Mantém a foto atual se não houver nova foto
            fotoDePerfil: dadosAtualizacao.fotoDePerfil || usuario.fotoDePerfil
        };

        await usuario.update(dadosParaAtualizar);

        return res.status(200).json({
            message: 'Usuário atualizado com sucesso',
            usuario: {
                id: usuario.id_usuario,
                nome: usuario.nome,
                cpf: usuario.cpf,
                dataNascimento: usuario.dataNascimento,
                fotoDePerfil: usuario.fotoDePerfil,
                genero: usuario.genero
            }
        });

    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(400).json({
            message: 'Erro ao atualizar o usuário',
            error: formatarErros(error)
        });
    }
}

export const deletarUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await UsuarioModelo.findByPk(req.params.id);
        if (usuario) {
            await usuario.destroy();
            res.send({ message: 'Usuario foi removido com sucesso' });
        } else {
            res.status(404).send({ message: 'Usuario não foi encontrado' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Erro ao remover o usuario', error });
    }
}


