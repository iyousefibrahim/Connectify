import { Component, computed, effect, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { PostComponent } from "../../Shared/Ui/post/post.component";
import { CreatePostComponent } from "../../Shared/Ui/create-post/create-post.component";
import { PostsService } from '../../Core/Services/posts.service';
import { IPost } from '../../Core/Interfaces/ipost';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NavComponent, PostComponent, CreatePostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit, OnDestroy {
  private readonly _PostsService = inject(PostsService);
  currentPage : Signal<number> = computed(this._PostsService.page);
  postsData : IPost[] = [];
  totalItems! : number;
  unSubscribe: Subscription = new Subscription(); 

 
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
    this.unSubscribe.add(this._PostsService.GetAllPosts(this.currentPage()).subscribe({
      next: (data) => {
        this.postsData = data.posts;
        this.totalItems = data.paginationInfo.total;
      }
    }));
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }
}
