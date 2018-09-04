import { Injectable } from '@angular/core';
import { LayoutConfigService } from '../layout-config.service';
import { ClassInitService } from '../class-init.service';
import * as objectPath from 'object-path';

@Injectable()
export class HeaderService {
	// class for the header container
	containerClass: string;
	// class for the header menu close
	headerMenuCloseClass: boolean;
	// toggle to display menu on header
	menuHeaderDisplay: boolean;

	// minimize enabled
	attrMinimizeDesktopEnabled: boolean;
	attrMinimizeMobileEnabled: boolean;
	// minimize offset
	attrMinimizeOffset: string = '200';
	// minimize offset on mobile
	attrMinimizeMobileOffset: string = '200';

	constructor(
		private layoutConfigService: LayoutConfigService,
		private classInitService: ClassInitService
	) {
		// subscribe to classes update
		this.classInitService.onClassesUpdated$.subscribe(classes => {
			this.headerMenuCloseClass = classes.header_menu_close.join(' ');
			//console.log("header menu close class: ", this.classInitService);
		});

		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
			const config = model.config;

			let containerClass = ['m-container', 'm-container--full-height'];

			containerClass.push('m-container--fluid');

			this.containerClass = containerClass.join(' ');

			// get menu header display option
			this.menuHeaderDisplay = objectPath.get(config, 'menu.header.display');

			// minimize desktop/mobile
			this.attrMinimizeDesktopEnabled = objectPath.get(config, 'header.self.fixed.minimize.desktop.enabled');
			this.attrMinimizeMobileEnabled = objectPath.get(config, 'header.self.fixed.minimize.mobile.enabled');

			this.attrMinimizeOffset = objectPath.get(config, 'header.self.fixed.minimize.desktop.offset');
			this.attrMinimizeMobileOffset = objectPath.get(config, 'header.self.fixed.minimize.mobile.offset');
		});
	}
}
