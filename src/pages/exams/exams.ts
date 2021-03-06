import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Exam } from '../../domain/exam';

import { ExamsDoctorPage } from '../exams-doctor/exams-doctor'
import { ExamsPatientPage } from '../exams-patient/exams-patient';

import { ExamService } from '../../services/exam.service';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the Exams page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-exams',
  templateUrl: 'exams.html',
})
export class ExamsPage {
  private userRoles: String[];

  private showPatient: boolean = false;
  private showDoctor: boolean = false;

  Patient = ExamsPatientPage;
  Doctor = ExamsDoctorPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    this.userRoles = this.authService.getCurrentUserRoles();
    if (this.userRoles.some(x => x === "ROLE_PATIENT")) {
      this.showPatient = true;
    }
    if (this.userRoles.some(x => x === "ROLE_HEALTH_PROFESSIONAL")) {
      this.showDoctor = true;
    }
  }
}