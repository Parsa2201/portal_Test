import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss']
})
export class RegulationsComponent {
  fieldId!: string;
  acceptedRules: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.params.subscribe((params) => {
      this.fieldId = params['id'];
    })

  }


  onCheckboxChange(event: any) {
    this.acceptedRules = event.checked;
  }

}
