import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../../Core/Services/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  private readonly _PostsService = inject(PostsService);
  private readonly _ToastrService = inject(ToastrService);
  savedFile?: File; 
  content: string = "";
 
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

    this._PostsService.CreatePost(formData).subscribe({
      next: (data) => {
        this._ToastrService.success("Your post has been successfully created!");
      },
    });
  }
}
