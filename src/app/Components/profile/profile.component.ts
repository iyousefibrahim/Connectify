import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { UsersService } from '../../Core/Services/users.service';
import { IUser } from '../../Core/Interfaces/iuser';
import { DatePipe } from '@angular/common';
import { PostComponent } from "../../Shared/Ui/post/post.component";
import { PostsService } from '../../Core/Services/posts.service';
import { IPost } from '../../Core/Interfaces/ipost';
import { Subscription } from 'rxjs';
import { CreatePostComponent } from "../../Shared/Ui/create-post/create-post.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavComponent, DatePipe, PostComponent, CreatePostComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  private readonly _UsersService = inject(UsersService);
  private readonly _PostsService = inject(PostsService);
  userData: IUser = {} as IUser;
  userPosts: IPost[] = [];
  totalItems!: number;
  unSubscribe: Subscription = new Subscription();

  ngOnInit(): void {

    this.unSubscribe.add(this._UsersService.GetUserData().subscribe({
      next: (res) => {
        this.userData = res.user;
      }
    }));

    this.unSubscribe.add(this._PostsService.GetUserPosts().subscribe({
      next: (res) => {
        this.userPosts = res.posts;
        this.totalItems = res.paginationInfo.total;
      }
    }));

  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }
}
