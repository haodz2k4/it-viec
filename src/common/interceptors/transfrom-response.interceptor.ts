import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE } from '../../decorator/transfrom-response.decorate';
export interface Response<T> {
  data: T;
  message: string;
  statusCode: number
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {

    constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({
        message: this.reflector.get(RESPONSE_MESSAGE, context.getHandler()) || "success",
        statusCode: context.switchToHttp().getResponse().statusCode,
        data: data
    })));
  }
}