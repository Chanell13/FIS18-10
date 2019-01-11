import { Component, OnInit, Output } from '@angular/core';
import { Contrato } from '../contrato';

@Component({
  selector: 'app-eliminable-contrato',
  templateUrl: './eliminable-contrato.component.html',
  styleUrls: ['./eliminable-contrato.component.css']
})
export class EliminableContratoComponent implements OnInit {

  @Output() contrato: Contrato;

  deleting = false;

  onDelete(): void {
      this.deleting = ! this.deleting;
  }

  constructor() { }

  ngOnInit() {
  }

}
