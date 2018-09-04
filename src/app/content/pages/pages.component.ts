// ANGULAR IMPORTS
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import {
	Component,
	OnInit,
	HostBinding,
	ViewChild,
	ElementRef,
	AfterViewInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { AnimationBuilder, AnimationPlayer, style, animate } from '@angular/animations';
// SERVICIOS
import { LayoutConfigService } from '../../core/services/layout-config.service';
import { LayoutRefService } from '../../core/services/layout/layout-ref.service';
// RXJS
import { BehaviorSubject } from 'rxjs';


@Component({
	selector: 'm-pages',
	templateUrl: './pages.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent implements OnInit, AfterViewInit {
	// ['class'] = 'bootstrap_class'
	// <m-pages class="m-grid m-grid--hor m-grid--root m-page"></m-pages>
	@HostBinding('class') bootstrap_class = 'm-grid m-grid--hor m-grid--root m-page';

	public player: AnimationPlayer;

	// class for the header container
	pageBodyClass$: BehaviorSubject<string> = new BehaviorSubject<string>('');

	@ViewChild('mContentWrapper') contenWrapper: ElementRef;
	@ViewChild('mContent') mContent: ElementRef;

	constructor(
		private el: ElementRef,
		private configService: LayoutConfigService,
		private router: Router,
		private layoutRefService: LayoutRefService,
		private animationBuilder: AnimationBuilder,

	) {

		//SELFLAYOUT SIEMPRE FLUID!
		this.configService.onLayoutConfigUpdated$.subscribe(model => {
			let pageBodyClass = '';
		});

		// animate page load
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				if (this.contenWrapper) {
					// hide content
					this.contenWrapper.nativeElement.style.display = 'none';
				}
			}
			if (event instanceof NavigationEnd) {
				if (this.contenWrapper) {
					// show content back
					this.contenWrapper.nativeElement.style.display = '';
					// animate the content
					this.animate(this.contenWrapper.nativeElement);
				}
			}
		});
	}

	ngOnInit(){}

	ngAfterViewInit(): void {
		setTimeout(() => {
			if (this.mContent) {
				// keep content element in the service
				this.layoutRefService.addElement('content', this.mContent.nativeElement);
			}
		});
	}

	// ANIMA LA PÁGINA DE CARGA...
	animate(element) {
		this.player = this.animationBuilder
			.build([
				style({ opacity: 0, transform: 'translateY(15px)' }),
				animate('500ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
				style({ transform: 'none' }),
			])
			.create(element);
		this.player.play();
	}
}
