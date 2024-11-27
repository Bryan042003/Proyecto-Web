import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/notification.model';
import { NotificationService } from '../../services/Notification.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  notifications: Notification[]=[];
  constructor(private _notificationService: NotificationService){}


  ngOnInit(): void {
   
    this.loadNotification();
  }

  loadNotification() {
    this._notificationService.getNotifications()
      .subscribe({
        next: (result:Notification[] ) => {
          this.notifications = result;
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

  deleteNotification(id: number){
    console.log(`este es el id`,id);
    this._notificationService.deleteNotification(id.toString())
    .subscribe({
      next: (result) => {
        console.log(result);
        this.loadNotification();
      },
      error: (error: any) => {
        console.error('Error al borrar notifiaciones:', error);
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
