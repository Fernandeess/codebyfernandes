import { Component } from '@angular/core';
import { ProjectComponent } from "../../components/project/project.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProjectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
