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
    this.contratoService.getContratos( this.contratoService.key)
      .subscribe((contratos) => this.contratos = contratos);
  }

  addContrato(): void {
    this.contratoService.addContrato(this.newContrato,  this.contratoService.key)
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
    this.contratos = this.contratos.filter(h => h !== contrato);
    this.contratoService.deleteContrato(contrato,  this.contratoService.key).subscribe();
  }

  validateKey() {
    this.mostrarApiKey = !this.mostrarApiKey;
    // this.contratoService.nct = this.contrato.NoCandidato;
    //  alert(this.contratoService.nct);
    this.contratoService.key = this.key;
    alert(  this.contratoService.key);
    this.getContratos();
  }

  IntroduceApiKey() {
    this.mostrarApiKey = !this.mostrarApiKey;
  }

  ngOnInit() {
    this.getContratos();
  }
}

