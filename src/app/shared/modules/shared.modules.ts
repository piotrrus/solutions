import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { ToastrModule } from 'ngx-toastr';
import { BootstrapModule } from './bootstrap.module';


const MODULES = [
     CommonModule,
     MaterialModule,
     BootstrapModule,
     FormsModule,
     ReactiveFormsModule,
     ToastrModule,
];


@NgModule({
     declarations: [COMPONENTS],
     imports: [MODULES, ToastrModule.forRoot(),],
     exports: [MODULES, COMPONENTS, ToastrModule],
     providers: [AppConfigService]
})
export class SharedModule { }
