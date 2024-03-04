import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/modules/shared.modules";
import { ClientDetailsPageRoutingModule } from "./client-details-page-routing.module";
import { ClientDetailsPageComponent } from "./containers/client-details-page/client-details-page.component";
import { ClientDetailsService } from "./services/client-details-service";

const COMPONENTS = [ClientDetailsPageComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [SharedModule, ClientDetailsPageRoutingModule],
  providers: [ClientDetailsService],
})
export class ClientDetailsPageModule {}
