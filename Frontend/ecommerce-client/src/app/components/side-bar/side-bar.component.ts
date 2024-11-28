import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/LocalStorage.service';





@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styles: ''
})
export class SideBarComponent {
  @Input() role: string = '';
  logged: boolean = false;
  showNoEntryAlert: boolean = false;
  constructor(
    private router: Router,
    private _localStorageService: LocalStorageService
  ) { }

  showAlert() {
    this.showNoEntryAlert = true;
    setTimeout(() => {
      this.showNoEntryAlert = false;
    }, 2000); // Oculta la alerta después de 3 segundos.
  }

  navigateToUsers(): void {
    if (this.role === 'logistics'|| undefined) {
      this.showAlert();
    } else {
      this.router.navigate(['/admin_dashboard/users-admin'],{ queryParams: { role: this.role } });
    }
  }

  navigateToProducts(): void {
    if (this.role === 'logistics' || undefined) {
      this.showAlert();
    } else {
      this.router.navigate(['/admin_dashboard/produts-admin'],{ queryParams: { role: this.role } });
    }
  }

  navigateToInventory(): void {
    if (this.role === 'logistics' || undefined) {
      this.showAlert();
    } else {
      this.router.navigate(['/admin_dashboard/inventory-admin'],{ queryParams: { role: this.role } });
    }
  }

  navigateToOrders(): void {

    this.router.navigate(['/admin_dashboard/orders-admin'],{ queryParams: { role: this.role } });
    
  }

  navigateToStatictics(): void {
    if (this.role === 'logistics' || undefined) {
      this.showAlert();
    } else {
      this.router.navigate(['/admin_dashboard/statistics-admin'],{ queryParams: { role: this.role } });
    }
  }

  navigateToOfferts(): void {
    if (this.role === 'logistics' || undefined) {
      this.showAlert();
    } else {
      this.router.navigate(['/admin_dashboard/offers-admin'],{ queryParams: { role: this.role } });
    }
  }

  logout() {
    this._localStorageService.removeItem('token');
    this.logged = false;
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.router.navigate(['/store']);
    }, 100);

  }
}
