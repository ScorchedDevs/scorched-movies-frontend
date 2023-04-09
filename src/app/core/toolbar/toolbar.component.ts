import {
  Component,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MoviesService } from 'src/app/features/movies/movies.service';
import { Socket } from 'ngx-socket-io';
import { Download } from '../models/download.model';
import { map } from 'rxjs';
import { DownloadService } from './download.service';
import { MessageType } from '../models/download.type.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  userMovies!: any;
  private userMoviesDiffer!: KeyValueDiffer<string, any>;
  download!: Download;
  badgeHidden = true;
  badgeNumber = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly moviesService: MoviesService,
    private readonly downloadService: DownloadService,
    private readonly differs: KeyValueDiffers
  ) {}

  async ngOnInit(): Promise<void> {
    this.reloadDownloadingMovies();
    this.userMoviesDiffer = this.differs.find(this.userMovies).create();

    this.downloadService.getNewMessage('message').subscribe((message: any) => {
      if (message.type === MessageType.DOWNLOAD_ADDED) {
        this.reloadDownloadingMovies();
        this.userMovies.forEach((movie: any) => {
          if (movie.id === message.id) {
            ++this.badgeNumber;
            this.badgeHidden = false;
          }
        });
      } else if (message.type === MessageType.DOWNLOAD_PROGRESS) {
        this.refreshDownloadProgress(message);
      } else if (message.type === MessageType.DOWNLOAD_FINISHED) {
        ++this.badgeNumber;
        this.badgeHidden = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  userMoviesChanged(changes: KeyValueChanges<string, any>) {
    ++this.badgeNumber;
    this.badgeHidden = false;
  }

  reloadDownloadingMovies() {
    this.moviesService.getUserMovies().subscribe({
      next: (response) => {
        this.userMovies = response;
        this.userMovies.forEach((movie: any) => {
          movie.downloaded = {
            downloadedAmount: 0,
            downloadSpeed: 0,
          };
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  refreshDownloadProgress(message: any) {
    this.userMovies.forEach((movie: any) => {
      if (movie.id === message.id) {
        movie.downloaded = {
          downloadedAmount: message.content.downloadedAmount,
          downloadSpeed: message.content.downloadSpeed,
        };
      }
    });
  }

  clickOnDownloadManager() {
    this.badgeHidden = true;
    this.badgeNumber = 0;
  }
}
