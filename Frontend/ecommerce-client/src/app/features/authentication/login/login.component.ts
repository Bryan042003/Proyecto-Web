
import { UsersService } from './../../../services/Users.service';
import { AddressesService } from '../../../services/Addresses.service';
import { AlertsComponent } from '../../../components/alerts/alerts.component';
import { District } from '../../../models/address.model';
import { Province } from '../../../models/address.model';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertsComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  showLogin = true;
  showAlert = false;
  districts: any[] = [];
  cantons = [];
  provinces: Province[] = [];

  /*
        data ={
            email,
            name,
            last_name,
            passw,
            role,
            photo,
            phone,
            province,
            canton,
            district,
            postal_code,
            specific_address
        }
        */


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
    role: new FormControl<string>('user'),
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
      Validators.maxLength(200)  // Limita la dirección a 200 caracteres
    ]),
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('^[0-9]{8}$')
    ]),
  }); //! validar que la provincia , canton y distrito pertenecen uno al otro 


  toggleView() {
    this.showLogin = !this.showLogin;
  }

  constructor(
    private _usersService: UsersService,
    private _addressService: AddressesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {


  }


  ngOnInit(): void { 
    this.loadProvinces(); 
  }


  loadDistricts() {
    this._addressService.getDistricts()
      .subscribe({
        next: (result: any) => {
          this.districts = result;
          console.log(this.districts);
        },
        error: (error: any) => {
          console.error('Error al obtener distritos:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }

  get district() {
    return this.districts;
  }



  loadCanton() {
    this._addressService.getCantons()
      .subscribe({
        next: (result: any) => {
          this.cantons = result;
          console.log(this.cantons);
        },
        error: (error: any) => {
          console.error('Error al obtener cantones:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
  }

  get canton() {
    return this.cantons;
  }


  loadProvinces() {
    this._addressService.getProvinces()
      .subscribe({
        next: (result: any) => {
          this.provinces = result;
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
            console.table(this.userForm.value);
          },
          complete: () => {
            console.log('Solicitud completada');
          }
        });
    } else {
      console.log('Formulario inválido');
      this.userForm.markAllAsTouched(); // Marca todos los controles como "tocados" para mostrar errores
      console.log(this.userForm.value);
    }
  }





}
