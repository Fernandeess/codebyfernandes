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
      name: "Portfolio Website",
      image: "https://picsum.photos/320/200",
      repository: "https://github.com/seu-usuario/portfolio-website",
      description: "Um website portfolio desenvolvido com tecnologias modernas para exibir projetos e habilidades.",
      tecnologias: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
      id: 2,
      name: "E-commerce App",
      image: "https://picsum.photos/320/200",
      repository: "https://github.com/seu-usuario/ecommerce-app",
      description: "Uma aplicação de e-commerce com funcionalidades completas, incluindo carrinho de compras e integração de pagamentos.",
      tecnologias: ["Angular", "TypeScript", "Node.js", "MongoDB"]
    },
    {
      id: 3,
      name: "Blog API",
      image: "https://picsum.photos/320/200",
      repository: "https://github.com/seu-usuario/blog-api",
      description: "Uma API RESTful para gerenciamento de blogs com autenticação e gerenciamento de usuários.",
      tecnologias: ["Node.js", "Express", "MongoDB"]
    }
  ];
}
