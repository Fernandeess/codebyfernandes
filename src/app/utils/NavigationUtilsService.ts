import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationUtilsService {
  constructor(private router: Router) {}

  goToPath(path: string): void {
    console.log(path);
    this.router.navigate([`/${path}`]);
  }

  goToExternalPage(url: string): void {
    console.log(url)
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.opener = null;
    }
  }
}
