import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { UserGuard } from './core/auth/guards/auth-user.guard';
import { CoreModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
  url: environment.backendUrl,
  options: { transports: ['websocket'] },
};
@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CoreModule,
    SharedModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    UserGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
