import { Component, computed, effect, inject, Signal} from '@angular/core';
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
  currentPage : Signal<number> = computed(this._PostsService.page);
  postsData : IPost[] = [];

 
  constructor() {
    effect(()=>{
      this._PostsService.GetAllPosts(this.currentPage()).subscribe({
      next: (data) => {
        this.postsData = data.posts;
      }
    });
    })
  }

  ngOnInit(): void {
    this._PostsService.GetAllPosts(this.currentPage()).subscribe({
      next: (data) => {
        this.postsData = data.posts;
      }
    });
  }
}
