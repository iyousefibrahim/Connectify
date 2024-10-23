import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { UsersService } from '../../Core/Services/users.service';
import { IUser } from '../../Core/Interfaces/iuser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavComponent,DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private readonly _UsersService = inject(UsersService);
  userData: IUser = {} as IUser;

  ngOnInit(): void {
    this._UsersService.GetUserData().subscribe({
      next: (res) => {
        console.log(res);
        this.userData = res.user;
      }
    })
  }
}
