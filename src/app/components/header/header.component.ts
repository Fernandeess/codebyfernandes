import { MenubarModule } from 'primeng/menubar';
import { Component, Inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
      this.items = [
          {
              label: 'Inicio'
          },
          {
              label: 'Sobre'
          },
          {
              label: 'Projetos'
          },
          {
            label: 'Experiencias'
        }
      ];
  }

  goToPath(path : String) {
    console.log(path)
    this.router.navigate([`/${path}`]);
  }

  goToExternalPage(url: string) {
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.opener = null;
    }
  }

}
