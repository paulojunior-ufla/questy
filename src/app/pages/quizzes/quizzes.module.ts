import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuizzesPage } from './quizzes.page';
import { SharedModule } from '@app/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuizzesPage
      }
    ])
  ],
  declarations: [QuizzesPage]
})
export class QuizzesPageModule {}
