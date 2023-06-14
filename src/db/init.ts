import AddClickData from './models/AddClickData.model';
import EventsMock from './models/EventsMock.model'
import PaymentData from './models/PaymentData.model';
import Users from './models/Users.model'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    EventsMock.sync({ alter: isDev });
    Users.sync({ alter: isDev });
    PaymentData.sync({ alter: isDev });
    AddClickData.sync({ alter: isDev });
}
export default dbInit 