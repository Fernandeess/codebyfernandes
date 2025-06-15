import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  services = [
    {
      icon: 'pi pi-desktop', // Ou 'pi pi-globe'
      title: 'Sites e Landing Pages',
      description:
        'Criamos sites modernos e responsivos que convertem visitantes em clientes.',
      features: [
        'Sites institucionais',
        'Portfólios pessoais',
        'Landing pages para marketing',
        'Blogs personalizados',
      ],
    },
    {
      icon: 'pi pi-shopping-cart', // Ou 'pi pi-dollar'
      title: 'Desenvolvimento de E-commerce',
      description:
        'Lojas virtuais completas com integração de pagamento e gestão.',
      features: [
        'Lojas virtuais simples',
        'Lojas customizadas',
        'Integração com pagamentos',
        'Integração ERP e logística',
      ],
    },
    {
      icon: 'pi pi-code', // Ou 'pi pi-window'
      title: 'Aplicativos Web',
      description:
        'Sistemas web personalizados para automatizar seus processos.',
      features: [
        'MVPs de startups',
        'Dashboards e CRMs',
        'Sistemas internos',
        'Desenvolvimento de APIs',
      ],
    },
  ];

  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  };
}
