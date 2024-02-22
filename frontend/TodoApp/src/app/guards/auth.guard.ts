import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  user: boolean = localStorage.getItem('userId') ? true : false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { routeConfig } = route;
    const { path } = routeConfig as Route;
    if (path?.includes('todos') && this.user) {
      return true;
    }
    if (path?.includes('todos') && !this.user) {
      return false;
    }

    if (path?.includes('search') && !this.user) {
      return false;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
