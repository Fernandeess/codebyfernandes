import { Component } from '@angular/core';
import { Project } from '../../interfaces/Project';
import { ProjectComponent } from "../../components/project/project.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
   projetos: Project[] = [
    {
      id: 1,
      name: "Foodway",
      image: "../../../assets/projects/foodway.png",
      repository: "https://github.com/orgs/Food-Way/repositories",
      description: "Desenvolvimento de plataforma com Java e React que reúne avaliações de clientes e funcionários de restaurantes, oferecendo informações completas aos usuários.",
      tecnologias: ["React","Java", "Spring", "RDS Postgres","AWS","S3","EC2","VPC","NGINX","Grafana","Prometheus" ],
      deploy:""
    },
    {
      id: 2,
      name: "ErrorEagle",
      image: "../../../assets/projects/erroreagle.png",
      repository: "https://github.com/orgs/ErrorEagle/repositories",
      description: "Plataforma avançada de monitoramento com dashboards interativos para terminais de autoatendimento em mercados.",
      tecnologias: ["Java","Node", "Express", "Docker", "AWS" ,"MySQL"],
      deploy:""
    },
    {
      id: 3,
      name: "Datafound",
      image: "../../../assets/projects/datafound.png",
      repository: "https://github.com/orgs/Data-Found/repositories",
      description: "Projeto de Otimização Logística para Corredores de Lojas de Departamentos com IoT: Implementação de Arduino com Sensores de Movimento para captura de dados",
      tecnologias: ["Node.js", "Express", "MongoDB"],
      deploy:""
    }
  ];
}
