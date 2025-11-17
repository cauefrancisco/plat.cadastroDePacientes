import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { bootstrapGithub, bootstrapHouse, bootstrapPersonFill } from '@ng-icons/bootstrap-icons'; // Import specific icons
import { NgIconsModule } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedBackModalComponent } from './core/componets/feed-back-modal/feed-back-modal.component';
import { FooterComponent } from './core/layout/components/footer/footer.component';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { MainComponent } from './core/layout/main/main.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ListingComponent } from './pages/listing/listing.component';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialDesignModule } from './shared/modules/material-design/material-design.module';
import { CpfCnpjPipe } from './shared/pipes/cpf-cnpj.pipe';
import { PhoneBrPipe } from './shared/pipes/phone.pipe';
import { RgPipe } from './shared/pipes/rg.pipe';


@NgModule({
    declarations: [
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
        FeedBackModalComponent,
        EditComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialDesignModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        NgxMaskDirective,
        NgIconsModule.withIcons({ heroUsers, bootstrapHouse, bootstrapPersonFill, bootstrapGithub })
    ],
    providers: [provideNgxMask(), provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
