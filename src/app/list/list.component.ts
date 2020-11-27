import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
    currentUser: User;
    moment: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadallMoment();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadallMoment()
        });
    }

    updateMoment(id: number) {
      this.userService.updateMoment(id).pipe(first()).subscribe(() => {
          this.loadallMoment()
      });
    }
    private loadallMoment() {
        this.userService.getAllMoment().pipe(first()).subscribe(moment => {
            this.moment = moment;
        });
    }
}
