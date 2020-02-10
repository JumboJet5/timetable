import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { AuthInterceptor } from '@app/interceptors/auth/auth.interceptor';
import { AuthService } from '@app/service/auth/auth.service';
import { FormatService } from '@app/service/format/format.service';
import { PopupService } from '@app/service/modal/popup.service';
import { ScheduleService } from '@app/service/schedule/schedule.service';
import { environment } from '@environment/environment';

const INTERCEPTORS = environment.production ? [] : [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    FormatService,
    PopupService,
    ScheduleService,
    ...INTERCEPTORS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
