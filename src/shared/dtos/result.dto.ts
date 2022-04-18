export class Result {
    constructor(
        public message: string,
        public success: boolean,
        public resultData: any,
        public errors: any,
    ) { 
    }
}
