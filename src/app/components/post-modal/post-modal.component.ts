import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { IonContent } from "@ionic/angular/standalone";
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
  imports: [
    IonContent,
    UpperCasePipe,
    DatePipe
  ]
})
export class PostModalComponent  implements OnInit {
  @Input() post: Blog = { date: new Date(), description: '', id: '', post: '', title: '' };

  constructor() { }

  ngOnInit() {}

}
