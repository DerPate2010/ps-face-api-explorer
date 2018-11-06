import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { FaceTesterComponent } from './face-tester/face-tester.component';
import { FaceGroupingComponent } from './face-grouping/face-grouping.component';
import { FindSimilarComponent } from './find-similar/find-similar.component';
import { FaceIdContiniousComponent } from './face-id-continious/face-id-continious.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'test-faces', component: FaceTesterComponent},
  { path: 'face-grouping', component: FaceGroupingComponent },
  { path: 'find-similar', component: FindSimilarComponent },
  { path: 'face-id-continious', component: FaceIdContiniousComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
