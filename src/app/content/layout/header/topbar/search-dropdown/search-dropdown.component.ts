import {
	Component,
	OnInit,
	HostBinding,
	OnDestroy,
	ElementRef,
	AfterViewInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { QuickSearchDirective } from '../../../../../core/directives/quick-search.directive';
import { QuickSearchService } from '../../../../../core/services/quick-search.service';

@Component({
	selector: 'm-search-dropdown',
	templateUrl: './search-dropdown.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDropdownComponent
	implements OnInit, OnDestroy, AfterViewInit {
	onSearch: Subscription;

	/**
	 * Hack way to call directive programatically for the host
	 * https://stackoverflow.com/questions/41298168/how-to-dynamically-add-a-directive
	 * The official feature support is still pending
	 * https://github.com/angular/angular/issues/8785
	 */
	@HostBinding('attr.mQuickSearch') mQuickSearchDirective: QuickSearchDirective;

	constructor(
		private el: ElementRef,
		private quickSearchService: QuickSearchService
	) {}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.onSearch.unsubscribe();
	}

	ngAfterViewInit(): void {
		Promise.resolve(null).then(() => {
			this.mQuickSearchDirective = new QuickSearchDirective(this.el);
			this.mQuickSearchDirective.ngAfterViewInit();

			// listen to search event
			this.onSearch = this.mQuickSearchDirective.onSearch$.subscribe(
				(mQuickSearch: any) => {
					mQuickSearch.showProgress();
					this.quickSearchService.search().subscribe(result => {
						// append search result
						mQuickSearch.showResult(result[0]);
						mQuickSearch.hideProgress();
					});
				}
			);
		});
	}
}
