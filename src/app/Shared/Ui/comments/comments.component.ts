import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../Core/Services/comments.service';
import { IComment } from '../../../Core/Interfaces/icomment';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  @Input({ required: true }) postId !: string;
  private readonly _CommentsService = inject(CommentsService);
  private readonly _FormBuilder = inject(FormBuilder);
  commentData: IComment[] = [];

  commentForm!: FormGroup;

  commentSubmit() {
    if(this.commentForm.valid){
      this._CommentsService.CreateComment(this.commentForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.commentData = res.comments;
        this.commentForm.get("content")?.reset;
      }
    })
    }
  }


  ngOnInit(): void {

    this.commentForm = this._FormBuilder.group({
      content: [null, [Validators.required]],
      post: [this.postId]
    });

    this._CommentsService.GetPostComments(this.postId).subscribe({
      next: (res) => {
        this.commentData = res.comments.reverse();;
      }
    });
  }
}
