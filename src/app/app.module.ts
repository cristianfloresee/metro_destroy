// MODULOS ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
// RUTAS
import { AppRoutingModule } from './app-routing.module';

// COMPONENTES
import { AppComponent } from './app.component';

// BOOTSTRAP
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { FakeApiService } from './fake-api/fake-api.service';

// MODULOS
import { LayoutModule } from './content/layout/layout.module';
import { PartialsModule } from './content/partials/partials.module';
//import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './core/auth/authentication.module';

// ANGULAR MATERIAL
import 'hammerjs';
import { GestureConfig, MatProgressSpinnerModule } from '@angular/material';
//import { OverlayModule } from '@angular/cdk/overlay';


//import { environment } from '../environments/environment';

// SERVICIOS
import { AclService } from './core/services/acl.service';
import { LayoutConfigService } from './core/services/layout-config.service';
import { MenuConfigService } from './core/services/menu-config.service';
import { PageConfigService } from './core/services/page-config.service';
import { UtilsService } from './core/services/utils.service';
import { LogsService } from './core/services/logs.service';
import { QuickSearchService } from './core/services/quick-search.service';
import { SubheaderService } from './core/services/layout/subheader.service';
import { MenuHorizontalService } from './core/services/layout/menu-horizontal.service';
import { LayoutRefService } from './core/services/layout/layout-ref.service';
import { SplashScreenService } from './core/services/splash-screen.service';
import { DataTableService } from './core/services/datatable.service';
import { MessengerService } from './core/services/messenger.service';
import { ClipboardService } from './core/services/clipboard.sevice';

// NGX-PERFECT-SCROLLBAR
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	// suppressScrollX: true
};
// NGX-PERMISSIONS
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
	declarations: [AppComponent],
	imports: [
		//MODULOS ANGULAR
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		//environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forRoot(FakeApiService) : [],
		LayoutModule,
		PartialsModule,
		//CoreModule,
		//OverlayModule,
		AuthenticationModule,
		NgxPermissionsModule.forRoot(),
		//BOOTSTRAP
		NgbModule.forRoot(),
		//ANGULAR MATERIAL
		MatProgressSpinnerModule,
	],
	providers: [
		//SERVICIOS
		AclService,
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		PageConfigService,
		UtilsService,
		MessengerService,
		ClipboardService,
		LogsService,
		QuickSearchService,
		DataTableService,
		SplashScreenService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},

		// template services
		SubheaderService,
		MenuHorizontalService,
		// {
		// 	provide: HAMMER_GESTURE_CONFIG,
		// 	useClass: GestureConfig
		// }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
