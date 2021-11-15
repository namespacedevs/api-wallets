export interface Contract{
    errors: any[];
    validate(entity: any): boolean;
    
}