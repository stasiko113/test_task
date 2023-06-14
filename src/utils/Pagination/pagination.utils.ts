const pageSize = 100;

export const calculatePage = (page: number) => {
    const offset = pageSize * page;
    return { offset, limit: pageSize };
}