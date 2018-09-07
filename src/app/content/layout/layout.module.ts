// MODULOS ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//COMPONENTES LAYOUT
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { AsideLeftComponent } from './aside/aside-left.component';
//COMPONENTES LAYOUT > ASIDE
import { MenuSectionComponent } from './aside/menu-section/menu-section.component';
//COMPONENTES LAYOUT > HEADER
import { BrandComponent } from './header/brand/brand.component';
import { TopbarComponent } from './header/topbar/topbar.component';
import { MenuHorizontalComponent } from './header/menu-horizontal/menu-horizontal.component';
import { HeaderSearchComponent } from './header/header-search/header-search.component';
//COMPONENTES LAYOUT > HEADER > TOPBAR
import { UserProfileComponent } from './header/topbar/user-profile/user-profile.component';
import { SearchDropdownComponent } from './header/topbar/search-dropdown/search-dropdown.component';
import { NotificationComponent } from './header/topbar/notification/notification.component';
import { QuickActionComponent } from './header/topbar/quick-action/quick-action.component';

//MODULOS
import { CoreModule } from '../../core/core.module';
import { ListTimelineModule } from '../partials/layout/quick-sidebar/list-timeline/list-timeline.module';

//LOADING-BAR
import { LoadingBarModule } from '@ngx-loading-bar/core';
//BOOTSTRAP
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//ANGULAR MATERIAL
import { MatProgressBarModule, MatTabsModule, MatButtonModule, MatTooltipModule } from '@angular/material';
//PERFECT-SCROLLBAR
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	// suppressScrollX: true
};

@NgModule({
	declarations: [
		//COMPONENTES LAYOUT
		HeaderComponent,
		FooterComponent,
		SubheaderComponent,
		AsideLeftComponent,
		//COMPONENTES LAYOUT > ASIDE
		MenuSectionComponent,
		//COMPONENTES LAYOUT > HEADER
		BrandComponent,
		MenuHorizontalComponent,
		HeaderSearchComponent,
		//COMPONENTES LAYOUT > HEADER > TOPBAR
		TopbarComponent,
		UserProfileComponent,
		SearchDropdownComponent,
		NotificationComponent,
		QuickActionComponent,
	],
	exports: [
		//COMPONENTES LAYOUT
		HeaderComponent,
		FooterComponent,
		SubheaderComponent,
		AsideLeftComponent,
		//COMPONENTES LAYOUT > ASIDE
		MenuSectionComponent,
		//COMPONENTES LAYOUT > HEADER
		BrandComponent,
		MenuHorizontalComponent,
		HeaderSearchComponent,
		//COMPONENTES LAYOUT > HEADER > TOPBAR
		TopbarComponent,
		UserProfileComponent,
		SearchDropdownComponent,
		NotificationComponent,
		QuickActionComponent,
	],
	providers: [
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		}
	],
	imports: [
		//MODULOS ANGULAR
		CommonModule,
		RouterModule,
		FormsModule,
		//
		CoreModule,
		ListTimelineModule,
		//PERFECT-SCROLL
		PerfectScrollbarModule,
		//BOOTSTRAP
		NgbModule,
		//ANGULAR MATERIAL
		MatProgressBarModule,
		MatTabsModule,
		MatButtonModule,
		MatTooltipModule,
		//LOADING-BAR
		LoadingBarModule.forRoot(),
	]
})
export class LayoutModule {}
