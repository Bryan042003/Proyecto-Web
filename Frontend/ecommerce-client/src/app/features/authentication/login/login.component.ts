import { District } from './../../../models/address.model';
import { UsersService } from './../../../services/Users.service';
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
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  showLogin = true;
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
          phone: new FormControl<string>('', [
            Validators.required,
            Validators.pattern('^[0-9]{8}$') 
          ]),
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
          ])
        });
        

  toggleView() {
    this.showLogin = !this.showLogin;
  }

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulario válido', this.userForm.value);
      // Aquí puedes enviar los datos a tu API o realizar cualquier acción con ellos
    } else {
      console.log('Formulario inválido');
      this.userForm.markAllAsTouched(); // Marca todos los controles como "tocados" para mostrar errores
      console.log('Formulario invalido', this.userForm.value);
    }
  }


}
