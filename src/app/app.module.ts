import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContratosComponent } from './contratos/contratos.component';
import { EditableContratoComponent } from './editable-contrato/editable-contrato.component';
import { EliminableContratoComponent } from './eliminable-contrato/eliminable-contrato.component';
import { ImprimirComponent } from './imprimir/imprimir.component';

@NgModule({
  declarations: [

    ContratosComponent,
    AppComponent,
    EditableContratoComponent,
    EliminableContratoComponent,
    ImprimirComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
