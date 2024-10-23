import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../../Core/Services/posts.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  private readonly _PostsService = inject(PostsService);
  savedFile!: File;
  content! : string;
 
  changeImage(e : Event){
    const Input = e.target as HTMLInputElement;
    if(Input.files && Input.files.length > 0){
      this.savedFile = Input.files[0];
    }
  }

  CreatePost() : void {
    const formData = new FormData();
    formData.append('body',this.content);
    formData.append('image', this.savedFile);
    this._PostsService.CreatePost(formData).subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }
}
