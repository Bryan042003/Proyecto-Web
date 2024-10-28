import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stock-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-status.component.html',
  styleUrl: './stock-status.component.scss'
})
export class StockStatusComponent {
  isInStock: boolean = false;

}
