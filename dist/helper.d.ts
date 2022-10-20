export declare const makeid: (length: number) => string;
export declare const termChecker: (termName: string) => "drop" | "unit" | "iden" | "injl" | "injr" | "take" | "comp" | "case" | "pair";
export declare const termArgumenetCount: (termName: string) => 1 | 0 | 2;
export declare type SimplicityData = {
    term: string;
    program: string;
};
export declare const programConverter: (values: SimplicityData[]) => SimplicityData[];
export declare const isProductType: (text: string) => boolean;
