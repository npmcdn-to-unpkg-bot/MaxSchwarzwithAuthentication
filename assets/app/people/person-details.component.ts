import { Component, Input, OnInit } from 'angular2/core';
import { RouteParams, Router} from 'angular2/router';
import { Response } from 'angular2/http';
import { NgForm }    from 'angular2/common';

import { StarWarsService } from './starwars.service';
import { Person } from './person';

@Component({
  selector: 'person-details',
  templateUrl: 'html/people/person-details.component.html',
  styleUrls: ['html/people/person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
    @Input() person : Person;
    isSaving: boolean;
    professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

    constructor(private starWarsService: StarWarsService,
               private routeParams: RouteParams,
               private router: Router){
    }

    ngOnInit(){
        let id = Number.parseInt(this.routeParams.get('id'));
        console.log('getting person with id: ', id);
        this.starWarsService
          .getPerson(id)
          .subscribe(p => this.person = p);
    }

    gotoPeoplesList(){
        let link = ['Persons'];
        this.router.navigate(link);
        // could also use:
        // window.history.back();
    }
    savePersonDetails(){
      this.isSaving = true;
      this.starWarsService
          .savePerson(this.person)
          .subscribe(
 //           (r: Response) => {console.log('success, id:'+this.person.id+', Name:'+this.person.name+', Weight:'+this.person.weight)},
            (r: Response) => {console.log('success, '+ JSON.stringify(this.person))},
            (error) => {console.log('error: ', error);},
            () => {this.isSaving = false;}
          );
    }
}
