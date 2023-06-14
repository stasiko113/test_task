import { Op } from "sequelize"
import sequelize from "sequelize"
import PaymentData from "../db/models/PaymentData.model"
import User from "../db/models/Users.model"
import { convDto } from "../utils/Dto/service.dto"
import { countRepair } from "../utils/ArrayHelper/array.utils"

export const calculateConvBetweenDates = async (
    startDate: Date,
    endDate: Date, 
    sourceUsersIds: number[], 
    installs: User[]
): Promise<convDto[]> => {
    let valideUsers: any[] = await PaymentData.findAll({
        include: [{ 
            model: User,
            attributes: ['user_id', 'from_source'],
            where: { first_visit: { [Op.between]: [startDate , endDate] }, user_id: sourceUsersIds },
        }],
        attributes: [[sequelize.fn('COUNT', sequelize.col('User.user_id')), 'count'], 'User.from_source'],
        group: ['User.user_id', 'User.from_source'], 
    })

    const calculateArr = [];

    installs.map(install => {
        const valideUser = valideUsers.find(user => user.User.from_source === install.from_source);
        if (valideUser) {
            calculateArr.push({ ...install, conv: ((valideUser.dataValues.count || 0) / install.count) });
        } else {
            calculateArr.push({ ...install, conv: 0 });
        }
    })

    return valideUsers;
}