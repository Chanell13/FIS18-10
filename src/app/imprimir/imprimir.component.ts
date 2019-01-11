import { Component, OnInit, Input } from '@angular/core';
import { ContratoService } from '../contrato.service';
import { Contrato } from '../contrato';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {

  constructor(private contratoService: ContratoService) { }

  @Input() NoContrato: string;

  contrato: Contrato;
  ngOnInit() {
    this.contrato = this.contratoService.getContrato(this.NoContrato);
    console.log(Contrato);
  }

}
