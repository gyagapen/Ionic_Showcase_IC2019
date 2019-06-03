import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'vision', loadChildren: './vision/vision.module#VisionPageModule' },
  { path: 'vision-api', loadChildren: './vision-api/vision-api.module#VisionApiPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
