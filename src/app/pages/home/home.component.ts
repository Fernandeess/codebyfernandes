import { Component } from '@angular/core';
import { ProjectComponent } from "../../components/project/project.component";
import { TechIconsComponent } from '../../components/tech-icons/tech-icons.component';
import { TechImages } from '../../interfaces/TechImages';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProjectComponent, TechIconsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  techImages: TechImages[] = [
    { url: '../../../assets/icons/Java.svg', alt: 'Java', type: 'back' },
    { url: '../../../assets/icons/Spring.svg', alt: 'Spring', type: 'back' },
    { url: '../../../assets/icons/JUnit.svg', alt: 'JUnit', type: 'back' },
    { url: '../../../assets/icons/PostgresSQL.svg', alt: 'PostgresSQL', type: 'back' },
    { url: '../../../assets/icons/Microsoft SQL Server.svg', alt: 'Microsoft SQL Server', type: 'back' },
    { url: '../../../assets/icons/RabbitMQ.svg', alt: 'RabbitMQ', type: 'back' },
    { url: '../../../assets/icons/Angular.svg', alt: 'Angular', type: 'front' },
    { url: '../../../assets/icons/React.svg', alt: 'React', type: 'front' },
    { url: '../../../assets/icons/JavaScript.svg', alt: 'JavaScript', type: 'front' },
    { url: '../../../assets/icons/TypeScript.svg', alt: 'TypeScript', type: 'front' },
    { url: '../../../assets/icons/Node.js.svg', alt: 'Node.js', type: 'back' },
    { url: '../../../assets/icons/AWS.svg', alt: 'AWS', type: 'cloud' },
    { url: '../../../assets/icons/Azure.svg', alt: 'Azure', type: 'cloud' },
    { url: '../../../assets/icons/Digital Ocean.svg', alt: 'Digital Ocean', type: 'cloud' },
    { url: '../../../assets/icons/Linux.svg', alt: 'Linux', type: 'back' },
    { url: '../../../assets/icons/GitHub Actions.svg', alt: 'GitHub Actions', type: 'back' },
    { url: '../../../assets/icons/Docker.svg', alt: 'Docker', type: 'back' },
    { url: '../../../assets/icons/NGINX.svg', alt: 'NGINX', type: 'back' },
    { url: '../../../assets/icons/Git.svg', alt: 'Git', type: 'back' },
  ]
}
