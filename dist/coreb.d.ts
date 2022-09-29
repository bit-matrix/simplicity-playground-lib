export declare const core: {
    unit: (a: string) => string;
    iden: (a: string) => string;
    injl: (term: string) => string;
    injr: (term: string) => string;
    take: (termA: string, termB: string) => string;
    drop: (termA: string, termB: string) => string;
    comp: (a: string, term: any) => any;
    pair: (termA: any, termB: any) => string;
    case_: (a: string, c: string, termA: any, termB: any) => any;
};
