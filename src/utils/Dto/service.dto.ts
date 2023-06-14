export interface convDto {
    count: number;
    from_source: string;
    conv: number;
}

export interface paginationDto {
    limit: number;
    offset: number;
}

export interface installMapDto {
    count?: number;
    from_source: number;
}