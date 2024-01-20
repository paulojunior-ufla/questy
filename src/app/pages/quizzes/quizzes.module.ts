import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuizzesPage } from './quizzes.page';
import { SharedModule } from '@app/app/shared/shared.module';
import { TentativasComponent } from '../components/tentativas/tentativas.component';

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
  declarations: [QuizzesPage, TentativasComponent]
})
export class QuizzesPageModule {}
