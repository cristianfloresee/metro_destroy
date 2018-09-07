// ANGULAR IMPORTS
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
// RXJS
import { filter } from 'rxjs/operators';
//DIRECTIVA
import { MenuAsideOffcanvasDirective } from '../../../core/directives/menu-aside-offcanvas.directive';
// SERVICIOS
import { LayoutRefService } from '../../../core/services/layout/layout-ref.service';

@Component({
	selector: 'm-aside-left',
	templateUrl: './aside-left.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideLeftComponent implements OnInit, AfterViewInit {

	@HostBinding('attr.mMenuAsideOffcanvas') mMenuAsideOffcanvas: MenuAsideOffcanvasDirective;

	menu_items;
	currentRouteUrl: string = '';
	insideTm: any;
	outsideTm: any;

	constructor(
		private el: ElementRef,
		private router: Router,
		private layoutRefService: LayoutRefService,
		@Inject(DOCUMENT) private document: Document
	) {
		this.menu_items = [
			{
				title: 'Inicio',
				desc: 'Some description goes here',
				root: true,
				icon: 'flaticon-line-graph',
				page: '/',
				badge: {type: 'm-badge--danger', value: '2'},
				translate: 'Dashboard'
			},
			{section: 'Components'},
			{
				title: 'Google Material',
				root: true,
				bullet: 'dot',
				icon: 'flaticon-interface-7',
				submenu: [
					{
						title: 'Form Controls',
						bullet: 'dot',
						submenu: [
							{
								title: 'Auto Complete',
								page: '/material/form-controls/autocomplete'
							},
							{
								title: 'Checkbox',
								page: '/material/form-controls/checkbox'
							},
							{
								title: 'Radio Button',
								page: '/material/form-controls/radiobutton'
							},
							{
								title: 'Datepicker',
								page: '/material/form-controls/datepicker'
							},
							{
								title: 'Form Field',
								page: '/material/form-controls/formfield'
							},
							{
								title: 'Input',
								page: '/material/form-controls/input'
							},
							{
								title: 'Select',
								page: '/material/form-controls/select'
							},
							{
								title: 'Slider',
								page: '/material/form-controls/slider'
							},
							{
								title: 'Slider Toggle',
								page:
									'/material/form-controls/slidertoggle'
							}
						]
					},
					{
						title: 'Navigation',
						bullet: 'dot',
						submenu: [
							{
								title: 'Menu',
								page: '/material/navigation/menu'
							},
							{
								title: 'Sidenav',
								page: '/material/navigation/sidenav'
							},
							{
								title: 'Toolbar',
								page: '/material/navigation/toolbar'
							}
						]
					},
					{
						title: 'Layout',
						bullet: 'dot',
						submenu: [
							{
								title: 'Card',
								page: '/material/layout/card'
							},
							{
								title: 'Divider',
								page: '/material/layout/divider'
							},
							{
								title: 'Expansion panel',
								page: '/material/layout/expansion-panel'
							},
							{
								title: 'Grid list',
								page: '/material/layout/grid-list'
							},
							{
								title: 'List',
								page: '/material/layout/list'
							},
							{
								title: 'Tabs',
								page: '/material/layout/tabs'
							},
							{
								title: 'Stepper',
								page: '/material/layout/stepper'
							},
							{
								title: 'Default Forms',
								page: '/material/layout/default-forms'
							},
							{
								title: 'Tree',
								page: '/material/layout/tree'
							}
						]
					},
					{
						title: 'Buttons & Indicators',
						bullet: 'dot',
						submenu: [
							{
								title: 'Button',
								page:
									'/material/buttons-and-indicators/button'
							},
							{
								title: 'Button toggle',
								page:
									'/material/buttons-and-indicators/button-toggle'
							},
							{
								title: 'Chips',
								page:
									'/material/buttons-and-indicators/chips'
							},
							{
								title: 'Icon',
								page:
									'/material/buttons-and-indicators/icon'
							},
							{
								title: 'Progress bar',
								page:
									'/material/buttons-and-indicators/progress-bar'
							},
							{
								title: 'Progress spinner',
								page:
									'/material/buttons-and-indicators/progress-spinner'
							}
						]
					},
					{
						title: 'Popups & Modals',
						bullet: 'dot',
						submenu: [
							{
								title: 'Bottom sheet',
								page:
									'/material/popups-and-modals/bottom-sheet'
							},
							{
								title: 'Dialog',
								page:
									'/material/popups-and-modals/dialog'
							},
							{
								title: 'Snackbar',
								page:
									'/material/popups-and-modals/snackbar'
							},
							{
								title: 'Tooltip',
								page:
									'/material/popups-and-modals/tooltip'
							}
						]
					},
					{
						title: 'Data table',
						bullet: 'dot',
						submenu: [
							{
								title: 'Paginator',
								page: '/material/data-table/paginator'
							},
							{
								title: 'Sort header',
								page: '/material/data-table/sort-header'
							},
							{
								title: 'Table',
								page: '/material/data-table/table'
							}
						]
					}
				]
			},
			{
				title: 'Ng-Bootstrap',
				root: true,
				bullet: 'dot',
				icon: 'flaticon-multimedia-1',
				submenu: [
					{
						title: 'Accordion',
						page: '/ngbootstrap/accordion'
					},
					{
						title: 'Alert',
						page: '/ngbootstrap/alert'
					},
					{
						title: 'Buttons',
						page: '/ngbootstrap/buttons'
					},
					{
						title: 'Carousel',
						page: '/ngbootstrap/carousel'
					},
					{
						title: 'Collapse',
						page: '/ngbootstrap/collapse'
					},
					{
						title: 'Datepicker',
						page: '/ngbootstrap/datepicker'
					},
					{
						title: 'Dropdown',
						page: '/ngbootstrap/dropdown'
					},
					{
						title: 'Modal',
						page: '/ngbootstrap/modal'
					},
					{
						title: 'Pagination',
						page: '/ngbootstrap/pagination'
					},
					{
						title: 'Popover',
						page: '/ngbootstrap/popover'
					},
					{
						title: 'Progressbar',
						page: '/ngbootstrap/progressbar'
					},
					{
						title: 'Rating',
						page: '/ngbootstrap/rating'
					},
					{
						title: 'Tabs',
						page: '/ngbootstrap/tabs'
					},
					{
						title: 'Timepicker',
						page: '/ngbootstrap/timepicker'
					},
					{
						title: 'Tooltips',
						page: '/ngbootstrap/tooltip'
					},
					{
						title: 'Typehead',
						page: '/ngbootstrap/typehead'
					}
				]
			},
			{
				title: 'Metronic',
				root: true,
				bullet: 'dot',
				icon: 'flaticon-interface-8',
				submenu: [
					{
						title: 'Accordion',
						page: '/metronic/accordion'
					},
					{
						title: 'Sticky Form Actions',
						page: '/metronic/sticky-form-actions'
					},
					{
						title: 'Forms',
						page: '/metronic/forms'
					}
				]
			},
			{section: 'Applications'},
			{
				title: 'eCommerce',
				bullet: 'dot',
				icon: 'flaticon-business',
				root: true,
				submenu: [
					{
						title: 'Customers',
						page: '/ecommerce/customers'
					},
					{
						title: 'Orders',
						page: '/ecommerce/orders'
					},
					{
						title: 'Products',
						page: '/ecommerce/products'
					},
				]
			},
			// {
			// 	title: 'User Management',
			// 	root: true,
			// 	bullet: 'dot',
			// 	icon: 'flaticon-user',
			// 	page: '/user-management'
			// },
			// {
			// 	title: 'Audit Log',
			// 	root: true,
			// 	bullet: 'dot',
			// 	icon: 'flaticon-interface-5',
			// 	page: '/audit-log'
			// },
			{section: 'Pages'},
			{
				title: 'User',
				root: true,
				bullet: 'dot',
				icon: 'flaticon-interface-1',
				submenu: [
					{
						title: 'Profile',
						page: '/profile'
					},
				]
			},
			{
				title: 'Error',
				root: true,
				bullet: 'dot',
				icon: 'flaticon-interface-2',
				submenu: [
					{
						title: 'Error-1',
						page: '/error/1'
					},
					{
						title: 'Error-2',
						page: '/error/2'
					},
					{
						title: 'Error-3',
						page: '/error/3'
					},
					{
						title: 'Error-4',
						page: '/error/4'
					},
					{
						title: 'Error-5',
						page: '/error/5'
					},
					{
						title: 'Error-6',
						page: '/error/6'
					},
				]
			},
			{section: 'Tools'},
			{
				title: 'Layout Builder',
				root: true,
				icon: 'flaticon-settings',
				page: '/builder'
			}
		]

	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.mMenuAsideOffcanvas = new MenuAsideOffcanvasDirective(this.el);
			// manually call the directives' lifecycle hook method
			this.mMenuAsideOffcanvas.ngAfterViewInit();

			// keep aside left element reference
			this.layoutRefService.addElement('asideLeft', this.el.nativeElement);
		});
	}

	ngOnInit() {
		this.currentRouteUrl = this.router.url.split(/[?#]/)[0];

		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => this.currentRouteUrl = this.router.url.split(/[?#]/)[0]);
	}

	isMenuItemIsActive(item): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		// dashboard
		if (item.page !== '/' && this.currentRouteUrl.startsWith(item.page)) {
			return true;
		}
		return this.currentRouteUrl === item.page;
	}

	isMenuRootItemIsActive(item): boolean {
		let result: boolean = false;

		for (const subItem of item.submenu) {
			result = this.isMenuItemIsActive(subItem);
			if (result) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Use for fixed left aside menu, to show menu on mouseenter event.
	 * @param e Event
	 */
	mouseEnter(e: Event) {
		// check if the left aside menu is fixed
		if (this.document.body.classList.contains('m-aside-left--fixed')) {
			if (this.outsideTm) {
				clearTimeout(this.outsideTm);
				this.outsideTm = null;
			}

			this.insideTm = setTimeout(() => {
				// if the left aside menu is minimized
				if (this.document.body.classList.contains('m-aside-left--minimize') && mUtil.isInResponsiveRange('desktop')) {
					// show the left aside menu
					this.document.body.classList.remove('m-aside-left--minimize');
					this.document.body.classList.add('m-aside-left--minimize-hover');
				}
			}, 300);
		}
	}

	/**
	 * Use for fixed left aside menu, to show menu on mouseenter event.
	 * @param e Event
	 */
	mouseLeave(e: Event) {
		if (this.document.body.classList.contains('m-aside-left--fixed')) {
			if (this.insideTm) {
				clearTimeout(this.insideTm);
				this.insideTm = null;
			}

			this.outsideTm = setTimeout(() => {
				// if the left aside menu is expand
				if (this.document.body.classList.contains('m-aside-left--minimize-hover') && mUtil.isInResponsiveRange('desktop')) {
					// hide back the left aside menu
					this.document.body.classList.remove('m-aside-left--minimize-hover');
					this.document.body.classList.add('m-aside-left--minimize');
				}
			}, 500);
		}
	}
}
