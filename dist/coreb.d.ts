export declare const core: {
    unit: (a: string) => string;
    iden: (a: string) => string;
    injl: (a: string) => string;
    injr: (a: string) => string;
    take: (input: string) => string;
    drop: (input: string) => string;
    comp: (term: any) => any;
    pair: (input: string, termA: any, termB: any) => string;
    case: (a: string, termA: any, termB: any) => any;
};
