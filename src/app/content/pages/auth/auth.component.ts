import {
	Component,
	OnInit,
	Input,
	HostBinding,
	OnDestroy
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
	) {}

	ngOnInit(): void {
		// set login layout to blank

		//DEJA EL CONFIG DEL SERVICIO CON ESTA CONF content_ {skin: ''}
		this.layoutConfigService.setModel(new LayoutConfig({ content: { skin: '' } }));

	}

	ngOnDestroy(): void {
		// RESETA LA CONFIGURACIÓN CON LA CONF POR DEFECTO CUANDO PASA EL LOGIN
		this.layoutConfigService.setModel(new LayoutConfig());
	}

	register() {
		this.action = 'register';
	}
}
