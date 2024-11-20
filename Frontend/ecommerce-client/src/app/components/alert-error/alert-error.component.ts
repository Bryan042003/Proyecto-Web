import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  standalone: true,
  imports: [],
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.scss'
})
export class AlertErrorComponent {

@Input() 
message: string | undefined;

}
