import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MainComponent } from './core/components/layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { ListingComponent } from './pages/listing/listing.component';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialDesignModule } from './shared/modules/material-design/material-design.module';
import { CpfCnpjPipe } from './shared/pipes/cpf-cnpj.pipe';
import { PhoneBrPipe } from './shared/pipes/phone.pipe';
import { RgPipe } from './shared/pipes/rg.pipe';

@NgModule({ declarations: [
        AppComponent,
        MainComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        RegisterComponent,
        ListingComponent,
        CpfCnpjPipe,
        RgPipe,
        PhoneBrPipe,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialDesignModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        NgxMaskDirective], providers: [provideNgxMask(), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
