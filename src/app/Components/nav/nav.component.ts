import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../Core/Services/users.service';
import { IUser } from '../../Core/Interfaces/iuser';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  private readonly _UsersService = inject(UsersService);
  userData: IUser = {} as IUser;
  LogOut(): void {
    localStorage.clear();
  }
  ngOnInit(): void {
    this._UsersService.GetUserData().subscribe({
      next: (data) => {
        this.userData = data.user;
      }
    })
  }

}
