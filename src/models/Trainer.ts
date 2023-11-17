import sequelizeConnection from '@config/database';
import { DataTypes, Model } from 'sequelize';
// import TrainerPokemon from './TrainerPokemon';

class Trainer extends Model {
    public id!: number;
    public nickname!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Trainer.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        nickname: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 8,
            }
        },
    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        // paranoid: true,
    }
);



export default Trainer;
