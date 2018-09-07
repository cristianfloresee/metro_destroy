// ANGULAR IMPORTS
import { Injectable } from '@angular/core';
// MODELOS
import { AclModel } from '../models/acl';
// NGX-PERMISSIONS: LIBRERÍA EXTERNA
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
// RXJS
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// SERVICIOS
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class AclService {
	public aclModel: AclModel; //VARIABLES GLOBALES DE PERMISOS QUE EXISTEN Y ROLES ACTUALES (NO TIENE NADA AÚN)
	public onAclUpdated$: BehaviorSubject<AclModel>; //VARIABLE OBSERVABLE DE

	constructor(
		private roleService: NgxRolesService,
		private permService: NgxPermissionsService,
		private authService: AuthenticationService,
	) {
		// SETEO INICIAL DEL MODELO DE PERMISOS
		this.aclModel = new AclModel();
		this.onAclUpdated$ = new BehaviorSubject(this.aclModel);


		//***************SERVICIOS DEL AUTH SERVICE */
		this.authService.getUserRoles().subscribe(roles => {
			this.setCurrrentUserRoles(roles);
		});

		//SUSCRIBIRSE A LA CREDENCIAL CAMBIADA (EJEMPLO: DESPUÉS DE LA RESPUESTA DE LOGIN)
		this.authService.onCredentialUpdated$
			.pipe(mergeMap(accessData => this.authService.getUserRoles()))
			.subscribe(roles => this.setCurrrentUserRoles(roles));



		// subscribe to acl data observable
		this.onAclUpdated$.subscribe(acl => {
			const permissions = Object.keys(acl.permissions).map((key) => {
				return acl.permissions[key];
			});
			// CARGA LA LISTA DE PERMISOS POR DEFECTO
			this.permService.loadPermissions(permissions, (permissionName, permissionStore) => !!permissionStore[permissionName]);

			//MERGE DE ROLES DE USUARIO ACTUALES
			const roles = Object.assign({}, this.aclModel.currentUserRoles, {
				// ROL DE USUARIO POR DEFECTO ES GUEST
				GUEST: () => {
					// return this.authService.isAuthorized().toPromise();
				}
			});
			//AGREGAR AL SERVICIO DE ROLES
			this.roleService.addRoles(roles);
		});
	}

	/**
	 * Set AclModel and fire off event that all subscribers will listen to
	 * @param aclModel
	 */
	setModel(aclModel: AclModel): any {
		aclModel = Object.assign({}, this.aclModel, aclModel);
		this.onAclUpdated$.next(aclModel);
	}

	setCurrrentUserRoles(roles: any): any {
		//ACTUALIZAR ROLES SI LOS DATOS DE CREDENCIAL TIENEN ROLES
		if (roles != null) {
			this.aclModel.currentUserRoles = {};
			roles.forEach(role => {
				this.aclModel.currentUserRoles[role] = this.aclModel.permissions[role];
			});
			// RESTABLECER EL MODELO ACL ACTUALIZADO AL SERVICIO
			this.setModel(this.aclModel);
		}
	}
}
