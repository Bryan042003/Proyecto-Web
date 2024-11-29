import { Component, Input } from '@angular/core';
import { Notification } from '../../models/notification.model';
import { NotificationService } from '../../services/Notification.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  notifications: Notification[]=[];
  @Input() role: string = '';
  showNoEntryAlert: boolean = false;
  constructor(private _notificationService: NotificationService,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
   
    this.loadNotification();
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
      console.log('Rol recibido:', this.role);
     
    });
  }
  showAlert() {
    this.showNoEntryAlert = true;
    setTimeout(() => {
      this.showNoEntryAlert = false;
    }, 2000); // Oculta la alerta después de 3 segundos.
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
  

  openModal() {
    
  
    if (this.role === 'admin') {
      (document.getElementById('my_modal_7') as HTMLDialogElement).showModal();
      console.log("abre");
    } else {
      this.showAlert();
    }
  }

  
}
