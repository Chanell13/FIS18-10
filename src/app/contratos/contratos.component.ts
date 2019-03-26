import { Component, OnInit } from '@angular/core';
import { Contrato } from '../contrato';
import { ContratoService } from '../contrato.service';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  constructor(private contratoService: ContratoService) { }
  myLocalStorage = window.localStorage;

  key: string;
  mostrarApiKey = true;
  contratos: Contrato[];
  selectedContrato: Contrato;
  newContrato: Contrato = {
    NoContrato: null,
    Nombre: null,
    Apellido: null,
    Puesto: null,
    Categoria: null,
    TipoContrato: null,
    Sueldo: null,
    NoCandidato: null,
    FechaInicio: null,
    FechaFin: null

  };
  // tslint:disable-next-line:member-ordering
  title = '';
  msg = '';

  getContratos(): void {
    // if (this.key != null) { this.mostrarApiKey = false; }
    this.contratoService.getContratos(this.contratoService.key)
      .subscribe((contratos) => this.contratos = contratos);
  }

  addContrato(): void {
    this.contratoService.addContrato(this.newContrato, this.contratoService.key)
      .subscribe(() => {
        this.contratos.push(this.newContrato);
        this.newContrato = {
          NoContrato: null,
          Nombre: null,
          Apellido: null,
          Puesto: null,
          Categoria: null,
          TipoContrato: null,
          Sueldo: null,
          NoCandidato: null,
          FechaInicio: null,
          FechaFin: null

        };
      });
  }
  onEdit(contrato: Contrato): void {
    this.selectedContrato = contrato;
  }

  onDelete(contrato: Contrato): void {
    this.contratoService.deleteContrato(contrato, this.contratoService.key).subscribe();
    this.contratos = this.contratos.filter(h => h !== contrato);
  }

  validateKey() {
    this.mostrarApiKey = !this.mostrarApiKey;
    // this.contratoService.nct = this.contrato.NoCandidato;
    //  alert(this.contratoService.nct);
    this.contratoService.key = this.key;
    // this.contratoService.setApikey(this.contratoService.key);

    this.myLocalStorage.setItem('apikey', JSON.stringify({ 'dummy': 'this.key' }));

    alert(this.contratoService.key);
    this.getContratos();
  }

  IntroduceApiKey() {
    this.mostrarApiKey = !this.mostrarApiKey;
  }

  ngOnInit() {
    // this.key = this.contratoService.getApikey();
    this.getContratos();
  }
}

