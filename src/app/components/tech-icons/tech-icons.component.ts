import { Component, Input } from '@angular/core';

import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-tech-icons',
  standalone: true,
  imports: [TooltipModule],
  templateUrl: './tech-icons.component.html',
  styleUrl: './tech-icons.component.scss'
})
export class TechIconsComponent {
  @Input() iconPath: string = '';
  @Input() alt: string = '';
}
