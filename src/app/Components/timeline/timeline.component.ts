import { Component, inject } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { PostComponent } from "../../Shared/Ui/post/post.component";
import { CreatePostComponent } from "../../Shared/Ui/create-post/create-post.component";
import { PostsService } from '../../Core/Services/posts.service';
import { IPost } from '../../Core/Interfaces/ipost';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NavComponent, PostComponent, CreatePostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  private readonly _PostsService = inject(PostsService);
  postsData : IPost[] = [];

  ngOnInit(): void {
    this._PostsService.GetAllPosts().subscribe({
      next: (data) => {
        this.postsData = data.posts;
      }
    });
  }
}
