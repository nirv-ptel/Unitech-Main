/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  intervalId: NodeJS.Timeout;
  time: number = 0;
  constructor(private analytics: AnalyticsService, private seoService: SeoService, private _router: Router) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    this.intervalId = setInterval(() => {
      this.time = this.time + 1;
      if(this.time == 3600) {
        this._router.navigate(['auth/logout']);
      }
    }, 1000);
  
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover',()=> this.reset());
    document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
    
  }
  reset(): any {
    this.time = 0;
  }
  
}
