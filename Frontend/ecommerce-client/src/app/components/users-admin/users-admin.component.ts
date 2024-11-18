
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/Users.service';
import { AddressesService } from '../../services/Addresses.service';
import { NoAlertsComponent } from '../no-alerts/no-alerts.component';
import { Canton, District, Province } from '../../models/address.model';
import { AlertsComponent } from '../../components/alerts/alerts.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertsComponent,
    NoAlertsComponent
  ],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.scss'
})
export class UsersAdminComponent {
  selectedProvinceId: number | null = null;
  selectedCantonId: number | null = null;
  users: User[] = [];
  districts: District[] = [];
  cantons: Canton[] = [];
  provinces: Province[] = [];
  showAlert = false;
  showNoAlert = false;

  constructor(
    private _usersService: UsersService,
    private _addressService: AddressesService,

  ) { }
  ngOnInit(): void {
    this.loadProvinces();
    this.loadUser();

  }


  public userForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email, //1*( atext / "." ) "@" label *( "." label )
      Validators.maxLength(100)  // Limita el email a 100 caracteres
    ]),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[A-Za-z\\s]+$'),
      Validators.maxLength(50)  // Máximo 50 caracteres
    ]),
    last_name: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[A-Za-z\\s]+$'),
      Validators.maxLength(50)
    ]),
    passw: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),   // Mínimo 8 caracteres para mayor seguridad
      Validators.maxLength(20)
    ]),
    role: new FormControl<string>('', [
      Validators.required
    ]),
    photo: new FormControl<string>(''),
    province: new FormControl<string>('', [
      Validators.required
    ]),
    canton: new FormControl<string>('', [
      Validators.required
    ]),
    district: new FormControl<string>('', [
      Validators.required
    ]),
    postal_code: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[0-9]{5}$') // Valida un código postal de 5 dígitos
    ]),
    specific_address: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(200)  // Limita la dirección a 200 caracteres
    ]),
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[0-9]{8}$')
    ]),
  }); //! validar que la provincia , canton y distrito pertenecen uno al otro 


  loadDistricts() {
    if (this.selectedCantonId !== null && this.selectedCantonId !== undefined) {
      this._addressService.getDistrictsByCanton(this.selectedCantonId.toString())
        .subscribe({
          next: (result: { districts: District[] }) => {
            this.districts = result.districts;
            console.log(this.districts);
          },
          error: (error: any) => {
            console.error('Error al obtener distritos:', error);
          },
          complete: () => {
            console.log('Solicitud completada');
          }
        });
    } else {
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
    console.log('ID de provincia seleccionada:', this.selectedProvinceId);
    console.log('Nombre de provincia seleccionado en el formulario:', this.userForm.value.province);
  }


  onCantonChange(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).selectedOptions[0];
    const cantonId = selectedOption.getAttribute('data-id');
    this.selectedCantonId = cantonId ? parseInt(cantonId, 10) : null;
    this.loadDistricts();
    console.log('ID de canton seleccionada:', this.selectedCantonId);
    console.log('Nombre de canton seleccionado en el formulario:', this.userForm.value.canton);
  }


  loadCanton() {
    if (this.selectedProvinceId !== null && this.selectedProvinceId !== undefined) {
      this._addressService.getCantonsByProvince(this.selectedProvinceId.toString())
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
    this._addressService.getProvinces()
      .subscribe({
        next: (result: { provinces: Province[] }) => {
          this.provinces = result.provinces;
          console.log(this.provinces);
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
  onSubmit() {
    if (this.userForm.valid) {
      this._usersService.createUser(this.userForm.value)
        .subscribe({
          next: (result: any) => {
            console.log('Usuario creado con éxito:', result);
            this.showAlert = true;
            this.userForm.reset();
            this.userForm.patchValue({ role: 'user' });
            setTimeout(() => { this.showAlert = false; }, 3000);

          },
          error: (error: any) => {
            console.error('Error al crear usuario:', error);
            this.showNoAlert = true;
            console.table(this.userForm.value);
            setTimeout(() => { this.showNoAlert = false; }, 3000);
          },
          complete: () => {
            console.log('Solicitud completada');
          }
        });
    } else {
      console.log('Formulario inválido');
      this.userForm.markAllAsTouched(); // Marca todos los controles como "tocados" para mostrar errores
      this.showNoAlert = true;
      console.table(this.userForm.value);
      setTimeout(() => { this.showNoAlert = false; }, 3000);
    }
  }


  loadUser() {
    this._usersService.getUsers()
      .subscribe({
        next: (result: User[]) => { 
          this.users = result; 
          console.log(this.users);
        },
        error: (error: any) => {
          console.error('Error al obtener usuarios:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }

  onDelete(id: number){
    this._usersService.deleteUser(id.toString())
    .subscribe({
      next: (result) => { 
        console.log('eliminado exitosamente');
      },
      error: (error: any) => {
        console.log('error:', id.toString());
        console.error('Error al obtener usuario:', error);
      },
      complete: () => {
        console.log('Solicitud completada');
      }
    });
  }

  onEdit(id: number, data: User){

  }
  
  
  
}

