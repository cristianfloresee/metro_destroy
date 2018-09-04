import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LayoutConfig } from '../../config/layout';

@Injectable()
export class LayoutConfigService {
	public layoutConfig: LayoutConfig;

	public onLayoutConfigUpdated$: BehaviorSubject<LayoutConfig>;

	constructor() {
		// default config
		this.layoutConfig = new LayoutConfig();
		// register on config changed event and set default config
		this.onLayoutConfigUpdated$ = new BehaviorSubject(this.layoutConfig);
	}

	/**
	 * Reset existing configurations
	 * NOTE: This method will remove older config and pass only new;
	 * @param model
	 * @param doNotSave
	 */
	setModel(model: any/*, doNotSave?: boolean*/): void {
		// merge and replace existing config object
		// deep merge for mutltidimentional arrays
		this.layoutConfig = Object.assign({}, this.layoutConfig, model);

		// fire off an event that all subscribers will listen
		this.onLayoutConfigUpdated$.next(this.layoutConfig);
	}

}
