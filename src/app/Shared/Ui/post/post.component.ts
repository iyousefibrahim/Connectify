import { Component, inject, Input, OnInit } from '@angular/core';
import { IPost } from '../../../Core/Interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../comments/comments.component";
import { UsersService } from '../../../Core/Services/users.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe, CommentsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  private readonly _UsersService = inject(UsersService);
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
  
  ngOnInit(): void {
    this.getUserId()
  }

}
