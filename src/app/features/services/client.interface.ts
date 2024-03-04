import { IRestResponse } from '@shared/interfaces/IRestResponse.interface';

export interface IClientsApi extends IRestResponse {
  data: IClient[];
}

export interface IClientDetailsApi extends IRestResponse {
  data: IClient;
}

export interface IClient {
  id: number;
  clientNr: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  contact: string,
  consumption_standard: string,
  notices: string,
}

export interface IClientOrdersApi extends IRestResponse {
  data: IClientOrders[];
}

export interface IClientOrders {
  id: number;
  assortId: number,
  clientId: number,
  clientNr: string,
  deliveryDate: string,
  invoiceNr: string,
  list: string[],
  orderDate: string,
  orderId: number
  status: string,
  statusId: number,
}

