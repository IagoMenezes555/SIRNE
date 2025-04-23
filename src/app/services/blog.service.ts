import { Injectable, signal } from '@angular/core';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public posts = signal<Blog[]>([]);

  constructor() {
    this.loadBlogs();
  }

  private loadBlogs() {}
}
