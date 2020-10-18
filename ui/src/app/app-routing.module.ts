import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostImageComponent } from './post-image/post-image.component';

const routes: Routes = [
  {
    path: 'post',
    component: PostImageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
