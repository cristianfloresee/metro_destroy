import {
	Component,
	HostBinding
} from '@angular/core';


@Component({
	selector: 'm-header-search',
	templateUrl: './header-search.component.html'
})
export class HeaderSearchComponent {
	// tslint:disable-next-line:max-line-length
	@HostBinding('class') classes = 'm-stack__item m-stack__item--middle m-dropdown m-dropdown--arrow m-dropdown--large m-dropdown--mobile-full-width m-dropdown--align-right m-dropdown--skin-light m-header-search m-header-search--expandable m-header-search--skin-';
	@HostBinding('attr.m-quicksearch-mode') attrQuickSearchMode = 'default';

	constructor() {}

}
