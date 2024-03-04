import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ApiService } from "@core/api/api.service";
import { HttpClient } from "@angular/common/http";
import { CLIENTS_API_PATHS } from "../enums/clients-paths.enum";
import { ORDERS_API_PATHS } from "@features/orders-page/enums/orders.paths.enum";
import {
  IClientMeasures,
  IClientMeasuresApi,
} from "../models/client-measures.interface";
import {
  IClientDetailsApi,
  IClientOrders,
  IClientOrdersApi,
} from "./client.interface";
import { IClientDetails } from "../models/client-details.interface";
import {
  IClientLastEvents,
  IClientLastEventsApi,
} from "./IClientLastEvents.interface";

@Injectable()
export class ClientDetailsService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http, notificationService);
  }

  public getMeasures(id: number): Observable<IClientMeasures> {
    return this.get<IClientMeasuresApi>(
      `${CLIENTS_API_PATHS.MEASURES}${id}`
    ).pipe(map((client) => client.data));
  }

  public getDetails(id: number): Observable<IClientDetails> {
    return this.get<IClientDetailsApi>(
      `${CLIENTS_API_PATHS.DETAILS_API}${id}`
    ).pipe(map((client) => client.data));
  }

  public getClientEvents(id: number): Observable<any> {
    return this.get(`events/client/${id}`);
  }

  public getClientLastEvents(id: number): Observable<IClientLastEvents> {
    return this.get<IClientLastEventsApi>(`events/client/last/${id}`).pipe(
      map((client) => client.data)
    );
  }

  public getClientOrders(id: number): Observable<IClientOrders[]> {
    return this.get<IClientOrdersApi>(
      `${ORDERS_API_PATHS.CLIENT_ORDERS}${id}`
    ).pipe(map((orders) => orders.data));
  }
}
