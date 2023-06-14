import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface EventsMockAttributes {
  user_id: number;
  data: string;
  event_type: number;
  create_time: Date;
}
// export interface IngredientInput extends Optional<IngredientEventsMockAttributes, 'id' | 'slug'> {}
export interface IngredientOuput extends Required<EventsMockAttributes> {}  

class EventsMock extends Model<EventsMockAttributes> implements EventsMockAttributes {
    public user_id!: number
    public data!: string
    public event_type!: number
    public create_time!: Date
  }

EventsMock.init({
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    event_type: {
      type: DataTypes.INTEGER
    },
    create_time: {
      type: DataTypes.DATE
    }
  }, {
    sequelize: sequelizeConnection,
    tableName: 'EventsMock',
    timestamps: false,
  })
  
  export default EventsMock