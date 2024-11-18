import { Component } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {




 openModal(){
  console.log("abre");
 }
}
