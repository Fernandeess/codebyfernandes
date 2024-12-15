import { TimelineModule } from 'primeng/timeline';
import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [ TimelineModule ,CardModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent {
  events: any[];

    constructor() {
      this.events = [
        {
          empresa: 'Stefanini Consultoria e Assessoria em Informática S.A.',
          cargo: 'Analista Desenvolvedor Fullstack',
          periodo: 'Novembro/2023 - Atual',
          descricao: ["Desenvolvimento de API REST utilizando .NET para integração com sistemas de monitoramento e gestão operacional.","Desenvolvimento de uma plataforma web interativa e responsiva com Angular desenvolvendo componentes reutilizáveis e garantindo uma experiência de usuário otimizada para análise de dados em tempo real.","Desenvolvimento de fluxos de dados com Azure Data Factory e FABRIC K2VIEW."],
          contrato: 'CLT'
        },
        {
          empresa: 'Stefanini Consultoria e Assessoria em Informática S.A.',
          cargo: 'Estagiário de Desenvolvimento Backend',
          periodo: 'Fevereiro/2023 - Novembro/2023',
          descricao: ["Desenvolvimento de APIs Rest de estudo utilizando Java e Spring, com integração ao banco de dados PostgreSQL.","Participação em um Grupo de Desenvolvimento de Talentos, onde aprimorei conhecimentos em Java, POO e estruturas de dados." ],
          contrato: 'Estágio'
        },
        {
          empresa: 'Abraf',
          cargo: 'Desenvolvedor Web',
          periodo: 'Abril/2022 - Junho/2022',
          descricao: ["Desenvolvimento de um site de catálogo para exibição e detalhamento de produtos de uma empresa de sensores eletrônicos"],
          contrato: 'Freelancer'
        }
      ];
    }
  }


