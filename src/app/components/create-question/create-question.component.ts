import { Component, Input, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
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
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';

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
        FileUploadModule,
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
    file: File | null = null;

    constructor(
        private fb: FormBuilder,
        private questionService: QuizzService,
    ) {
        this.questionForm = this.fb.group({
            question: ['', Validators.required],
            answers: this.fb.array(
                [],
                [this.minAnswers(2), this.maxAnswers(4), this.atLeastOneCorrectAnswer()],
            ),
            imageId: null,
        });
    }

    get answers() {
        return this.questionForm.get('answers') as FormArray;
    }

    atLeastOneCorrectAnswer(): ValidatorFn {
        return (formArray: AbstractControl): ValidationErrors | null => {
            const hasCorrectAnswer = (formArray as FormArray).controls.some(
                (control) => control.get('isCorrect')?.value,
            );
            return hasCorrectAnswer ? null : { atLeastOneCorrect: true };
        };
    }

    onUpload(event: FileSelectEvent) {
        this.file = event.currentFiles[0];
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

    onCheckboxChange(index: number) {
        this.answers.controls.forEach((control, i) => {
            if (i !== index) {
                control.get('isCorrect')?.setValue(false);
            }
        });
    }

    updateOrStoreQuestion(update: boolean = false) {
        if (update) {
            if (!this.questionModel?.id) return;
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
        } else {
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
    }

    save() {
        if (this.file) {
            const formData: FormData = new FormData();
            formData.append('file', this.file, this.file.name);
            this.questionService.storeImageQuestion(formData).subscribe({
                next: (response) => {
                    this.questionForm.patchValue({
                        imageId: response.id,
                    });
                    this.updateOrStoreQuestion(false);
                },
                error: (_) => {
                    this.loading = false;
                    this.error = "Une erreur est survenue lors de l'envoi de l'image";
                },
            });
        } else {
            this.updateOrStoreQuestion(false);
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
        if (this.file) {
            const formData: FormData = new FormData();
            formData.append('file', this.file, this.file.name);
            this.questionService.storeImageQuestion(formData).subscribe({
                next: (response) => {
                    this.questionForm.patchValue({
                        imageId: response.id,
                    });
                    this.updateOrStoreQuestion(true);
                },
                error: (_) => {
                    this.loading = false;
                    this.error = "Une erreur est survenue lors de l'envoi de l'image";
                },
            });
        } else {
            this.updateOrStoreQuestion(true);
        }
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
