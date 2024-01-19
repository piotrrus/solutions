import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { DirectivesModule } from './directives.module';
import { SimpleFilterModule } from '@shared/components/simple-filter/simple-search-filter.module';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
//import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { BootstrapModule } from './bootstrap.module';
import { AppConfigService } from '@core/app-config.service';
//import { TableHeaderComponent } from '@shared/components/table-header/table-header.component';
// import { NoDataMsgComponent } from '@shared/components/no-data-msg/no-data-msg.component';
import { DataTableModule } from './data-table/data-table.modules';

const MODULES = [
     CommonModule,
     MaterialModule,
     BootstrapModule,
     FormsModule,
     ReactiveFormsModule,
     DirectivesModule,
     NgxDatatableModule,
     NgxSpinnerModule,
     ToastrModule,
     DirectivesModule,
     SimpleFilterModule,
     DataTableModule
];
const COMPONENTS = [
     ConfirmDialogComponent,
];

@NgModule({
     declarations: [COMPONENTS],
     imports: [MODULES, ToastrModule.forRoot(),],
     exports: [MODULES, COMPONENTS, ToastrModule],
     providers: [AppConfigService]
})
export class SharedModule { }
