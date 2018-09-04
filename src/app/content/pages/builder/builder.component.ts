import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LayoutConfigService } from '../../../core/services/layout-config.service';

@Component({
	selector: 'm-builder',
	templateUrl: './builder.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuilderComponent implements OnInit {
	@Input() model: any;
	@ViewChild('builderForm') form: NgForm;

	constructor(
		private layoutConfigService: LayoutConfigService,
	) {
		this.layoutConfigService.onLayoutConfigUpdated$.subscribe(config => {
			this.model = config.config;
		});
	}

	ngOnInit(): void {}

	//HACE PREVIEW Y ESTABLECE LA CONF

	//RESET PREVIEW(): REMUEVE ITEM DEL LOCALSTORAGE Y ACTUALIZA LA PÁGINA
}
