import sequelize, { Op } from "sequelize";
import AddClickData from "../db/models/AddClickData.model";
import User from "../db/models/Users.model";
import PaymentData from "../db/models/PaymentData.model";
import { getBetweenDate, getRenevations } from "../services/AddClickData.service";
import { getInstallsBetweenDate, getReturnsBetweenDate } from "../services/User.service";
import { calculateConvBetweenDates } from "../services/PaymentData.service";
import { sourceTableBuilder } from "../utils/SourceCalculate/source.utils";

export const getTableByDate = async (startDate: Date, endDate: Date, page: number) => {
    try {
        const { sources, sourceUsersIds, uniqueSourse } = await getBetweenDate(startDate, endDate, page);;
        const installs = await getInstallsBetweenDate(startDate, endDate, sourceUsersIds, uniqueSourse);
        const returns = await getReturnsBetweenDate(startDate, endDate, sourceUsersIds, uniqueSourse);
        const renevation7d = await getRenevations(startDate, endDate, sourceUsersIds, 7, uniqueSourse);
        const renevation14d = await getRenevations(startDate, endDate, sourceUsersIds, 14, uniqueSourse);
        const conv = await calculateConvBetweenDates(startDate, endDate, sourceUsersIds, installs);
        
        const sourceBuild = sourceTableBuilder(uniqueSourse, installs, returns, renevation7d, renevation14d, conv);
        return sourceBuild;
    } catch (e) {
        console.log(e);
    }
}