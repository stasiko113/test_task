import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './Users.model';

interface AddClickDataAttributes {
    id: number;
    event_id: number;
    created_at: Date;
    user_id: number;
    source: string;
    count?: any;
  }
  
export interface AddClickDataInput extends Optional<AddClickDataAttributes, 'id'> {}
export interface AddClickDataOutput extends Required<AddClickDataAttributes> {}  

class AddClickData extends Model<AddClickDataAttributes> implements AddClickDataAttributes {
    public id!: number;
    public event_id!: number;
    public created_at!: Date;
    public user_id!: number;
    public source!: string;
    count: any;
}
  
AddClickData.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeConnection,
      tableName: 'AdClickData',
      timestamps: false,
    }
  );

  AddClickData.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });

  export default AddClickData;