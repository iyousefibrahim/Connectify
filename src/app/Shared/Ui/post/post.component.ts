import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../Core/Services/posts.service';
import { IPost } from '../../../Core/Interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../comments/comments.component";




@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe, CommentsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  private readonly _PostsService = inject(PostsService);
  postsData: IPost[] = [];



  ngOnInit(): void {
    this._PostsService.GetAllPosts().subscribe({
      next: (data) => {
        this.postsData = data.posts;
      }
    });
  }
}
