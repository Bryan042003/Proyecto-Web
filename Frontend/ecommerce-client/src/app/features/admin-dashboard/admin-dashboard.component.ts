import { Component } from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SideBarComponent, TopBarComponent],
  templateUrl: './admin-dashboard.component.html',
  styles: ``
})
export class AdminDashboardComponent {

}
