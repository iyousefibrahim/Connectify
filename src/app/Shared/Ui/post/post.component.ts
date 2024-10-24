import { Component, computed, inject, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { IPost } from '../../../Core/Interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../comments/comments.component";
import { UsersService } from '../../../Core/Services/users.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostsService } from '../../../Core/Services/posts.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe, CommentsComponent, NgxPaginationModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  private readonly _UsersService = inject(UsersService);
  private readonly _PostsService = inject(PostsService);
  currentPage : Signal<number> = computed(this._PostsService.page);

  @Input({ required: true }) postsData!: IPost[];
  
  userID: string = "";

  getUserId() {
    this._UsersService.GetUserData().subscribe({
      next: (data) => {
        console.log(data);
        this.userID = data.user._id;
      }
    })
  }

  pageChanged(e: any) {
    this._PostsService.page.set(e);
  }

  ngOnInit(): void {
    this.getUserId()
  }

}
