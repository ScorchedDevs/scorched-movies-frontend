import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoviesService } from '../../movies.service';
import { ToolbarComponent } from 'src/app/core/toolbar/toolbar.component';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss'],
})
export class MovieDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly moviesService: MoviesService
  ) {}

  image!: string;
  title!: string;
  description!: string;
  torrents!: any[];

  async ngOnInit(): Promise<void> {
    this.image = this.data.large_cover_image;
    this.title = this.data.title;
    this.description = this.data.summary;
    this.torrents = this.data.torrents;
  }

  onDownloadClick(torrent: any, movie: any) {
    this.moviesService.downloadMovie(torrent, movie).subscribe({
      next: ({ data }: any) => {
        console.log(data.message);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
