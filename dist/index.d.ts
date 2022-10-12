declare type SimplicityData = {
    term: string;
    program: string;
};
export declare const programCompiler: (input: string, programList: SimplicityData[]) => string;
export {};
