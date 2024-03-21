# Solutions

A few solutions for Angular...

## Abstract Class BaseComponent

Routable, feature components needs data for themselves or child components from services that uses HttpClient. 
These data should be unsubscribed as they're observables althought once the Http request completes it unsubscribes automatically.

Code can be placed in one Abstract BaseComponent and used as extension for feature component 
to avoid repeating. In abstract we have destruct$ as Subject which is destroyed when component is closed.
```
export abstract class BaseComponent implements OnDestroy {
     protected destruct$: Subject<boolean> = new Subject<boolean>();
     public ngOnDestroy(): void {
          this.destruct$.next(true);
          this.destruct$.unsubscribe();
     }
}

export class ClientDetailsPageComponent extends BaseComponent  {
....
          this.clientDetails$
               .pipe(
                    tap((data: IClientDetails) => {
                         this.clientData = data;
                    }),
                    takeUntil(this.destruct$)
               )
               .subscribe();
```
			   
## Abstract Class BaseFormComponent

Components with forms should be treated as dump components. With data provided by parent and emit 2 data:
 - isFormValid - as boolean, as name suggest
 - formChange - data form
This class is used as extension in parent component that includes form component.
Code responsible for form data is placed in one component, for better controll and to avoid to repeat code. 
```
export abstract class BaseFormComponent extends BaseComponent {
     abstract form: { form: FormGroup };
     abstract formData: EventEmitter<any>;
     abstract isFormValid: EventEmitter<boolean>;
     
     public checkFormAndEmit(): void {
          this.form.form.valueChanges
               .pipe(
                    tap(() => {
                         this.formData.emit(this.form.form.getRawValue());
                         this.isFormValid.emit(this.form.form.valid);
                    }),
                    takeUntil(this.destruct$)
               )
               .subscribe();
     }
	 
export class FabricFormComponent extends BaseFormComponent implements OnInit {

  @Output() public formData = new EventEmitter<Fabric>();
  @Output() public isFormValid = new EventEmitter<boolean>();

  public form: FabricForm = new FabricForm(this.fb);

  constructor(private fb: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.checkFormAndEmit();
  }
```
## Services - Abstract Class ApiService
  
  Thanks to this solution we have handled errors and shareReplay - 
  (rxjs operator can help us avoid duplicate HTTP requests in Angular applications)
  in one place. This class is used as extension for all services handling data. 
  ```
  @Injectable()
  export class StockService extends ApiService {.....

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
```

 ## Data Facade Class
 Separates Component from data layer.
 We don't need to import services to component, we just take data.
 
```	 
    //These imports were moved to home facade
    // import { StockService } from '@features/stock-page/services/stock.service';
    // import { OrdersService } from '@features/orders-page/services/orders.service';
    // import { EventsService } from '@features/events-page/services/events.service';
 
export class HomePageComponent {
  public lastEvents$: Observable<IEvent[]> = this.homeDataFacade.lastEvents$;
  public lastOrders$: Observable<ILastOrder[]> | null =     this.homeDataFacade.lastOrders$;
  public unsentOrders$: Observable<IOrdersUnsent[]> | null =     this.homeDataFacade.unsentOrders$;
  public ordersToTake$: Observable<IOrder[]> =    this.homeDataFacade.ordersToTake$;
  public lackOfAssorts$: Observable<ILackOfArticles[]> | null =     this.homeDataFacade.lackOfArticles$;
  public sentToProduction$: Observable<number> | null =     this.homeDataFacade.sentToProduction$;
  public mostPopularAssorts$: Observable<IMostPopularAssort[]> =     this.homeDataFacade.mostPopularAssorts$;
  public mostPopularFabrics$: Observable<IMostPopularFabric[]> =     this.homeDataFacade.mostPopularFabrics$;


  constructor(
    private router: Router,
    private homeDataFacade: HomeDataFacade 
    //These services were moved to home facade 
    // private stockService: StockService,
    // private ordersService: OrdersService,
    // private eventsService: EventsService
) {
  }
}
```
  ## Facade Class  
  ```
  @Injectable()
export class HomeDataFacade extends BaseComponent {
     public lastEvents$: Observable<IEvent[]> = this.eventsService.getLastEvents();
     public lastOrders$: Observable<ILastOrder[]> = this.ordersService.getLastOrders();
     public unsentOrders$: Observable<IOrdersUnsent[]> = this.ordersService.getOrdersUnsent();
     public ordersToTake$: Observable<IOrder[]> = this.ordersService.getOrdersToTake();
     public lackOfArticles$: Observable<ILackOfArticles[]> = this.stockService.getLackOfArticles();
     public sentToProduction$: Observable<number> = this.ordersService.getSentToProduction();
     public mostPopularAssorts$: Observable<IMostPopularAssort[]> = this.stockService.getMostPopularAssorts();
     public mostPopularFabrics$: Observable<IMostPopularFabric[]> = this.stockService.getMostPopularFabrics();

     constructor(
          private stockService: StockService,
          private ordersService: OrdersService,
          private eventsService: EventsService
     ) {
          super();
     }
}
```

## Common Unsubscibe Method for Feture Components
Treating Feature Components as MVC it means we collect data and provide them to child components, modals..
All Observables needs to unsubsribe in case we don't provide them as Observables and using async Pipe.
So if we don't want to not repeat code, the best solution is to use Abstract Class Base Components to extends Feature Component and using Subject and OnDestroy Method with following code:

```
export abstract class BaseComponent implements OnDestroy {
     protected destruct$: Subject<boolean> = new Subject<boolean>();
     public ngOnDestroy(): void {
          this.destruct$.next(true);
          this.destruct$.unsubscribe();
     }
}
```

In Component we can use destruct$ to unsubscibe Observable:
``` 
  export class ClientPageComponent extends BaseComponent { ...

  .pipe(
        takeUntil(this.destruct$)
      ).subscribe();
