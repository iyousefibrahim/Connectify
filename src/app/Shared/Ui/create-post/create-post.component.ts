import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../../Core/Services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnDestroy {
  private readonly _PostsService = inject(PostsService);
  private readonly _ToastrService = inject(ToastrService);
  savedFile?: File; 
  content: string = "";
  unSubscribe: Subscription = new Subscription(); 
 
  changeImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.savedFile = input.files[0];
    }
  }

  CreatePost(): void {
    const formData = new FormData();
    formData.append('body', this.content);

    if (this.savedFile) {
      formData.append('image', this.savedFile);
    }

    this.unSubscribe.add(this._PostsService.CreatePost(formData).subscribe({
      next: (data) => {
        this._ToastrService.success("Your post has been successfully created!");
        this.content = "";
        delete this.savedFile;
      },
    }));
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }
}
