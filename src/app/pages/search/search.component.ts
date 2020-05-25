import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService, SearchValue } from 'src/app/services/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  queryForm: FormGroup;
  results: SearchValue[];

  private searchSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly searchService: SearchService,
    formBuilder: FormBuilder,
  ) {
    this.queryForm = formBuilder.group({
      query: ''
    });
  }

  ngOnInit(): void {
    this.queryForm.patchValue({
      query: this.route.snapshot.paramMap.get('query') ?? ''
    });
    this.route.paramMap.subscribe(paramMap => {
      if (this.searchSubscription)
        this.searchSubscription.unsubscribe();
      this.results = [];
      this.searchSubscription = this.searchService.search(paramMap.get('query') ?? '')
        .subscribe(value => this.results.push(value))
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription)
      this.searchSubscription.unsubscribe();
  }

  onSubmit() {
    this.router.navigateByUrl(`/search/${this.queryForm.value.query}`);
  }
}
