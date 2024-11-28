import { Component} from '@angular/core';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logistics-dashboard',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './logistics-dashboard.component.html',
  styles: ``
})
export class LogisticsDashboardComponent {
  role: string  = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
      console.log('Rol recibido:', this.role);
     
    });
  }
}
