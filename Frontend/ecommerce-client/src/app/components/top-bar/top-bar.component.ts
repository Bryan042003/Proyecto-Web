import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { Notification } from '../../models/notification.model';
import { NotificationService } from '../../services/Notification.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  notifications: Notification[]=[];
  constructor(private _notificationService: NotificationService){}


  ngOnInit(): void {
   
    this.loadNotification();
  }

  loadNotification(){
    this._notificationService.getNotifications()
      .subscribe({
        next: (result: any) => {
          this.notifications = result.notifications;
          console.log(this.notifications);
        },
        error: (error: any) => {
          console.error('Error al obtener notificaciones:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }

 openModal(){
  console.log("abre");
 }
}
