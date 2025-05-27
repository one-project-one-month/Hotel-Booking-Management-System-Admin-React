export interface paginationType {
    prevClick:() => void;
    pages:number[];
    currentPage:number;
    nextClick:() => void;
    pageClick:(p:number) =>void;
}
