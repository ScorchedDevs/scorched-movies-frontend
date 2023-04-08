import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { MovieDialogComponent } from './list/movie-dialog/movie-dialog.component';

@NgModule({
  declarations: [ListComponent, MovieDialogComponent],
  imports: [MoviesRoutingModule, SharedModule],
})
export class MoviesModule {}
