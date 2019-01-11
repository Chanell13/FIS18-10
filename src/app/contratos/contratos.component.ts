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
    this.contratoService.getContratos()
      .subscribe((contratos) => this.contratos = contratos);
  }

  addContrato(): void {
    this.contratoService.addContrato(this.newContrato)
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
    this.contratoService.deleteContrato(contrato).subscribe();
  }

  ngOnInit() {
    this.getContratos();
  }
}

