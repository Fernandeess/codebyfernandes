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
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265615/Java_zqrkfj.svg', alt: 'Java', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265624/Spring_c4cnq8.svg', alt: 'Spring', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265616/JUnit_amcspe.svg', alt: 'JUnit', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265620/PostgresSQL_b41kgf.svg', alt: 'PostgresSQL', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265619/Microsoft_SQL_Server_heej0o.svg', alt: 'Microsoft SQL Server', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265621/RabbitMQ_f8df6v.svg', alt: 'RabbitMQ', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265613/Angular_si6j8y.svg', alt: 'Angular', type: 'front' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265623/React_uotygt.svg', alt: 'React', type: 'front' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265616/JavaScript_gx6zel.svg', alt: 'JavaScript', type: 'front' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265624/TypeScript_i9hpeb.svg', alt: 'TypeScript', type: 'front' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265620/Node.js_rpgajb.svg', alt: 'Node.js', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265613/AWS_wqlypb.svg', alt: 'AWS', type: 'cloud' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265613/Azure_gll4xf.svg', alt: 'Azure', type: 'cloud' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265614/Digital_Ocean_affuvt.svg', alt: 'Digital Ocean', type: 'cloud' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265618/Linux_d6a1vu.svg', alt: 'Linux', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265615/GitHub_Actions_ubs8dv.svg', alt: 'GitHub Actions', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265614/Docker_pced7e.svg', alt: 'Docker', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265620/NGINX_jmwjx3.svg', alt: 'NGINX', type: 'back' },
    { url: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265614/Git_glqesu.svg', alt: 'Git', type: 'back' },
  ]
}
