import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ModalController, IonSearchbar } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { BlogService } from 'src/app/services/blog.service';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';
import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonSearchbar
  ]
})
export class BlogPage {
  public posts = computed(() => this.blogService.posts());
  public filteredPosts: Blog[] = [];
  public searchTerm: string = '';

  constructor(
    private blogService: BlogService,
    private modalCtrl: ModalController,
  ) {
    effect(() => {
      this.search();
    });
  }

  public search() {    
    this.filteredPosts = [ ...this.posts().filter((post) => post.title.toUpperCase().includes(this.searchTerm.toUpperCase()) || post.description.toUpperCase().includes(this.searchTerm.toUpperCase())) ];
  }

  public async openPost(post: Blog) {
    const modalref = await this.modalCtrl.create({
      component: PostModalComponent,
      componentProps: {
        post: post
      },
      cssClass: 'post-modal'
    });

    modalref.present();
  }
}
