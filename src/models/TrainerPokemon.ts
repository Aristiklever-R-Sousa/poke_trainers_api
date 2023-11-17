import sequelizeConnection from '@config/database';
import { DataTypes, Model } from 'sequelize';
import Trainer from './Trainer';

class TrainerPokemon extends Model {
    public id!: number;
    // public trainer_id!: number;
    public pokemonId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TrainerPokemon.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        // trainer_id: {
        //     type: DataTypes.BIGINT,
        //     // unique: true,
        //     allowNull: false,
        //     // references: {
        //     //     model: Trainer,
        //     //     key: 'id',
        //     // }
        // },
        pokemonId: {
            type: DataTypes.BIGINT,
            allowNull: false,

        },
    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        // paranoid: true,
    }
);

TrainerPokemon.belongsTo(Trainer);
Trainer.hasMany(TrainerPokemon);

export default TrainerPokemon;
