interface DownloadContent {
  movieId: string;
  downloadedAmount: string;
}

export interface Download {
  userId: string;
  content: DownloadContent;
}
