type JpostaConfig = {
    host: string;
};
export type Address = {
    pref: string;
    prefNum: number;
    city: string;
    area?: string;
};
export declare const getAddress: (zipCode: string) => Promise<Address | null>;
export declare const configureJposta: (config: Partial<JpostaConfig>) => void;
export declare const getPrefs: () => string[];
export {};
