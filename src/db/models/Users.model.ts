import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface UsersAttributes {
    user_id: number;
    first_visit: Date;
    from_source: string;
    count?: number;
  }

export interface UsersOuput extends Required<UsersAttributes> {}  

class User extends Model<UsersAttributes> implements UsersAttributes {
  public user_id!: number;
  public first_visit!: Date;
  public from_source!: string;
  count: any;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    first_visit: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    from_source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'Users3',
    timestamps: false,
  }
);

export default User;