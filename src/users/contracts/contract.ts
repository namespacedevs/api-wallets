export interface Contract{
    erros: any[];
    validate(entity: any): boolean;
    
}