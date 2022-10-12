export declare const corec: {
    unit: (a: string) => string;
    iden: (a: string) => string;
    injl: (a: string, term: any) => any;
    injr: (a: string, term: any) => any;
    take: (input: string, term: any) => any;
    drop: (input: string, term: any) => any;
    comp: (input: string, termA: any, termB: any) => any;
    pair: (input: string, termA: any, termB: any) => any;
    case: (input: string, termA: any, termB: any) => any;
};
