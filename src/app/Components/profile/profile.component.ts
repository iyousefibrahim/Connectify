import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { UsersService } from '../../Core/Services/users.service';
import { IUser } from '../../Core/Interfaces/iuser';
import { DatePipe } from '@angular/common';
import { PostComponent } from "../../Shared/Ui/post/post.component";
import { PostsService } from '../../Core/Services/posts.service';
import { IPost } from '../../Core/Interfaces/ipost';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavComponent, DatePipe, PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private readonly _UsersService = inject(UsersService);
  private readonly _PostsService = inject(PostsService);
  userData: IUser = {} as IUser;
  userPosts: IPost[] = [];

  ngOnInit(): void {
    this._UsersService.GetUserData().subscribe({
      next: (res) => {
        this.userData = res.user;
      }
    })
    this._PostsService.GetUserPosts().subscribe({
      next: (res) => {
        this.userPosts = res.posts;
        console.log(res);
      }
    })

  }
}
