import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IElectricDetails } from "./electric-details";

@Component({ templateUrl: './electric-details-component.html' })
export class TenantDetailsElectricComponent implements OnInit {
    pageTitle = 'Electric';
    electricDetailsForm!: FormGroup;

    electricDetails!: IElectricDetails;

    tenantHasMultiSpeak: boolean;

    constructor(private fb: FormBuilder) {
        this.tenantHasMultiSpeak = false;
    }

    ngOnInit(): void {
        this.electricDetailsForm = this.fb.group({
            servicePrincipal: this.fb.group({
                appId: ['', Validators.required], // validGuidValidator
                appKey: ['', Validators.required],
                expirationDate: ['', Validators.required], // validDateValidator
            }),
            hybridConnectionString: [{ value: '', disabled: true }],
            multiSpeakPassword: [''],
            meterLifeCycle: this.fb.group({
                meterLifeCycleEnabled: [false],
                meterReadingUserId: [''],
                meterReadingPass: [''],
                connectUserId: [''],
                connectPassword: [''],
                cisHostUrl: [''],
            }),
            oms: this.fb.group({
                omsEnabled: [false],
                omsUrl: [''],
                omsUserId: [''],
                omsPassword: [''],
            })
        });

        if (this.tenantHasMultiSpeak) {
            const multiSpeakPasswordControl = this.electricDetailsForm.controls.multiSpeakPassword;
            multiSpeakPasswordControl.setValidators(Validators.required);
        }

        this.electricDetailsForm.controls.meterLifeCycleEnabled.valueChanges.subscribe(
            value => this.configureMeterLifeCycleValidators(value)
        );

        this.electricDetailsForm.controls.omsEnabled.valueChanges.subscribe(
            value => this.configureOmsValidators(value)
        );
    }

    save(): void { }

    configureMeterLifeCycleValidators(meterLifeCycleEnabled: boolean): void {
        if (meterLifeCycleEnabled) {
            this.electricDetailsForm.controls.meterReadingUserId.setValidators(Validators.required);
            this.electricDetailsForm.controls.meterReadingPass.setValidators(Validators.required);
            this.electricDetailsForm.controls.connectUserId.setValidators(Validators.required);
            this.electricDetailsForm.controls.connectPassword.setValidators(Validators.required);
            this.electricDetailsForm.controls.cisHostUrl.setValidators(Validators.required); // validUrlValidator
        } else {
            this.electricDetailsForm.controls.meterReadingUserId.clearValidators();
            this.electricDetailsForm.controls.meterReadingPass.clearValidators();
            this.electricDetailsForm.controls.connectUserId.clearValidators();
            this.electricDetailsForm.controls.connectPassword.clearValidators();
            this.electricDetailsForm.controls.cisHostUrl.clearValidators();
        }

        this.electricDetailsForm.controls.meterReadingUserId.updateValueAndValidity();
        this.electricDetailsForm.controls.meterReadingPass.updateValueAndValidity();
        this.electricDetailsForm.controls.connectUserId.updateValueAndValidity();
        this.electricDetailsForm.controls.connectPassword.updateValueAndValidity();
        this.electricDetailsForm.controls.cisHostUrl.updateValueAndValidity();
    }

    configureOmsValidators(omsEnabled: boolean): void {
        if (omsEnabled) {
            this.electricDetailsForm.controls.omsUrl.setValidators(Validators.required); // validUrlValidator
            this.electricDetailsForm.controls.omsUserId.setValidators(Validators.required);
            this.electricDetailsForm.controls.omsPassword.setValidators(Validators.required); 
        } else {
            this.electricDetailsForm.controls.omsUrl.clearValidators();
            this.electricDetailsForm.controls.omsUserId.clearValidators();
            this.electricDetailsForm.controls.omsPassword.clearValidators();
        }

        this.electricDetailsForm.controls.omsUrl.updateValueAndValidity();
        this.electricDetailsForm.controls.omsUserId.updateValueAndValidity();
        this.electricDetailsForm.controls.omsPassword.updateValueAndValidity();
    }
}