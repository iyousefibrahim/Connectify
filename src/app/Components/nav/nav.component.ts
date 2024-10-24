import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../Core/Services/users.service';
import { IUser } from '../../Core/Interfaces/iuser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit, OnDestroy {
  private readonly _UsersService = inject(UsersService);
  unSubscribe: Subscription = new Subscription();
  userData: IUser = {} as IUser;
  
  LogOut(): void {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.unSubscribe.add(this._UsersService.GetUserData().subscribe({
      next: (data) => {
        this.userData = data.user;
      }
    }));
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }

}
