import { AuthenticationService } from '../../../../../core/auth/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'm-user-profile',
	templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

	constructor(private authService: AuthenticationService) { }

	ngOnInit(): void { }

	public logout() {
		this.authService.logout(true);
	}
}
