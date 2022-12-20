import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WatchComponent } from './components/watch/watch.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'watch-component', component: WatchComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
