import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthInterceptor } from '@app/interceptors/auth/auth.interceptor';
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
    ...INTERCEPTORS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
