import { Component } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersAdminComponent } from '../../components/users-admin/users-admin.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SideBarComponent, TopBarComponent, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styles: ``
})
export class AdminDashboardComponent {

}
