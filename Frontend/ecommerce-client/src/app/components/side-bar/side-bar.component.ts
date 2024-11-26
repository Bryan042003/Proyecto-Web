import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router } from '@angular/router';




@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ AngularSvgIconModule],
  templateUrl: './side-bar.component.html',
  styles: ''
})
export class SideBarComponent {
  constructor(private router: Router) {}

  navigateToUsers(): void {
    this.router.navigate(['/admin_dashboard/users-admin']);
  }

  navigateToProducts(): void {
    this.router.navigate(['/admin_dashboard/produts-admin']);
  }

  navigateToInventory(): void {
    this.router.navigate(['/admin_dashboard/inventory-admin']);
  }

  navigateToOrders(): void {
    this.router.navigate(['/admin_dashboard/orders-admin']);
  }

  navigateToStatictics(): void {
    this.router.navigate(['/admin_dashboard/statistics-admin']);
  }
}
