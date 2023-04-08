import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  page = 1;
  moviesList!: any[];
  pageLength!: number;
  searchQuery = '';

  constructor(
    private readonly moviesService: MoviesService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.moviesService.getMoviesList(this.page, this.searchQuery).subscribe({
      next: ({ data }: any) => {
        this.moviesList = data.movies;
        this.pageLength = Math.ceil(data.movie_count);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openDialog(movie: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = movie;
    dialogConfig.height = '40%';
    dialogConfig.width = '60%';

    this.dialog.open(MovieDialogComponent, dialogConfig);
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.moviesService.getMoviesList(this.page, this.searchQuery).subscribe({
      next: ({ data }: any) => {
        this.moviesList = data.movies;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSearchChange(event: any) {
    this.page = 1;
    this.searchQuery = event.target.value;
    this.moviesService.getMoviesList(this.page, this.searchQuery).subscribe({
      next: ({ data }: any) => {
        this.moviesList = data.movies;
        this.pageLength = Math.ceil(data.movie_count);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
