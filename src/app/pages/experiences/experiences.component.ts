import { TimelineModule } from 'primeng/timeline';
import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [TimelineModule, CardModule, CommonModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent {
  events: any[];

  constructor() {
    this.events = [
      {
        logo: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1749955205/stefanini_cnxuo8.webp',
        empresa: 'Stefanini Consultoria e Assessoria em Informática S.A.',
        cargo: 'Analista Desenvolvedor Fullstack',
        periodo: 'Novembro/2023 - Dezembro/2024',
        descricao: [
          'Desenvolvimento de API REST utilizando .NET para integração com sistemas de monitoramento e gestão operacional.',
          'Desenvolvimento de uma plataforma web interativa e responsiva com Angular desenvolvendo componentes reutilizáveis e garantindo uma experiência de usuário otimizada para análise de dados em tempo real.',
          'Desenvolvimento de fluxos de dados com Azure Data Factory e FABRIC K2VIEW.',
        ],
      },
      {
        logo: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1749955205/stefanini_cnxuo8.webp',
        empresa: 'Stefanini Consultoria e Assessoria em Informática S.A.',
        cargo: 'Estagiário de Desenvolvimento Backend',
        periodo: 'Fevereiro/2023 - Novembro/2023',
        descricao: [
          'Desenvolvimento de APIs Rest de estudo utilizando Java e Spring, com integração ao banco de dados PostgreSQL.',
          'Participação em um Grupo de Desenvolvimento de Talentos, onde aprimorei conhecimentos em Java, POO e estruturas de dados.',
        ],
      },
      {
        logo: 'https://res.cloudinary.com/dqvkg85dl/image/upload/v1749955205/abraf_ygyxsm.webp',
        empresa: 'Abraf',
        cargo: 'Desenvolvedor Web',
        periodo: 'Abril/2022 - Junho/2022',
        descricao: [
          'Desenvolvimento de um site de catálogo para exibição e detalhamento de produtos de uma empresa de sensores eletrônicos',
        ],
        contrato: 'Freelancer',
      },
    ];
  }
}
