import { Injectable, signal } from '@angular/core';
import { Assessment } from '../models/assessment';
import { StorageService } from './storage.service';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  public assessments = signal<Assessment[]>([]);

  constructor(
    private storageService: StorageService
  ) {
    this.loadAssessments();
  }

  private async loadAssessments() {
    const assessmentsSaved = await this.storageService.get<Assessment[]>('assessments');

    if (assessmentsSaved !== null) {
      this.assessments.set(assessmentsSaved);
    }
  }

  public getAssessment(menu: Menu, type: 'snack' | 'lunch'): 'like' | 'deslike' | 'null' {
    const assessement = this.assessments().find((a) => a.menu.id === menu.id && a.menu.day === a.menu.day && a.type === type);
    
    if (assessement) {
      return assessement.assessment;
    } else {
      return 'null';
    }
  }

  public assess(assessment: Assessment) {
    let assessmented: boolean = false;

    this.assessments().forEach((a) => {
      if (a.menu.day === assessment.menu.day && a.menu.id === assessment.menu.id && a.type === assessment.type) {
        assessmented = true;

        if (a.assessment !== assessment.assessment) {
          this.changeAssessment(assessment);
        }
      }
    });

    if (!assessmented) {
      const assessmentFound = this.assessments().find((a) => a.menu.day === assessment.menu.day && a.type === assessment.type);

      if (assessmentFound) {
        this.assessments.update((assessments) => {
          assessments.forEach((a) => {
            if (a.menu.day === assessment.menu.day && a.type === assessment.type) {
              a.assessment === assessment.assessment;
              a.menu === assessment.menu;
            }
          });

          return assessments;
        });

        this.saveAssessments();
      } else {
        this.assessments.update((assessments) => [ ...assessments, assessment ]);
        this.saveAssessments();
      }
    }
  }

  private changeAssessment(assessment: Assessment) {
    this.assessments.update((assessments) => {
      assessments.forEach((a) => {
        if (a.menu.id === assessment.menu.id && a.type === assessment.type) {
          a.assessment = assessment.assessment;
        }
      });

      return assessments;
    });

    this.saveAssessments();
  }

  private saveAssessments() {
    this.storageService.save('assessments', this.assessments());
  }
}
