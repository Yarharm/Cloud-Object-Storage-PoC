import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.css'],
})
export class PostImageComponent implements OnInit {
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
    // Send request to appropriate endpoint
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
