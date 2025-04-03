import { Request, Response } from "express";
import {
  AgendamentoModelo,
  PetModelo,
  ServicoModelo,
} from "../models/Relacionamento";
import UsuarioModelo from "../models/UsuarioModelo";

export const buscarTodosAgendamentos = async (req: Request, res: Response) => {
  try {
    // Pega os parâmetros de paginação da query, com valores padrão
    const pagina = Number(req.query.pagina) || 1;
    const limite = Number(req.query.limite) || 10;
    const offset = (pagina - 1) * limite;

    // Busca agendamentos com paginação
    const { count, rows: agendamentos } =
      await AgendamentoModelo.findAndCountAll({
        limit: limite,
        offset: offset,
        include: [
          {
            model: PetModelo,
            attributes: ["nome", "especie"],
            include: [
              {
                model: UsuarioModelo,
                attributes: ["nome", "email"],
              },
            ],
          },
        ],
        order: [
          ["data", "ASC"],
          ["horario", "ASC"],
        ],
      });

    // Retorna os dados paginados
    res.status(200).json({
      total: count,
      totalPaginas: Math.ceil(count / limite),
      paginaAtual: pagina,
      itensPorPagina: limite,
      agendamentos: agendamentos,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ message: "Erro ao buscar agendamentos" });
  }
};

export const buscarAgendamentoPorId = async (req: Request, res: Response) => {
  const agendamento = await AgendamentoModelo.findByPk(req.params.id);
  res.send(agendamento);
};

export const criarNovoAgendamento = async (req: Request, res: Response) => {
  try {
    const {
      id_pet,
      id_endereco,
      id_servico,
      data,
      horario,
      id_usuario,
      status,
      descricao_sintomas,
    } = req.body;

    // Validação dos campos
    if (
      !id_pet ||
      !id_endereco ||
      !id_servico ||
      !data ||
      !horario ||
      !id_usuario
    ) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    const novoAgendamento = await AgendamentoModelo.create({
      id_pet,
      id_endereco,
      id_servico,
      data,
      horario,
      id_usuario,
      status: status || "pendente",
      descricao_sintomas,
    });

    res.status(201).json({
      message: "Agendamento criado com sucesso",
      agendamento: novoAgendamento,
    });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({
      message: "Erro ao criar agendamento",
      error: error,
    });
  }
};

export const atualizarDadosAgendamento = async (
  req: Request,
  res: Response
) => {
  await AgendamentoModelo.update(req.body, {
    where: { id_agendamento: req.params.id },
  });
  res.sendStatus(200);
};

export const deletarAgendamento = async (req: Request, res: Response) => {
  await AgendamentoModelo.destroy({
    where: { id_agendamento: req.params.id },
  });
  res.sendStatus(200);
};

export const buscarAgendamentosPorUsuario = async (
  req: Request,
  res: Response
) => {
  try {
    const usuarioAutenticado = req.usuarioId;
    const idSolicitado = parseInt(req.params.id, 10);

    if (!usuarioAutenticado) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }
    if (usuarioAutenticado !== idSolicitado) {
      console.log("ID autenticado:", usuarioAutenticado);
      console.log("ID solicitado:", idSolicitado);
      return res.status(403).json({
        message: "Você não tem permissão para acessar estes agendamentos",
      });
    }

    const agendamentos = await AgendamentoModelo.findAll({
      where: { id_usuario: idSolicitado },
      include: [
        {
          model: PetModelo,
          as: "pet",
          attributes: ["nome", "especie"],
        },
        {
          model: ServicoModelo,
          as: "servico",
          attributes: ["nome", "preco"],
        },
      ],
      order: [
        ["data", "ASC"],
        ["horario", "ASC"],
      ],
      logging: console.log,
    });

    return res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return res.status(500).json({
      message: "Erro ao buscar agendamentos",
    });
  }
};

export const cancelarAgendamento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const agendamento = await AgendamentoModelo.findByPk(id);

    if (!agendamento) {
      return res.status(404).json({
        message: "Agendamento não encontrado",
      });
    }

    await agendamento.update({ status: "cancelado" });

    return res.status(200).json({
      message: "Agendamento cancelado com sucesso",
      agendamento,
    });
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    return res.status(500).json({
      message: "Erro ao cancelar agendamento",
    });
  }
};
