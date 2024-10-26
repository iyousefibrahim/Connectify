import { Component, computed, effect, ElementRef, HostListener, inject, OnDestroy, OnInit, Signal, ViewChild } from '@angular/core';
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
  currentPage: Signal<number> = computed(this._PostsService.page);
  postsData: IPost[] = [];
  totalItems!: number;
  unSubscribe: Subscription = new Subscription();
  showbtn: boolean = false;

  @ViewChild('btntop') btnTop!: ElementRef;

  @HostListener('window:scroll')
  onScroll() {
    if (window.scrollY >= 100) {
      this.showbtn = true;
    } else {
      this.showbtn = false;
    }
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    if (e.target === this.btnTop.nativeElement || this.btnTop.nativeElement.contains(e.target as Node)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  constructor() {
    effect(() => {
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
