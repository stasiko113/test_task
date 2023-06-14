export const countRepair = (arr: any[]) => {
    arr = arr.map(elem => {
        const stringElem = JSON.stringify(elem);
        return JSON.parse(stringElem);
    });
    return arr;
}