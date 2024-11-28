import { Component } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersAdminComponent } from '../../components/users-admin/users-admin.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SideBarComponent, TopBarComponent, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styles: ``
})
export class AdminDashboardComponent {
  role: string  = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
      console.log('Rol recibido:', this.role);
     
    });
  }

}
