export declare const core: {
    unit: (a: string) => string;
    iden: (a: string) => string;
    injl: (a: string, term: any) => string;
    injr: (a: string, term: any) => string;
    take: (a: string, b: string, term: any) => any;
    drop: (a: string, b: string, term: any) => any;
    comp: (a: string, term: any, term2: any) => any;
    pair: (a: string, term: any, term2: any) => string;
    case: (a: string, c: string, term: any, term2: any) => any;
};
