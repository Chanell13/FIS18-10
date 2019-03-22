import { Component, OnInit, Input } from '@angular/core';
import { ContratoService } from '../contrato.service';
import { Contrato } from '../contrato';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})
export class ImprimirComponent implements OnInit {
  @Input() NoContrato: Number;

  constructor(private contratoService: ContratoService) { }
  contrato: any;
  ngOnInit() {

    this.contratoService.getContrato2(this.contratoService.nct).subscribe((contrato) => {
      this.contrato = contrato;
    });
    console.log(Contrato);
  }

}
