import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Result } from '../../shared/dtos/result.dto';
import { Observable } from 'rxjs';
import { ValidatorInterface } from '../interfaces/validator.interface'

  
  
@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public validatorInterface: ValidatorInterface) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const body = context.switchToHttp().getRequest().body;
    const valid = this.validatorInterface.validate(body);
    if (!valid) {
      throw new HttpException(
        new Result('Algo saiu errado!', false, null, this.validatorInterface.errors),
        HttpStatus.BAD_REQUEST,
      );
    }
    return next.handle();
  }
}