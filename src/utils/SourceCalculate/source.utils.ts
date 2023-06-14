import AddClickData from "../../db/models/AddClickData.model";
import User from "../../db/models/Users.model"
import { convDto } from "../Dto/service.dto";

export const sourceTableBuilder = async (
    sourceList: string[], 
    installs: User[],
    returns: User[], 
    renevations7d: AddClickData[], 
    renevations14d: AddClickData[],
    convs: convDto[]
) => {
    const installsMap: any = {};
    const returnsMap: any = {};
    const renevations7dMap: any = {};
    const renevations14dMap: any = {};
    const convsMap: any = {};
    
    installs.forEach(elem => {
      installsMap[elem.from_source] = elem;
    });

    returns.forEach(elem => {
      returnsMap[elem.from_source] = elem.dataValues;
    });
    
    renevations7d.forEach(elem => {
      renevations7dMap[elem.source] = elem.dataValues;
    });
    
    renevations14d.forEach(elem => {
      renevations14dMap[elem.source] = elem.dataValues;
    });
    
    convs.forEach(elem => {
      convsMap[elem.from_source] = elem;
    });
    
    const result = new Array(sourceList.length);
    
    sourceList.forEach((source, index) => {
      const install = installsMap[source];
      const returnUser = returnsMap[source];
      const renevation7d = renevations7dMap[source];
      const renevation14d = renevations14dMap[source];
      const conv = convsMap[source];
    
      result[index] = {
        source,
        install: install ? install.count : 0,
        returnUser: returnUser ? returnUser.count : 0,
        renevation7d: renevation7d ? renevation7d.count : 0,
        renevation14d: renevation14d ? renevation14d.count : 0,
        conv: conv ? conv.conv : 0,
      };
    });
    
    return result;
}
