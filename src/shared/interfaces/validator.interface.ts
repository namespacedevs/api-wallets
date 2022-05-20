export interface ValidatorInterface {
    errors: any[];
    validate(entity: any): boolean;
}
