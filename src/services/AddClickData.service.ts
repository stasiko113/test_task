import sequelize, { Op } from "sequelize";
import AddClickData from "../db/models/AddClickData.model";
import User from "../db/models/Users.model";
import { paginationDto } from "../utils/Dto/service.dto";
import { calculatePage } from "../utils/Pagination/pagination.utils";

export const getBetweenDate = async (startDate: Date, endDate: Date, page: number) => {
    const pagination = calculatePage(page);
    const sources = await AddClickData.findAll({
        where: {
            source:  { [Op.not]: null as unknown as string  },
            created_at: {[Op.between] : [startDate , endDate ]}
        },
        attributes: ['user_id', 'id', 'source'],
        ...pagination,
    });

    const uniqueSourse = Array.from(new Set(sources.map(elem => elem.source)));
    const sourceUsersIds = Array.from(new Set(sources.map(elem => elem.user_id)));

    return { sources, sourceUsersIds, uniqueSourse };
}

export const getRenevations = async (startDate: Date, endDate: Date, sourceUsersIds: number[], period: number, uniqueSourse: string[]) => {
    return AddClickData.findAll({
        where: {
            source: uniqueSourse,
            created_at: { [Op.gte]: sequelize.fn(
                'DATE_ADD',
                sequelize.literal('User.first_visit'),
                sequelize.literal(`INTERVAL ${period} DAY`)
            ) }
        },
        include: [
            {
                model: User,
                attributes: [],
                where: {
                    first_visit: { [Op.between]: [startDate , endDate] },
                    user_id: sourceUsersIds,
                },
            }
        ],
        attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count'], 'source'],
        group: ['source']
    });
}
