import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as objectPath from 'object-path';

//DIRECTIVAS
import { MenuHorizontalOffcanvasDirective } from '../../../../core/directives/menu-horizontal-offcanvas.directive';
import { MenuHorizontalDirective } from '../../../../core/directives/menu-horizontal.directive';
import { MenuHorizontalService } from '../../../../core/services/layout/menu-horizontal.service';

@Component({
	selector: 'm-menu-horizontal',
	templateUrl: './menu-horizontal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHorizontalComponent implements OnInit, AfterViewInit {

	//ESTA MIERDA!!!
	@HostBinding('attr.mMenuHorizontalOffcanvas') mMenuHorOffcanvas: MenuHorizontalOffcanvasDirective;
	@HostBinding('attr.mMenuHorizontal') mMenuHorizontal: MenuHorizontalDirective;

	currentRouteUrl: any = '';

	constructor(
		private el: ElementRef,
		public menuHorService: MenuHorizontalService, //ESTA MIERDA!!!
		private router: Router,
	) {
		//m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas m-header-menu--skin-dark m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-dark m-aside-header-menu-mobile--submenu-skin-dark
		//m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas m-header-menu--skin-dark m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-dark m-aside-header-menu-mobile--submenu-skin-dark
		//m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas m-header-menu--skin-dark m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-dark m-aside-header-menu-mobile--submenu-skin-dark
	}

	ngOnInit(): void {
		this.currentRouteUrl = this.router.url;
	}

	ngAfterViewInit(): void {
		Promise.resolve(null)
			.then(() => {
				this.mMenuHorOffcanvas = new MenuHorizontalOffcanvasDirective(this.el);
				this.mMenuHorOffcanvas.ngAfterViewInit();

				this.mMenuHorizontal = new MenuHorizontalDirective(this.el);
				this.mMenuHorizontal.ngAfterViewInit();
			});
	}
	//m-menu__item m-menu__item--submenu m-menu__item--rel ng-star-inserted m-menu__item--open-dropdown m-menu__item--active m-menu__item--hover
	//m-menu__item m-menu__item--submenu m-menu__item--rel ng-star-inserted m-menu__item--open-dropdown
	//m-menu__item m-menu__item--submenu m-menu__item--rel ng-star-inserted m-menu__item--open-dropdown
	getItemCssClasses(item) {
		//console.log("getItemCssClasses: ", item);
		let cssClasses = 'm-menu__item';

		if (objectPath.get(item, 'submenu')) {
			cssClasses += ' m-menu__item--submenu';
		}

		if (objectPath.get(item, 'resizer')) {
			cssClasses += ' m-menu__item--resize';
		}

		if (
			(objectPath.get(item, 'root') &&
				objectPath.get(item, 'submenu.type') === 'classic') ||
			parseInt(objectPath.get(item, 'submenu.width'), 2) > 0
		) {
			cssClasses += ' m-menu__item--rel';
		}

		const customClass = objectPath.get(item, 'custom-class');
		if (customClass) {
			cssClasses += ' ' + customClass;
		}

		if (objectPath.get(item, 'icon-only')) {
			cssClasses += ' m-menu__item--icon-only';
		}

		if (item.submenu && this.isMenuItemIsActive(item)) {
			cssClasses += ' m-menu__item--active';
		}

		return cssClasses;
	}

	getItemAttrLinkRedirect(menuItem): any {
		if (objectPath.get(menuItem, 'redirect')) {
			return '1';
		}

		return null;
	}

	getItemAttrResizeDesktopBreakpoint(menuItem) {
		if (objectPath.get(menuItem, 'resizer')) {
			return objectPath.get(menuItem, 'resize-breakpoint');
		}

		return null;
	}

	getItemAttrSubmenuToggle(menuItem) {
		let attrSubmenuToggle = 'hover';
		if (objectPath.get(menuItem, 'toggle') === 'click') {
			attrSubmenuToggle = 'click';
		} else if (objectPath.get(menuItem, 'submenu.type') === 'tabs') {
			attrSubmenuToggle = 'tabs';
		} else {
			// submenu toggle default to 'hover'
		}

		return attrSubmenuToggle;
	}

	getItemAttrSubmenuMode(menuItem) {
		return null;
	}

	getItemMenuSubmenuClass(menuItem) {
		let subClass = '';

		const subAlignment = objectPath.get(menuItem, 'submenu.alignment');
		if (subAlignment) {
			subClass += ' m-menu__submenu--' + subAlignment;
		}

		if (objectPath.get(menuItem, 'submenu.type') === 'classic') {
			subClass += ' m-menu__submenu--classic';
		}

		if (objectPath.get(menuItem, 'submenu.type') === 'tabs') {
			subClass += ' m-menu__submenu--tabs';
		}

		if (objectPath.get(menuItem, 'submenu.type') === 'mega') {
			if (objectPath.get(menuItem, 'submenu.width')) {
				subClass += ' m-menu__submenu--fixed';
			}
		}

		if (objectPath.get(menuItem, 'submenu.pull')) {
			subClass += ' m-menu__submenu--pull';
		}

		return subClass;
	}

	isMenuItemIsActive(item): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		return item.page === this.currentRouteUrl;
	}

	isMenuRootItemIsActive(item): boolean {
		if (item.submenu.items) {
			for (const subItem of item.submenu.items) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		return false;
	}
}
