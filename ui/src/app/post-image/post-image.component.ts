import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../http-service/post.service';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.css'],
})
export class PostImageComponent implements OnInit {
  constructor(private readonly postService: PostService) {}
  form: FormGroup;
  imageURL: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      media: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onSubmitImage(): void {
    this.postService.addPost(this.form.value.media);
    this.form.reset();
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ media: file });
    this.form.get('media').updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imageURL = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }
}
