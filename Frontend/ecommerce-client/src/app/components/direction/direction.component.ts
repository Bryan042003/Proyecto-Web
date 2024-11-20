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



@Component({
  selector: 'app-direction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './direction.component.html',
  styleUrl: './direction.component.scss'
})
export class DirectionComponent {

  userActive: User | undefined;
  userInfo: User | undefined;
  address: Address | undefined;
  province: Province | undefined;
  canton: Canton | undefined;
  district: District | undefined;

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private usersService: UsersService,
    private addressesService: AddressesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userActive = this.authService.getDecodedAccessToken(this.localStorageService.getItem('token'));

    if (this.userActive?.id) {
      this.usersService.getUser(this.userActive.id.toString()).subscribe((data) => {
        this.userInfo = data;

        this.addressesService.getAddress(this.userInfo?.id_address.toString()).subscribe((data) => {
          this.address = data;

          this.addressesService.getDistrict(this.address.id_district.toString()).subscribe((data) => {
            this.district = data;
            console.log("distrito: ", this.district);

            if (this.district?.id_canton) {
              this.addressesService.getCanton(this.district.id_canton.toString()).subscribe((data) => {
                this.canton = data;
                console.log("canton: ", this.canton);

                if (this.canton?.id_province) {
                  this.addressesService.getProvince(this.canton.id_province.toString()).subscribe((data) => {
                    this.province = data;
                    console.log("provincia: ", this.province);
                  });
                }
              });
            }
          });
        });
      });
    }
  }

  deleteDirection() {
    if (this.address?.id) {
      this.addressesService.deleteAddress(this.address.id.toString()).
      subscribe({
        next: (result: any) => {
          console.log('Login cerado con exito:', result);
          setTimeout(() => {
            this.router.navigate(['/store/direction']);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }, 3000);
        }
      });
    }
  }



}

  
