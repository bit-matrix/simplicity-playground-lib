export declare const makeid: (length: number) => string;
export declare const termChecker: (termName: string) => "drop" | "unit" | "iden" | "injl" | "injr" | "take" | "comp" | "case" | "pair";
export declare const termArgumenetCount: (termName: string) => 1 | 2 | 0;
