import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MenuConfigService } from '../menu-config.service';
import * as objectPath from 'object-path';

@Injectable()
export class MenuHorizontalService {
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject([]);
	attributes: any;
	menuClasses = ' m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas m-header-menu--skin-dark m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-dark m-aside-header-menu-mobile--submenu-skin-dark';

	constructor(
		private menuConfigService: MenuConfigService,
	) {
		// get menu list
		this.menuConfigService.onMenuUpdated$.subscribe(model => {
			console.log("header items: ", objectPath.get(model.config, 'header.items'));
			this.menuList$.next(objectPath.get(model.config, 'header.items'));
		});
	}
}
