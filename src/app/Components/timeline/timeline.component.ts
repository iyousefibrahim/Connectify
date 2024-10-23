import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { PostComponent } from "../../Shared/Ui/post/post.component";

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NavComponent, PostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

}
