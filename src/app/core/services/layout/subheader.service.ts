// ANGULAR IMPORTS
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// SERVICIOS
import { PageConfigService } from '../page-config.service';
//import { MenuConfigService } from '../menu-config.service';

// RXJS
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

// MODELOS
import { Breadcrumb } from '../../models/breadcrumb';

// LIBRERÍA TERCEROS
import * as objectPath from 'object-path';

@Injectable()
export class SubheaderService {
	title$: BehaviorSubject<string> = new BehaviorSubject('');
	breadcrumbs$: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject([]);
	disabled$: Subject<boolean> = new Subject<boolean>(); //RETORNA SIEMPRE UN BOOLEAN

	private manualBreadcrumbs: any = {};
	private appendingBreadcrumbs: any = {};
	private manualTitle: any = {};

	private asideMenus: any = {
		self: {},
		items: [
			{
				title: 'Dashboard',
				desc: 'Some description goes here',
				root: true,
				icon: 'flaticon-line-graph',
				page: '/',
				badge: { type: 'm-badge--danger', value: '2' },
			},
			{ section: 'Components' },
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
			{ section: 'Applications' },
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
			{ section: 'Pages' },
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
			{ section: 'Tools' },
			{
				title: 'Layout Builder',
				root: true,
				icon: 'flaticon-settings',
				page: '/builder'
			}
		]
	};
	private headerMenus: any = {
		self: {},
		items: [
			{
				title: 'Actions',
				root: true,
				icon: 'flaticon-add',
				toggle: 'click',
				submenu: {
					type: 'classic',
					alignment: 'left',
					items: [
						{
							title: 'Create New Post',
							page: '/header/actions',
							icon: 'flaticon-file',
							aside: {
								self: {
									bullet: 'dot'
								},
								items: [
									{
										section: 'Departments'
									},
									{
										title: 'Resources',
										desc: '',
										icon: 'flaticon-layers',
										bullet: 'dot',
										root: true,
										submenu: [
											{
												title: 'Create New Post',
												page: '/header/actions',
											},
											{
												title: 'Timesheet',
												tooltip: 'Non functional dummy link',
											},
											{
												title: 'Payroll',
												tooltip: 'Non functional dummy link',
											},
											{
												title: 'Contacts',
												tooltip: 'Non functional dummy link',
											}
										]
									}
								]
							}
						},
						{
							title: 'Generate Reports',
							tooltip: 'Non functional dummy link',
							icon: 'flaticon-diagram',
							badge: {
								type: 'm-badge--success',
								value: '2'
							},
						},
						{
							title: 'Manage Orders',
							icon: 'flaticon-business',
							submenu: {
								type: 'classic',
								alignment: 'right',
								bullet: 'line',
								items: [
									{
										title: 'Latest Orders',
										tooltip: 'Non functional dummy link',
										icon: '',
									},
									{
										title: 'Pending Orders',
										tooltip: 'Non functional dummy link',
										icon: '',
									},
									{
										title: 'Processed Orders',
										tooltip: 'Non functional dummy link',
										icon: '',
									},
									{
										title: 'Delivery Reports',
										tooltip: 'Non functional dummy link',
										icon: '',
									},
									{
										title: 'Payments',
										tooltip: 'Non functional dummy link',
										icon: '',
									},
									{
										title: 'Customers',
										tooltip: 'Non functional dummy link',
										icon: '',
									}
								]
							}
						},
						{
							title: 'Customer Feedbacks',
							page: '/#',
							icon: 'flaticon-chat-1',
							submenu: {
								type: 'classic',
								alignment: 'right',
								bullet: 'dot',
								items: [
									{
										title: 'Customer Feedbacks',
										tooltip: 'Non functional dummy link',
										icon: '',
									},
									{
										title: 'Supplier Feedbacks',
										tooltip: 'Non functional dummy link',
										icon: '',
									},
									{
										title: 'Reviewed Feedbacks',
										tooltip: 'Non functional dummy link',
										icon: '',
									},
									{
										title: 'Resolved Feedbacks',
										tooltip: 'Non functional dummy link',
										icon: '',
									},
									{
										title: 'Feedback Reports',
										tooltip: 'Non functional dummy link',
										icon: '',
									}
								]
							}
						},
						{
							title: 'Register Member',
							tooltip: 'Non functional dummy link',
							icon: 'flaticon-users',
						}
					]
				}
			},
			{
				title: 'Reports',
				root: true,
				icon: 'flaticon-line-graph',
				toggle: 'click',
				submenu: {
					type: 'mega',
					width: '1000px',
					alignment: 'left',
					columns: [
						{
							heading: {
								heading: true,
								title: 'Finance Reports',
							},
							items: [
								{
									title: 'Annual Reports',
									tooltip: 'Non functional dummy link',
									icon: 'flaticon-map',
								},
								{
									title: 'HR Reports',
									tooltip: 'Non functional dummy link',
									icon: 'flaticon-user',
								},
								{
									title: 'IPO Reports',
									tooltip: 'Non functional dummy link',
									icon: 'flaticon-clipboard',
								},
								{
									title: 'Finance Margins',
									tooltip: 'Non functional dummy link',
									icon: 'flaticon-graphic-1',
								},
								{
									title: 'Revenue Reports',
									tooltip: 'Non functional dummy link',
									icon: 'flaticon-graphic-2',
								}
							]
						},
						{
							bullet: 'line',
							heading: {
								heading: true,
								title: 'Project Reports',
							},
							items: [
								{
									title: 'Coca Cola CRM',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title:
										'Delta Airlines Booking Site',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Malibu Accounting',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Vineseed Website Rewamp',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Zircon Mobile App',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Mercury CMS',
									tooltip: 'Non functional dummy link',
									icon: '',
								}
							]
						},
						{
							bullet: 'dot',
							heading: {
								heading: true,
								title: 'HR Reports',
							},
							items: [
								{
									title: 'Staff Directory',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Client Directory',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Salary Reports',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Staff Payslips',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Corporate Expenses',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Project Expenses',
									tooltip: 'Non functional dummy link',
									icon: '',
								}
							]
						},
						{
							heading: {
								heading: true,
								title: 'Reporting Apps',
								icon: '',
							},
							items: [
								{
									title: 'Report Adjusments',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Sources & Mediums',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Reporting Settings',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Conversions',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Report Flows',
									tooltip: 'Non functional dummy link',
									icon: '',
								},
								{
									title: 'Audit & Logs',
									tooltip: 'Non functional dummy link',
									icon: '',
								}
							]
						}
					]
				}
			},
			{
				title: 'Apps',
				root: true,
				icon: 'flaticon-paper-plane',
				toggle: 'click',
				badge: {
					type: 'm-badge--brand m-badge--wide',
					value: 'new'
				},
				submenu: {
					type: 'classic',
					alignment: 'left',
					items: [
						{
							title: 'eCommerce',
							tooltip: 'Non functional dummy link',
							icon: 'flaticon-business',
							submenu: {
								type: 'classic',
								alignment: 'right',
								items: [
									{
										title: 'Customers',
										page: '/ecommerce/customers',
										icon: 'flaticon-users',
									},
									{
										title: 'Orders',
										page: '/ecommerce/orders',
										icon: 'flaticon-interface-1',
									},
									{
										title: 'Products',
										page: '/ecommerce/products',
										icon: 'flaticon-list-1',
									}
								]
							}
						},
						{
							title: 'Audience',
							page: '/crud/datatable_v1',
							icon: 'flaticon-computer',
							submenu: {
								type: 'classic',
								alignment: 'right',
								items: [
									{
										title: 'Active Users',
										tooltip: 'Non functional dummy link',
										icon: 'flaticon-users',
									},
									{
										title: 'User Explorer',
										tooltip: 'Non functional dummy link',
										icon: 'flaticon-interface-1',
									},
									{
										title: 'Users Flows',
										tooltip: 'Non functional dummy link',
										icon: 'flaticon-lifebuoy',
									},
									{
										title: 'Market Segments',
										tooltip: 'Non functional dummy link',
										icon: 'flaticon-graphic-1',
									},
									{
										title: 'User Reports',
										tooltip: 'Non functional dummy link',
										icon: 'flaticon-graphic',
									}
								]
							}
						},
						{
							title: 'Marketing',
							tooltip: 'Non functional dummy link',
							icon: 'flaticon-map',
						},
						{
							title: 'Campaigns',
							tooltip: 'Non functional dummy link',
							icon: 'flaticon-graphic-2',
							badge: {
								type: 'm-badge--success',
								value: '3'
							}
						},
						{
							title: 'Cloud Manager',
							tooltip: 'Non functional dummy link',
							icon: 'flaticon-infinity',
							submenu: {
								type: 'classic',
								alignment: 'left',
								items: [
									{
										title: 'File Upload',
										tooltip: 'Non functional dummy link',
										icon: 'flaticon-add',
										badge: {
											type: 'm-badge--danger',
											value: '3'
										}
									},
									{
										title: 'File Attributes',
										tooltip: 'Non functional dummy link',
										icon: 'flaticon-signs-1',
									},
									{
										title: 'Folders',
										tooltip: 'Non functional dummy link',
										icon: 'flaticon-folder',
									},
									{
										title: 'System Settings',
										tooltip: 'Non functional dummy link',
										icon: 'flaticon-cogwheel-2',
									}
								]
							}
						}
					]
				}
			}
		]
	};
	private config: any;
	pageConfig: any;

	constructor(
		private router: Router,
		private pageConfigService: PageConfigService,
		//private menuConfigService: MenuConfigService,
	) {
		// get updated title current page config
		this.pageConfigService.onPageUpdated$.subscribe(model => {
			this.config = model.config;
			this.pageConfig = objectPath.get(this.config, this.router.url.substring(1).replace(/\//g, '.') || '/');

			// update page title on initial page load
			this.title$.next(objectPath.get(this.pageConfig, 'page.title'));

			// subheader enable/disable
			const hideSubheader = objectPath.get(this.pageConfig, 'page.subheader');
			setTimeout(() => this.disabled$.next(typeof hideSubheader !== 'undefined' && !hideSubheader));
		});

		// this.menuConfigService.onMenuUpdated$.subscribe(model => {
		// 	console.log("aqui en subheader service: ", objectPath.get(model, 'config.header'));
		// 	this.headerMenus = objectPath.get(model, 'config.header');
		// 	this.asideMenus = objectPath.get(model, 'config.aside');
		// 	// update breadcrumb on initial page load
		// 	this.updateBreadcrumbs();
		// });

		// subscribe to router events
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.pageConfig = objectPath.get(this.config, this.router.url.substring(1).replace(/\//g, '.') || '/');

				if (objectPath.get(this.manualTitle, this.router.url)) {
					this.setTitle(this.manualTitle[this.router.url]);
				} else {
					// get updated page title on every route changed
					this.title$.next(objectPath.get(this.pageConfig, 'page.title'));

					// subheader enable/disable
					const hideSubheader = objectPath.get(this.pageConfig, 'page.subheader');
					this.disabled$.next(typeof hideSubheader !== 'undefined' && !hideSubheader);

					if (objectPath.get(this.manualBreadcrumbs, this.router.url)) {
						// breadcrumbs was set manually
						this.setBreadcrumbs(this.manualBreadcrumbs[this.router.url]);
					} else {
						// get updated breadcrumbs on every route changed
						this.updateBreadcrumbs();
						// breadcrumbs was appended before, reuse it for this page
						if (objectPath.get(this.appendingBreadcrumbs, this.router.url)) {
							this.appendBreadcrumbs(this.appendingBreadcrumbs[this.router.url]);
						}
					}
				}
			});
	}

	updateBreadcrumbs() {
		// get breadcrumbs from header menu
		let breadcrumbs = this.getBreadcrumbs(this.headerMenus);
		// if breadcrumbs empty from header menu
		if (breadcrumbs.length === 0) {
			// get breadcrumbs from aside menu
			breadcrumbs = this.getBreadcrumbs(this.asideMenus);
		}

		if (
			// if breadcrumb has only 1 item
			breadcrumbs.length === 1 &&
			// and breadcrumb title is same as current page title
			breadcrumbs[0].title === this.title$.getValue()
		) {
			// no need to display on frontend
			breadcrumbs = [];
		}

		this.breadcrumbs$.next(breadcrumbs);
	}

	/**
	 * Manually set full breadcrumb paths
	 */
	setBreadcrumbs(breadcrumbs: Breadcrumb[] | any[]) {
		this.manualBreadcrumbs[this.router.url] = breadcrumbs;
		this.breadcrumbs$.next(breadcrumbs);
	}

	/**
	 * Append breadcrumb to the last existing breadcrumbs
	 * @param breadcrumbs
	 */
	appendBreadcrumbs(breadcrumbs: Breadcrumb[] | any[]) {
		this.appendingBreadcrumbs[this.router.url] = breadcrumbs;
		const prev = this.breadcrumbs$.getValue();
		this.breadcrumbs$.next(prev.concat(breadcrumbs));
	}

	/**
	 * Get breadcrumbs from menu items
	 * @param menus
	 */
	getBreadcrumbs(menus: any) {
		const breadcrumbs = [];
		const menuPath = this.getPath(menus, this.router.url);
		menuPath.forEach(key => {
			menus = menus[key];
			if (typeof menus !== 'undefined' && menus.title) {
				breadcrumbs.push(menus);
			}
		});
		return breadcrumbs;
	}

	setTitle(title: string) {
		this.manualTitle[this.router.url] = title;
		this.title$.next(title);
	}

	/**
	 * Get object path by value
	 * @param obj
	 * @param value
	 */
	getPath(obj, value) {
		if (typeof obj !== 'object') {
			throw new TypeError('Can only operate on Array or Object');
		}
		const path = [];
		let found = false;

		function search(haystack) {
			// tslint:disable-next-line:forin
			for (const key in haystack) {
				path.push(key);
				if (haystack[key] === value) {
					found = true;
					break;
				}
				if (typeof haystack[key] === 'object') {
					search(haystack[key]);
					if (found) {
						break;
					}
				}
				path.pop();
			}
		}

		search(obj);
		return path;
	}
}
