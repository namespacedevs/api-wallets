import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Interface } from '../interfaces/interface'
import { Result } from '../../shared/dtos/result.dto';
import { Observable } from 'rxjs';
  
  
@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Interface) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const body = context.switchToHttp().getRequest().body;
    const valid = this.contract.validate(body);
    if (!valid) {
      throw new HttpException(
        new Result('Algo saiu errado!', false, null, this.contract.errors),
        HttpStatus.BAD_REQUEST,
      );
    }
    return next.handle();
  }
}