import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/Auth.service';
import { UsersService } from '../../services/Users.service';
import { Address } from '../../models/address.model';
import { AddressesService } from '../../services/Addresses.service';
import { Province, Canton, District } from '../../models/address.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsComponent } from "../alerts/alerts.component";
import { identity } from 'rxjs';
import { AlertErrorComponent } from "../alert-error/alert-error.component";




@Component({
  selector: 'app-direction',
  standalone: true,
  imports: [CommonModule, AlertsComponent, FormsModule, ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './direction.component.html',
  styleUrl: './direction.component.scss'
})
export class DirectionComponent {

  userActive: User | undefined;
  userInfo: User | undefined;
  address: Address | undefined;
  province1: Province | undefined;
  canton1: Canton | undefined;
  district1: District | undefined;
  selectedProvinceId: number | null = null;
  selectedCantonId: number | null = null;
  showAlert = false;
  showErrorAlert = false;
  districts: District[] = [];
  cantons: Canton[] = [];
  provinces: Province[] = [];

  message= "Ocurrió un error al actualizar la dirección. Por favor, intenta nuevamente.";


  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private usersService: UsersService,
    private addressesService: AddressesService,
    private router: Router
  ) {


  }

  ngOnInit(): void {

    this.loadProvinces();

    this.userActive = this.authService.getDecodedAccessToken(this.localStorageService.getItem('token'));

    if (this.userActive?.id) {
      this.usersService.getUser(this.userActive.id.toString()).subscribe((data) => {
        this.userInfo = data;


        this.addressesService.getAddress(this.userInfo?.id_address.toString()).subscribe((data) => {
          this.address = data;
          this.adressUpdate.patchValue({
            id: this.address?.id,
            id_district: this.userInfo?.id_address
          });

          this.addressesService.getDistrict(this.address.id_district.toString()).subscribe((data) => {
            this.district1 = data;

            if (this.district1?.id_canton) {
              this.addressesService.getCanton(this.district1.id_canton.toString()).subscribe((data) => {
                this.canton1 = data;

                if (this.canton1?.id_province) {
                  this.addressesService.getProvince(this.canton1.id_province.toString()).subscribe((data) => {
                    this.province1 = data;
                  });
                }
              });
            }  
          });
        });
      });
    }
  }


  loadDistricts() {
    if (this.selectedCantonId !== null && this.selectedCantonId !== undefined) {
    this.addressesService.getDistrictsByCanton(this.selectedCantonId.toString())
      .subscribe({
        next: (result: { districts: District[] }) => {
          this.districts = result.districts;
        },
        error: (error: any) => {
          console.error('Error al obtener distritos:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });}else {
        console.error('Error: selectedProvinceId no tiene un valor válido.');
      }
  }

  get district() {
    return this.districts;
  }

  onProvinceChange(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).selectedOptions[0];
    const provinceId = selectedOption.getAttribute('data-id');
    this.selectedProvinceId = provinceId ? parseInt(provinceId, 10) : null;
    this.loadCanton();
  }


  onCantonChange(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).selectedOptions[0];
    const cantonId = selectedOption.getAttribute('data-id');
    this.selectedCantonId = cantonId ? parseInt(cantonId, 10) : null;
    this.loadDistricts();
  }


  loadCanton() {
    if (this.selectedProvinceId !== null && this.selectedProvinceId !== undefined) {
      this.addressesService.getCantonsByProvince(this.selectedProvinceId.toString())
        .subscribe({
          next: (result: { cantons: Canton[] }) => {
            this.cantons = result.cantons;
          },
          error: (error: any) => {
            console.error('Error al obtener cantones:', error);
          },
          complete: () => {
            console.log('Solicitud completada');
          }
        });
    } else {
      console.error('Error: selectedProvinceId no tiene un valor válido.');
    }
  }

  get canton() {
    return this.cantons;
  }


  loadProvinces() {
    this.addressesService.getProvinces()
      .subscribe({
        next: (result: { provinces: Province[] }) => {
          this.provinces = result.provinces;
        },
        error: (error: any) => {
          console.error('Error al obtener provincias:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }


  get province() {
    return this.provinces;
  }

  public adressUpdate = new FormGroup({
    id: new FormControl<number>(0),

    id_district: new FormControl<number>(0, [
      Validators.required
    ]),
    postal_code: new FormControl<string>('', [
      
      Validators.pattern('^[0-9]{5}$') // Valida un código postal de 5 dígitos
    ]),
    specific_address: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(200)  // Limita la dirección a 200 caracteres
    ])
  });

  public formDistrict = new FormGroup({
    province: new FormControl<string>('', [
      Validators.required
    ]),
    canton: new FormControl<string>('', [
      Validators.required
    ]),
    district: new FormControl<string>('', [
      Validators.required
    ]),
  });

  updateAddress() {
    if (this.adressUpdate.valid) {
      if (this.userInfo?.id_address) {
        
        // Convertir el formulario en un objeto Address asegurando valores válidos
        const address: Address = {
          id: this.adressUpdate.value.id ?? 0, // Valor por defecto 0 si id es null o undefined
          id_district: Number(this.formDistrict.value.district) ?? this.adressUpdate.value.id_district,
          postal_code: this.adressUpdate.value.postal_code ?? '',
          specific_address: this.adressUpdate.value.specific_address ?? '',
        };

        this.addressesService.updateAddress(
          this.userInfo.id_address.toString(),
          address
        ).subscribe({
          next: (user: any) => {
            this.showAlert = true;
            this.adressUpdate.reset();
            setTimeout(() => {
              this.showAlert = false;
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }, 3000);
          },error: (error) => {
            this.showErrorAlert = true;
            setTimeout(() => {
              this.showErrorAlert = false;
            }, 3000);
          }
        });
      }
    }else {
      this.adressUpdate.markAllAsTouched(); // Marca todos los controles como "tocados" para mostrar errores
    }
  }

}


