import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  }
/*   {
    path: 'quizzes',
    loadChildren: () => import('./pages/quizzes/quizzes.module').then(m => m.QuizzesPageModule)
  },
  {
    path: 'quizzes/:id',
   loadChildren: () => import('./pages/tentativa/tentativa.module').then(m => m.TentativaPageModule)
  }, 
  {
    path: '',
    redirectTo: 'quizzes',
    pathMatch: 'full'
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
