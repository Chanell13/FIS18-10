import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContratosComponent } from './contratos/contratos.component';
import { EditableContratoComponent } from './editable-contrato/editable-contrato.component';
import { EliminableContratoComponent } from './eliminable-contrato/eliminable-contrato.component';
import { ImprimirComponent } from './imprimir/imprimir.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: 'formulario', pathMatch: 'full'
  },
  {
    path: 'formulario', component: ContratosComponent
  },
  {
    path: 'detalles', component: ImprimirComponent
  }
];


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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
