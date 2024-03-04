import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, take, throwError } from 'rxjs';
import { NotificationMessageService } from '../notifications/notification.service';
import { IRestResponse } from '@shared/interfaces/IRestResponse.interface';

@Injectable()
export abstract class ApiService {
     constructor(
          protected http: HttpClient,
          protected notificationService: NotificationMessageService
     ) { }

     protected get<T>(url: string): Observable<T> {
          return this.http.get<T>(url).pipe(
               shareReplay(1),
               take(1),
               catchError((error: HttpErrorResponse) => {
                    this.notificationService.error('errorGetData');
                    return throwError(() => error);
               })
          );
     }

     protected post<T>(url: string, requestData: unknown): Observable<T> {
          return this.http.post<T>(url, requestData).pipe(
               shareReplay(1),
               catchError((error: HttpErrorResponse) => {
                    this.notificationService.error('errorGetData');
                    return throwError(() => error);
               })
          );
     }

     protected delete(url: string): Observable<IRestResponse> {
          return this.http.delete<IRestResponse>(url).pipe(
               shareReplay(1),
               catchError((error: HttpErrorResponse) => {
                    this.notificationService.error('errorGetData');
                    return throwError(() => error);
               })
          );
     }
}
