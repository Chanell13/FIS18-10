import { Component, OnInit, Input } from '@angular/core';
import { Contrato } from '../contrato';
import { ContratoService } from '../contrato.service';
import { Router } from '@angular/router';
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-editable-contrato]',
  templateUrl: './editable-contrato.component.html',
  styleUrls: ['./editable-contrato.component.css']
})
export class EditableContratoComponent implements OnInit {

  constructor(private contratoService: ContratoService, private router: Router) { }

  // tslint:disable-next-line:member-ordering
  @Input() contrato: Contrato;

  // tslint:disable-next-line:member-ordering
  editing = false;
  // tslint:disable-next-line:member-ordering
  oldNumber;
  // tslint:disable-next-line:member-ordering
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
    this.contratoService.nct = this.contrato.NoCandidato;
    alert(this.contratoService.nct);
    // this.contrato.NoContrato
    this.router.navigateByUrl('/detalles');
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
