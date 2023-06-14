import { Op } from "sequelize"
import sequelize from "sequelize"
import User from "../db/models/Users.model"

export const getInstallsBetweenDate = async (startDate: Date, endDate: Date, sourceUsersIds: number[], uniqueSourse: string[]) => {
    let installs = await User.findAll({
        where: { 
            first_visit: { [Op.between]: [startDate , endDate] },
            from_source: uniqueSourse,
        },
        attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count'], 'from_source'],
        group: ['from_source'],
        raw: true 
    })
    return installs;
}

export const getReturnsBetweenDate = async (startDate: Date, endDate: Date, sourceUsersIds: number[], uniqueSourse: string[]) => {
    const returns = await User.findAll({
        where: { 
            first_visit: { [Op.notBetween]: [startDate , endDate] },
            from_source: uniqueSourse, 
        },
        attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count'], 'from_source'],
        group: ['from_source'],
    })
    return returns;
}