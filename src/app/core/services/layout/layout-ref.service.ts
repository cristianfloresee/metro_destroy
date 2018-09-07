import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LayoutRefService {
	layoutRefs$: BehaviorSubject<any> = new BehaviorSubject<any>({});
	layoutRefs: any = {};

	constructor() {}

	addElement(name, element) {
		//name: header
		//element: href del header
		//const obj = {};
		//obj[name] = element;
		//console.log("REFERENCIAS A COMPONENTES[HEADER, ASIDE, CONTENT] ", Object.assign(this.layoutRefs, obj)); //{asideleft: content: header:}

		//this.layoutRefs$.next(Object.assign(this.layoutRefs, obj)); //EMITE UN EVENTO PARA QUE ESCUCHEN A LAYOUTREF$
	}
}
