import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { saudeConfig } from '../configurations/saudeConfig';

@Injectable()
export class ExamService {
    constructor(private http: Http) { }

    listExams(username: string, token: string, accessRole: string) {
        return this.http.get(environment.baseApi + environment.listExamsUrl + 'user=' + username + '&token=' + token + '&accessRole' + accessRole)
            .map(this.handleRequest)
            .catch(this.handleError);
    }

    getIndividualExam(exid: string, epasscode: string) {
        return this.http.get(environment.baseApi + environment.readIndividualExam + 'exid=' + exid + '&epasscode=' + epasscode)
            .map(this.handleRequest)
            .catch(this.handleError);
    }
    getExamStatusColor(status: string) {
        if (status == "w") {
            return saudeConfig.status_waiting_color
        };

        if (status == "f") {
            return saudeConfig.status_finished_color
        };
        return saudeConfig.status_unknown_color;
    }
    getExamImage(username: string, token: string, exid: string, edid: number) {
        return this.http.get(environment.baseApi + environment.getExamImageUrl + 'user=' + username + '&token=' + token + '&exid=' + exid + '&edid=' + edid)
            .map(this.handleRequest)
            .catch(this.handleError);
    }
    getExamComments(username: string, token: string, exid: string) {
        return this.http.get(environment.baseApi + environment.readExamComments + 'user=' + username + '&token=' + token + '&exid=' + exid)
            .map(this.handleRequest)
            .catch(this.handleError);
    }
    getExamPdf(username: string, token: string, exid: string, edid: number) {
        return this.http.get(environment.baseApi + environment.readExamPdf + 'user=' + username + '&token=' + token + '&exid=' + exid)
            .map(this.handleFile)
            .catch(this.handleError);
    }
    getExamReportAsPdf(user: string, token: string, exid: string) {
        let url = environment.baseApi + environment.getExamReportAsPDF + 'user=' + user + '&token=' + token + '&exid=' + exid;
        return url;
    }
    getExamDocumentsAsPdf(user: string, token: string, exid: string) {
        let url = environment.baseApi + environment.getExamDocumentsAsPDF + 'user=' + user + '&token=' + token + '&exid=' + exid;
        return url;
    }
    getExamAttachedPdfs(user: string, token: string, exid: string) {
        let url = environment.baseApi + environment.getExamAttachedPDFs + 'user=' + user + '&token=' + token + '&exid=' + exid;
        return url;
    }

    postExamComment(username: string, token: string, exid: string, msg: string) {
        return this.http.get(environment.baseApi + environment.saveExamComments + 'user=' + username + '&token=' + token + '&exid=' + exid + '&msg=' + msg)
            .map(this.handleRequest)
            .catch(this.handleError);
    }

    private handleFile(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleRequest(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        // Connect logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}