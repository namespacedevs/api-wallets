import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { Contract } from 'src/users/contracts/contract';
  
  
  @Injectable()
  export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: Contract) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const body = context.switchToHttp().getRequest().body;
      const valid = this.contract.validate(body);

  
      return next.handle();
    }
  }