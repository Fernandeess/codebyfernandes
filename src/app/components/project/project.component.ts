import { NavigationUtilsService } from './../../utils/NavigationUtilsService';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, Inject, input, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [TagModule,CommonModule,ButtonModule,ChipModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() image!: string;
  @Input() repository!: string;
  @Input() description!: string;
  @Input() deploy!: string;
  @Input() tecnologias: string[] = [];
  openRepository(repositoryUrl : string): void {
    debugger;
    console.log(repositoryUrl);

    window.open(repositoryUrl, '_blank'); // Abre o link em uma nova aba
  }
}
