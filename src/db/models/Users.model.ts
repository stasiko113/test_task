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
    indexes:[
      {
        unique: false,
        using: 'BTREE',
        fields:['first_visit']
      },
      {
        unique: false,
        using: 'BTREE',
        fields:['user_id']
      },
      {
        unique: false,
        using: 'FULLTEXT',
        fields:['from_source']
      },
    ],
    sequelize: sequelizeConnection,
    tableName: 'Users',
    timestamps: false,
  }
);

export default User;