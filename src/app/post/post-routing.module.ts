import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'posts', redirectTo: 'posts/index', pathMatch: 'full' },
  { path: 'posts/index', component: IndexComponent },
  { path: 'posts/:id/view', component: ViewComponent },
  { path: 'posts/create', component: CreateComponent },
  { path: 'posts/:id/edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
