import { Request, Response } from "express";
import UsuarioModelo from "../models/UsuarioModelo";


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

export const atualizarUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await UsuarioModelo.findByPk(req.params.id);
        if (usuario) {
            await usuario.update(req.body);
            res.send(usuario);
        } else {
            res.status(404).send({ message: 'Usuario não foi encontrado' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Erro ao atualizar usuario', error });
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


