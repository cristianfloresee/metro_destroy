import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuConfig } from '../../config/menu';

@Injectable()
export class MenuConfigService {
	public configModel: MenuConfig = new MenuConfig(); //MENU POR DEFECTO?
	public onMenuUpdated$: BehaviorSubject<MenuConfig> = new BehaviorSubject(
		this.configModel
	);
	menuHasChanged: any = false;

	constructor() { }


	setModel(menuModel: MenuConfig) {
		console.log("setmodel del menu: ", menuModel);
		this.configModel = Object.assign(this.configModel, menuModel);
		this.onMenuUpdated$.next(this.configModel);
		this.menuHasChanged = true;
	}

	resetModel() {
		this.configModel = new MenuConfig();
		this.onMenuUpdated$.next(this.configModel);
		this.menuHasChanged = false;
	}
}
