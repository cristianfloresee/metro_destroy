// ANGULAR IMPORTS
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
// LOADING-BAR
import { LoadingBarService } from '@ngx-loading-bar/core';
// SERVICIOS
//import { LayoutRefService } from '../../../core/services/layout/layout-ref.service';


@Component({
	selector: 'm-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {

	@ViewChild('mHeader') mHeader: ElementRef;

	constructor(
		private router: Router,
		//private layoutRefService: LayoutRefService,
		public loader: LoadingBarService
	) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) this.loader.start();
			if (event instanceof RouteConfigLoadStart) this.loader.increment(35);
			if (event instanceof RouteConfigLoadEnd) this.loader.increment(75);
			if (event instanceof NavigationEnd || event instanceof NavigationCancel) this.loader.complete();
		 });
	}


	// SE EJECUTA UNA VEZ QUE SE HA INICIALIZADO COMPLETAMENTE... PUEDO BORRARLO?
	ngAfterViewInit(): void {
		// MANTIENE EL ELEMENTO DE ENCABEZADO EN EL SERVICIO??
		//this.layoutRefService.addElement('header', this.mHeader.nativeElement); //LE AVIZA ALGO A LAS DIRECTIVAS: PORTLET Y MENU-ASIDE
		//SI BORRO ESTO NO PUEDO ABRIR LOS ELEMENTOS DE ACORDION DEL SIDEMENU
	}
}
