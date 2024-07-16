import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AppComponent,
                HttpClientTestingModule,
                RouterModule.forRoot([]),
                TranslateModule.forRoot(),
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have the 'front' title`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('TripMemories');
    });
});
