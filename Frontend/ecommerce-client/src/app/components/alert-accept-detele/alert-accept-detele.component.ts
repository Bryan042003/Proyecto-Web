import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert-accept-detele',
  standalone: true,
  imports: [],
  templateUrl: './alert-accept-detele.component.html',
  styleUrl: './alert-accept-detele.component.scss'
})
export class AlertAcceptDeteleComponent {

  @Output() cancel = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<boolean>();

  cancelar() {
    console.log('El usuario canceló la eliminación');
    this.cancel.emit(true); // Emitir el evento al componente padre
  }

  eliminar() {
    console.log('El usuario confirmó la eliminación');
    this.confirm.emit(true); // Emitir el evento al componente padre
  }

}
