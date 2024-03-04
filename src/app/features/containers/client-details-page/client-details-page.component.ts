import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IClientDetails} from '@features/clients-page/models/client-details.interface';
import { ClientDetailsService } from '@features/clients-page/services/client-details-service';
import { IClientOrders } from '@features/clients-page/services/client.interface';
import { BaseComponent } from '@shared/components/base.component';

@Component({
     selector: 'app-client-page',
     templateUrl: './client-details-page.component.html',
     styleUrls: ['./client-details-page.component.scss'],
})
export class ClientDetailsPageComponent extends BaseComponent implements OnInit {
     public clientDetails$: Observable<IClientDetails> | null = null;
     public clientOrders$?: Observable<IClientOrders[]>;

     constructor(
          private clientDetailsService: ClientDetailsService,
          private route: ActivatedRoute,
     ) {
          super();
     }

     public ngOnInit(): void {
          this.getClientData();
     }

     private getClientData() {
          const id = Number(this.route.snapshot.paramMap.get('id'));
          this.clientDetails$ = this.clientDetailsService.getDetails(id);
          this.clientOrders$ = this.clientDetailsService.getClientOrders(id);
     }

}
