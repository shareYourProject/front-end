import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

export abstract class DataResolver<T> implements Resolve<T> {

    constructor(
        protected readonly router: Router,
        private readonly idKey: string,
        ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): T | Observable<T> | Promise<T> {
        try {
            const idParam = route.paramMap.get(this.idKey);
            if (!idParam) throw new Error('Invalid id.');
            const id = parseInt(idParam);
            if (!id) throw new Error('Invalid id.');
            return this.getData(id);
          } catch (e) {
            console.error('Cannot fetch data:', e);
            this.router.navigateByUrl('/');
            return null as any;
          }
    }

    protected abstract getData(id: number): T | Observable<T> | Promise<T>;
}