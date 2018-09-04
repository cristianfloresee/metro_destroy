import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,  ViewChild } from '@angular/core';
import { SplashScreenService } from './core/services/splash-screen.service';
import { AclService } from './core/services/acl.service';

// LIST KNOWN ISSUES
// [Violation] Added non-passive event listener; https://github.com/angular/angular/issues/8866

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[m-root]',
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
	title = 'Metronic';

	@ViewChild('splashScreen', {read: ElementRef})
	splashScreen: ElementRef;
	splashScreenImage: string;

	constructor(
		private splashScreenService: SplashScreenService,
		private aclService: AclService
	) {}

	ngAfterViewInit(): void {
		if (this.splashScreen) {
			this.splashScreenService.init(this.splashScreen.nativeElement);
		}
	}
}
