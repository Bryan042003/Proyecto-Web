import { Component } from '@angular/core';
import { UsersService } from '../../services/Users.service';
import { User } from '../../models/user.model';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth.service';
import { AuthGuard } from '../../authGuard/auth.guard';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { CommonModule } from '@angular/common';
import { AlertAcceptDeteleComponent } from "../alert-accept-detele/alert-accept-detele.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AlertsComponent } from "../alerts/alerts.component";
import { AlertErrorUpdateUserComponent } from "../alert-error-update-user/alert-error-update-user.component";
import { AlertErrorComponent } from "../alert-error/alert-error.component";



@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CommonModule, AlertAcceptDeteleComponent, FormsModule, ReactiveFormsModule, AlertsComponent, AlertErrorComponent],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnInit {

  userActive: User | undefined;
  user: User | undefined;
  showAlert = false;
  showAlertEdit: boolean = false;
  showPassword: boolean = false;
  showErrorAlertEdit: boolean = false;
  message = "Ocurrió un error al actualizar la información. Por favor, intenta nuevamente.";


  constructor(private router: Router, private usersService: UsersService, private authService: AuthService, public authGuard: AuthGuard, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.userActive = this.authService.getDecodedAccessToken(this.localStorageService.getItem('token'));
    console.log('Usuario activo:', this.userActive);
    if (this.userActive?.id) {
      this.usersService.getUser(this.userActive.id.toString()).subscribe((user: User) => {
        console.log('Usuario actual cargado correctamente ', user);
        this.user = user;
        // Llenar el formulario con los datos del usuario
        this.updateUserForm.patchValue({
          email: user.email || '',
          name: user.name || '',
          last_name: user.last_name || '',
          phone: user.phone || '',
          photo: user.photo || '',
          id_address: user.id_address?.toString() || '',
          role: user.role || ''
        });
      });
    }
  }

  public updateUserForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.email,
      Validators.maxLength(100)
    ]),
    name: new FormControl<string>('', [
      Validators.pattern('^[A-Za-z\\s]+$'),
      Validators.maxLength(50) // Máximo 50 caracteres
    ]),
    last_name: new FormControl<string>('', [
      Validators.pattern('^[A-Za-z\\s]+$'),
      Validators.maxLength(50)
    ]),
    phone: new FormControl<string>('', [

      Validators.pattern('^[0-9]{8}$')
    ]),
    photo: new FormControl<string>(''),

    id_address: new FormControl<string>(''),
    role: new FormControl<string>('')
  });



  public updatePassword = new FormGroup({

    actualPassword: new FormControl<string>('', [
      Validators.required,
    ]),
    newPassw: new FormControl<string>('', [
      Validators.minLength(8), // Mínimo 8 caracteres para mayor seguridad
      Validators.maxLength(20)
    ]),
    confirmNewPassw: new FormControl<string>(''),
  }, { validators: this.passwordsMatchValidator('newPassw', 'confirmNewPassw') });


  passwordsMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }
      if (matchingControl.errors && !matchingControl.errors['passwordsMismatch']) {
        return null;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordsMismatch: true });
        return { passwordsMismatch: true };
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }

  saveChangesProfile() {
    if (this.updateUserForm.valid && this.updatePassword.valid) {
      if (this.userActive?.id) {
        const actualPassword = this.updatePassword.value.actualPassword || '';
        const newPassword = this.updatePassword.value.confirmNewPassw || '';

        // Intentar actualizar la contraseña
        this.usersService.updatePassword(this.userActive?.id.toString(), actualPassword, newPassword)
          .subscribe({
            next: (response: any) => {
              console.log('Contraseña actualizada correctamente:', response);

              // Si la contraseña se actualizó, actualiza los demás datos del usuario

              this.usersService.updateUser(this.userActive!.id.toString(), this.updateUserForm.value)
                .subscribe({
                  next: (updatedUser: User) => {
                    console.log('Usuario actualizado correctamente:', updatedUser);
                    this.user = updatedUser;
                    this.showAlertEdit = true;
                    this.updateUserForm.reset();
                    this.updatePassword.reset();
                    setTimeout(() => {
                      this.showAlertEdit = false;
                      window.location.reload();
                    }, 3000);
                  },
                  error: (error) => {
                    console.error('Error al actualizar usuario:', error);
                  }
                });
            },
            error: (error) => {
              // Si la contraseña es inválida, mostrar mensaje de error
              console.error('Error al actualizar contraseña:', error);
              if (error.status === 400 && error.error?.error === 'Invalid current password') {
                this.showErrorAlertEdit = true;
                setTimeout(() => {
                  this.showErrorAlertEdit = false;
                }, 3000);
              } else {
                this.showErrorAlertEdit = true;
                setTimeout(() => {
                  this.showErrorAlertEdit = false;
                }, 3000);
              }
            }
          });
      } else {
        this.showErrorAlertEdit = true;
        setTimeout(() => {
          this.showErrorAlertEdit = false;
        }, 3000);
      }
    } else if (this.updateUserForm.valid) {
      if (this.userActive?.id) {
        // Si solo se necesita actualizar el usuario
        this.usersService.updateUser(this.userActive?.id.toString(), this.updateUserForm.value)
          .subscribe({
            next: (user: User) => {
              console.log('Usuario actualizado correctamente:', user);
              this.user = user;
              this.showAlertEdit = true;
              this.updateUserForm.reset();
              setTimeout(() => {
                this.showAlertEdit = false;
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }, 3000);
            },
            error: (error) => {
              this.showErrorAlertEdit = true;
              setTimeout(() => {
                this.showErrorAlertEdit = false;
              }, 3000);
            }
          });
      }
    }
  }


  deleteProfile() {
    console.log('Solicitando confirmación para eliminar cuenta...');
    this.showAlert = true;
  }

  onCancel(event: boolean) {
    console.log('Acción cancelada:', event);
    this.showAlert = false;
  }

  onConfirm(event: boolean) {
    this.showAlert = false;

    if (this.userActive?.id) {
      console.log("usuario a eliminar", this.userActive.id);
      this.usersService.deleteUser(this.userActive.id.toString()).subscribe({
        next: () => {
          console.log('Usuario eliminado correctamente');
          this.authService.logout();
          setTimeout(() => {
            this.router.navigate(['/store']);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }, 3000);
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      });
    }
  }

  togglePasswordVisibility(event: Event): void {
    this.showPassword = (event.target as HTMLInputElement).checked;
  }

}
