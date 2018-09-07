import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,  ViewChild, OnInit } from '@angular/core';
import { SplashScreenService } from './core/services/splash-screen.service';
import { AclService } from './core/services/acl.service'; //SERVICIO DE AUTENTICACIÓN

@Component({
	selector: 'body[m-root]',
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnInit {
	title = 'Metronic';

	@ViewChild('splashScreen') splashScreen: ElementRef; //REFERENCIA


	splashScreenImage: string;

	constructor(
		private splashScreenService: SplashScreenService,
		private aclService: AclService
	) {}

	ngOnInit(){
	}
	//CUANDO SE HA INICIALIZADO POR COMPLETO EL APP.COMPONENT
	ngAfterViewInit(): void {
		if (this.splashScreen) {
			this.splashScreenService.init(this.splashScreen.nativeElement);
		}
	}
}
