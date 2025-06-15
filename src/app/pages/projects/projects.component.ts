import { Component } from '@angular/core';
import { Project } from '../../interfaces/Project';
import { ProjectComponent } from '../../components/project/project.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projetos: Project[] = [
    {
      id: 1,
      name: 'Aurora Clininc',
      image:
        'https://res.cloudinary.com/dqvkg85dl/image/upload/v1749955206/aurora_eeyaka.webp',
      repository: '',
      description:
        'Criação de uma página web para clínica odontológica, desenvolvida para otimizar estratégias de marketing digital e aumentar a captação de pacientes.',
      tecnologias: ['Html 5', 'Css 3'],
      deploy: 'https://auroraclinicodontologia.com.br/lentes.html',
    },
    {
      id: 2,
      name: 'Foodway',
      image:
        'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265601/foodway_ygjxce.png',
      repository: 'https://github.com/orgs/Food-Way/repositories',
      description:
        'Desenvolvimento de plataforma com Java e React que reúne avaliações de clientes e funcionários de restaurantes, oferecendo informações completas aos usuários.',
      tecnologias: [
        'React',
        'Java',
        'Spring',
        'RDS Postgres',
        'AWS',
        'S3',
        'EC2',
        'VPC',
        'NGINX',
        'Grafana',
        'Prometheus',
      ],
      deploy: '',
    },
    {
      id: 3,
      name: 'ErrorEagle',
      image:
        'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265601/erroreagle_ng9knx.png',
      repository: 'https://github.com/orgs/ErrorEagle/repositories',
      description:
        'Plataforma avançada de monitoramento com dashboards interativos para terminais de autoatendimento em mercados.',
      tecnologias: ['Java', 'Node', 'Express', 'Docker', 'AWS', 'MySQL'],
      deploy: '',
    },
    {
      id: 4,
      name: 'Datafound',
      image:
        'https://res.cloudinary.com/dqvkg85dl/image/upload/v1734265601/datafound_ujb3qf.png',
      repository: 'https://github.com/orgs/Data-Found/repositories',
      description:
        'Projeto de Otimização Logística para Corredores de Lojas de Departamentos com IoT: Implementação de Arduino com Sensores de Movimento para captura de dados',
      tecnologias: ['Node.js', 'Express', 'MongoDB'],
      deploy: '',
    },
  ];
}
