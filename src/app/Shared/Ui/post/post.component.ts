import { Component, computed, inject, Input, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { IPost } from '../../../Core/Interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../comments/comments.component";
import { UsersService } from '../../../Core/Services/users.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostsService } from '../../../Core/Services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe, CommentsComponent, NgxPaginationModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit , OnDestroy {
  private readonly _UsersService = inject(UsersService);
  private readonly _PostsService = inject(PostsService);
  currentPage : Signal<number> = computed(this._PostsService.page);
  maxsize : string = "20";
  userID: string = "";
  @Input({ required: true }) postsData!: IPost[];
  @Input({ required: true }) totalItems!: any;
  unSubscribe: Subscription = new Subscription(); 
  


  getUserId() {
    this.unSubscribe.add(this._UsersService.GetUserData().subscribe({
      next: (data) => {
        this.userID = data.user._id;
      }
    }));
  }

  pageChanged(e: any) {
    this._PostsService.page.set(e);
  }

  ngOnInit(): void {
    this.getUserId()
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }

}
