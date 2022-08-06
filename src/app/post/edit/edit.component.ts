import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: number;
  post!: Post;
  form!: FormGroup;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // fetch post by id
    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;
      console.log(this.post);
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });

  }

  get f() {
    return this.form.controls;
  }


  // handle form submission
  onSubmit() {
    this.postService.update(this.id, this.form.value).subscribe((response) => {
      this.router.navigateByUrl('posts');
    });
  }
}
