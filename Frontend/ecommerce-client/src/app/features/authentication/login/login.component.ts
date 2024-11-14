
import { UsersService } from './../../../services/Users.service';
import { AddressesService } from '../../../services/Addresses.service';
import { AuthService } from '../../../services/Auth.service';
import { AlertsComponent } from '../../../components/alerts/alerts.component';
import { Canton, District } from '../../../models/address.model';
import { Province } from '../../../models/address.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



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

export class LoginComponent implements OnInit {
  showLogin = true;
  showAlert = false;
  selectedProvinceId: number | null = null;
  selectedCantonId: number | null = null;
  districts: District[] = [];
  cantons: Canton[] = [];
  provinces: Province[] = [];


  public loginForm = new FormGroup({
    email: new FormControl<string>( '',[
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ]),
    passw:  new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),   
      Validators.maxLength(20)
    ])
  });


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
    private _loginAuth: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loadProvinces();
  }


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

  onSubmitLogin(){
    if(this.loginForm.valid){
      this._loginAuth.login(this.loginForm.value).
      subscribe({
        next: (result: any) => {
          console.log('Login cerado con exito:', result);
          this.router.navigate(['/slider-day-promotions']);
          //navegate 
        },
        error:(error:any)=>{
          console.error('Login cerado con exito:', error);
          console.table(this.loginForm.value);
        },
        complete: () => {
          console.log('solicitud aceptada');
        }
      });

    }else{
      console.log('Formulario inválido');
      this.loginForm.markAllAsTouched(); // Marca todos los controles como "tocados" para mostrar errores
      console.log(this.loginForm.value);
    }

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
