import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModule } from '@app/app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          { path: 'quizzes', loadChildren: () => import('../quizzes/quizzes.module').then(m => m.QuizzesPageModule) },
          { path: 'quizzes/:id', loadChildren: () => import('../tentativa/tentativa.module').then(m => m.TentativaPageModule) },
          { path: 'conquistas', loadChildren: () => import('../conquistas/conquistas.module').then(m => m.ConquistasPageModule) },
          { path: '', redirectTo: 'quizzes', pathMatch: 'full' },
          { path: '**', redirectTo: 'quizzes' },
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
