import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // fetch all posts
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  // delete post
  onDeletePost(id: number) {
    this.postService.delete(id).subscribe((response) => {
      this.posts = this.posts.filter((post) => post.id !== id);
      console.log(this.posts);
    });
  }
}
