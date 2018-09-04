// MODULOS ANGULAR
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULOS
import { LayoutModule } from '../layout/layout.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PartialsModule } from '../partials/partials.module';
import { CoreModule } from '../../core/core.module';

// COMPONENTES
import { PagesComponent } from './pages.component';
import { ActionComponent } from './header/action/action.component';
import { ProfileComponent } from './header/profile/profile.component';
import { MailModule } from './components/apps/mail/mail.module';
import { ECommerceModule } from './components/apps/e-commerce/e-commerce.module';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';

// LIBRERÍA EXTERNA
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
	declarations: [
		PagesComponent,
		ActionComponent,
		ProfileComponent,
		ErrorPageComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PagesRoutingModule,
		CoreModule,
		LayoutModule,
		PartialsModule,
		MailModule,
		ECommerceModule,
		AngularEditorModule,
	],
	providers: []
})
export class PagesModule {}
