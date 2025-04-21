import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
    IonContent,
   CommonModule,
   FormsModule,
   HeaderComponent
  ]
})
export class TaskPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
