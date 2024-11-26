import { Component } from '@angular/core';
import { AlertsComponent } from '../../components/alerts/alerts.component';
import { NoAlertsComponent } from '../no-alerts/no-alerts.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OffersService } from '../../services/Offers.service';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-offers-admin',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './offers-admin.component.html',
  styleUrl: './offers-admin.component.scss'
})
export class OffersAdminComponent {
  constructor(private _offerService: OffersService){}
  showNoAlert = false;
  showAlert = false;
  offerts: Offer[] = [];

  public offerForm = new FormGroup({
    discount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.max(100)  
    ]),
    start_date: new FormControl<Date | null>(null, [
      Validators.required
    ]),
    end_date: new FormControl<Date | null>(null) 
  });
  
  ngOnInit(): void {
    this.loadOfferts();
  }


  loadOfferts() {
    this._offerService.getOffers()
      .subscribe({
        next: (result: Offer[]) => {
          this.offerts = result
          console.log(this.offerts);
        },
        error: (error: any) => {
          console.error('Error al obtener ofertas:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }

/*   onSubmit() {
    if (this.offerForm.valid) {
      this._offerService.createOffer(this.offerForm.value).
      subscribe({
        next: (result: any) => {
          console.log('oferta:', result);
          this.showAlert = true;
          this.offerForm.reset();
          setTimeout(() => { this.showAlert = false; }, 3000);
        },
        error: (error: any) => {
          console.error('Error al crear oferta:', error);
          this.showNoAlert = true;
          console.table(this.offerForm.value);
          setTimeout(() => { this.showNoAlert = false; }, 3000);
        },
        complete: () => {
          console.log('Creación completada');
        }
      });
    } else {
      console.log('Formulario inválido');
      this.offerForm.markAllAsTouched();
      this.showNoAlert = true;
      console.table(this.offerForm.value);
      setTimeout(() => { this.showNoAlert = false; }, 3000);
    }
  }
   */
}