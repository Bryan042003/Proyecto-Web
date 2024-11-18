import { Component } from '@angular/core';
import { UsersService } from '../../services/Users.service';
import { User } from '../../models/user.model';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth.service';
import { AuthGuard } from '../../authGuard/auth.guard';
import { LocalStorageService } from '../../services/LocalStorage.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnInit {

  userActive: User | undefined;
  user: User | undefined;

  constructor(private usersService: UsersService, private authService: AuthService, public authGuard: AuthGuard, private localStorageService: LocalStorageService) { }
  
  ngOnInit(): void {
    this.userActive = this.authService.getDecodedAccessToken(this.localStorageService.getItem('token'));
    if (this.userActive?.id) {
      this.usersService.getUser(this.userActive.id.toString()).subscribe((user: User) => {
        this.user = user;
      });
    }
  }


  saveChangesProfile(){

  }

}
