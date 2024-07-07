import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-quizz-page',
    standalone: true,
    imports: [RouterLink, InputTextModule],
    templateUrl: './quizz-page.component.html',
    styleUrl: './quizz-page.component.css',
})
export class QuizzPageComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {}

    name = this.authService.user?.firstname + ' ' + this.authService.user?.lastname;
    idQuizz = '';

    startQuiz() {
        this.router.navigate(['/quizz', this.idQuizz, '1']);
    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params) => {
            this.idQuizz = params.get('id') as string;
        });
    }
}
