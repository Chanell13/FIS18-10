import { Component, OnInit, Input } from '@angular/core';
import { Contrato } from '../contrato';
import { ContratoService } from '../contrato.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-editable-contrato]',
  templateUrl: './editable-contrato.component.html',
  styleUrls: ['./editable-contrato.component.css']
})
export class EditableContratoComponent implements OnInit {
  constructor(private contratoService: ContratoService) { }

  @Input() contrato: Contrato;

  editing = false;
  oldNumber ;
  deleting = false;

  // tslint:disable-next-line:member-ordering
  title = '';
  msg = true;
  onEdit(): void {
    this.editing = !this.editing;

    if (this.editing) {
      this.oldNumber = (this.contrato.NoCandidato);
    } else {

      // update
      this.contratoService.updateContrato2(this.oldNumber, this.contrato).subscribe(
        res => {
          alert(res);
        },
        err => {
          if (err.status === 422) {
            alert(err);
          } else {
            console.log('Algo salió mal. Por favor, póngase en contacto con el administrador.');
          }
        }
      );
      setTimeout(() => { location.reload(); }, 1500);
    }

  }

  onPrint(): void {
    console.log(this.contrato.NoCandidato);
  }
  onDelete(): void {
    this.deleting = !this.deleting;

    this.contratoService.deleteContrato2(this.contrato).subscribe();
    setTimeout(() => { location.reload(); }, 1200);
    //  refresca la pagina completa
  }

  ngOnInit() {
  }
}
