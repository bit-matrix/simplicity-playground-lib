export declare const core: {
    unit: (a: string) => string;
    iden: (a: string) => string;
    injl: (a: string) => string;
    injr: (a: string) => string;
    take: (termA: string, termB: string) => string;
    drop: (termA: string, termB: string) => string;
    comp: (term: any) => any;
    pair: (termA: any, termB: any) => string;
    case: (a: string, termA: any, termB?: any) => any;
};
