//LISTA DE CONTROL DE ACCESO

export class AclModel {
	public config: any;

	// PERMISOS PREDETERMINADOS
	public permissions: any = {
		ADMIN: ['canDoAnything'],
		USER: ['canDoLimitedThings']
	};

	// ALMACENAR UN OBJETO DE ROLES ACTUALES
	public currentUserRoles: any = {};

	constructor() { }
}
