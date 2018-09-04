import { ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'm-brand',
	templateUrl: './brand.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandComponent {

	constructor(
		@Inject(DOCUMENT) private document: Document
	) {
	}

	// BOTON 3 PUNTOS SUSPNESIVOS (EN MOVIL): MUESTRA U OCULTA EL SUBHEADER (EN MOVIL)
	clickTopbarToggle(event: Event): void {
		this.document.body.classList.toggle('m-topbar--on');
	}
}
