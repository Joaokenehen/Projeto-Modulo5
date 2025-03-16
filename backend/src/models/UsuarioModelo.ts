import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from 'bcryptjs'

class UsuarioModelo extends Model {
    public id_usuario!: number
    public nome!: string
    public email!: string
    public cpf!: string
    public senha!: string
    public dataNascimento!: Date
    public fotoDePerfil!: string
    public genero!: 'masculino' | 'feminino' | 'outro'
    public async verificarSenha(senhaInformada: string) {
        return await bcrypt.compare(senhaInformada, this.senha)
    }
}

UsuarioModelo.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            validarEmail: async (value: string) => {
                const emailFormato = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
                if (!emailFormato.test(value)) {
                    throw new Error('Email inválido, tente novamente')
                }
            }
        }
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fotoDePerfil: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genero: {
        type: DataTypes.ENUM('masculino', 'feminino', 'outro'),
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'UsuarioModelo',
    tableName: 'usuarios',
    timestamps: false,
    hooks: {
        beforeCreate: async (usuario: UsuarioModelo) => {
            usuario.senha = await bcrypt.hash(usuario.senha, 10)
    
},
        beforeUpdate: async (usuario: UsuarioModelo) => {
            if
                (usuario.changed('senha')) {
                usuario.senha = await bcrypt.hash(usuario.senha, 10)
            }
        }
    }
}
)

export default UsuarioModelo