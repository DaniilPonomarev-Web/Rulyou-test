import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, { success: true; result: T }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ success: true; result: T }> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        result: data,
      })),
    );
  }
}
