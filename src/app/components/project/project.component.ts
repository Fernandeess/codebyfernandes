import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [TagModule,CommonModule,ButtonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() image!: string;
  @Input() repository!: string;
  @Input() description!: string;
  @Input() tecnologias: string[] = [];
}
