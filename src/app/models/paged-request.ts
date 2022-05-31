
export interface IPagedResult<T> {
    result?: Array<T>;
    pageNumber?: number;
    pageSize?: number;
    totalCount?: number;
    totalPages?: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
}
export class PagedResult<T>{
    Result: Array<T>;
    PageNumber: number;
    PageSize: number;
    TotalCount: number;
    FilterData: number;
    TotalPages: number;
    HasPrevious: boolean;
    HasNext: boolean;
    LengthPages: [[],[]]
}
export enum SortOrder {
    Ascending,
    Descending
}
export interface IPagedRequest {
    PageNumber: number;
    PageSize: number;
    SortBy?: string;
    SortOrder?: SortOrder;
    Filter?: string;
}
export class PagedRequest implements IPagedRequest {
    PageNumber: number;
    PageSize: number;
    SortBy: string;
    SortOrder: SortOrder;
    Filter?: string;
}
