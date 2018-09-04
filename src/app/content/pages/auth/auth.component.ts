import {
	Component,
	OnInit,
	Input,
	HostBinding,
	OnDestroy,
	ElementRef
} from '@angular/core';
import { LayoutConfigService } from '../../../core/services/layout-config.service';
import { LayoutConfig } from '../../../config/layout';
import { AuthNoticeService } from '../../../core/auth/auth-notice.service';

@Component({
	selector: 'm-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
	@HostBinding('id') id = 'm_login';
	@HostBinding('class') classses: any = 'm-grid m-grid--hor m-grid--root m-page';

	@Input() action = 'login';
	today: number = Date.now();

	constructor(
		private layoutConfigService: LayoutConfigService,
		public authNoticeService: AuthNoticeService,
		private el: ElementRef
	) { }

	ngOnInit(): void {
		this.el.nativeElement.parentElement.className = 'm-content--skin-light m-header--static';
	}

	ngOnDestroy(): void {
		this.el.nativeElement.parentElement.className = 'm-page--fluid m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default m-scroll-top--shown';
	}

	register() {
		this.action = 'register';
	}
}
