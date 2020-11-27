import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    selectedFiles: FileList;
    addnewMoment: FormGroup;
    loading = false;
    submitted = false;
    public files: any[];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        this.files = []; }

    ngOnInit() {
        this.addnewMoment = this.formBuilder.group({
            tags: ['', Validators.required],
            comment: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.addnewMoment.controls; }

    onSubmit() {
        this.submitted = true;
        this.router.navigate(['/list']);
        // stop here if form is invalid
        if (this.addnewMoment.invalid) {
            return;
        }

        this.loading = true;
        this.userService.addnewMoment(this.addnewMoment.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('new Moment added successfuly', true);
                    this.router.navigate(['/list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
  onFileChanged(event: any) {
  this.files = event.target.files;
    }
    onUpload() {
      const fd = new FormData();
         fd.append('file', this.files[0]);

      this.userService.uploadImage(fd)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('new Moment added successfuly', true);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }
    showList() {
      this.router.navigate(['/list']);
    }
}
