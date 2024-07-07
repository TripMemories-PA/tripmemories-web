import { Component, Input, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { QuestionModel } from '../../models/question.model';
import { QuizzService } from '../../services/quizz/quizz.service';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-create-question',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        NgIf,
        MessageModule,
        ProgressBarModule,
    ],
    templateUrl: './create-question.component.html',
    styleUrl: './create-question.component.css',
})
export class CreateQuestionComponent implements OnInit {
    questionForm: FormGroup;
    @Input() questionModel?: QuestionModel;
    @Input() update: boolean = false;
    loading = false;
    success = '';
    error = '';

    constructor(
        private fb: FormBuilder,
        private questionService: QuizzService,
    ) {
        this.questionForm = this.fb.group({
            question: ['', Validators.required],
            answers: this.fb.array([], [this.minAnswers(1), this.maxAnswers(4)]),
            imageId: null,
        });
    }

    get answers() {
        return this.questionForm.get('answers') as FormArray;
    }

    addAnswer() {
        this.answers.push(
            this.fb.group({
                answer: ['', Validators.required],
                isCorrect: [false],
            }),
        );
    }

    removeAnswer(index: number) {
        this.answers.removeAt(index);
    }

    save() {
        if (this.questionForm.valid) {
            this.loading = true;
            this.error = '';
            this.success = '';
            this.questionService.storeQuestion(this.questionForm.value).subscribe({
                next: (_) => {
                    this.loading = false;
                    this.success = 'La question a bien été créée';
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                },
                error: (_) => {
                    this.loading = false;
                    this.error = 'Une erreur est survenue, veuillez réessayer plus tard';
                },
            });
        } else {
            this.questionForm.markAllAsTouched();
        }
    }

    updateQuestion() {
        if (!this.questionModel?.id) return;
        if (!this.questionForm.valid) {
            this.questionForm.markAllAsTouched();
            return;
        }
        this.error = '';
        this.success = '';
        this.loading = true;
        this.questionService
            .updateQuestion(this.questionModel?.id.toString(), this.questionForm.value)
            .subscribe({
                next: (_) => {
                    this.loading = false;
                    this.success = 'La question a bien été mise à jour';
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                },
                error: (_) => {
                    this.loading = false;
                    this.error = 'Une erreur est survenue, veuillez réessayer plus tard';
                },
            });
    }

    minAnswers(min: number) {
        return (formArray: AbstractControl): { [key: string]: boolean } | null => {
            return formArray instanceof FormArray && formArray.length >= min
                ? null
                : { minAnswers: true };
        };
    }

    maxAnswers(max: number) {
        return (formArray: AbstractControl): { [key: string]: boolean } | null => {
            return formArray instanceof FormArray && formArray.length <= max
                ? null
                : { maxAnswers: true };
        };
    }

    ngOnInit(): void {
        if (this.questionModel) {
            this.questionForm.patchValue(this.questionModel);
            this.questionForm.setControl(
                'answers',
                this.fb.array(
                    this.questionModel.answers.map((answer) =>
                        this.fb.group({
                            answer: answer.answer,
                            isCorrect: answer.isCorrect,
                        }),
                    ),
                ),
            );
        }
    }
}
