import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './Users.model';

interface PaymentDataAttributes {
    user_id: number;
    create_at: Date;
    transaction_id: number;
    price: string;
    currency: string;
  }
  
// export interface AddClickDataInput extends Optional<AddClickDataAttributes, 'id'> {}
export interface PaymentDataAttributesOutput extends Required<PaymentDataAttributes> {}  

class PaymentData extends Model<PaymentDataAttributes> implements PaymentDataAttributes {
    public user_id!: number;
    public create_at!: Date;
    public transaction_id!: number;
    public price!: string;
    public currency!: string;
    User: any;
    count: any;
  }
  
  PaymentData.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      create_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeConnection,
      tableName: 'PaymentData',
      timestamps: false,
    }
  );

  PaymentData.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });

  export default PaymentData;