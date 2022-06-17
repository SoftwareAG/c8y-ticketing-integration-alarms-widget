/**
 * /*
 * Copyright (c) 2019 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @format
 */

import { Component, Input, OnInit } from '@angular/core';
import { AlarmStatus } from '@c8y/client';
import { AlertService } from '@c8y/ngx-components';
import { AlarmService, FetchClient, Realtime } from '@c8y/ngx-components/api';
import * as _ from 'lodash';
import { BsModalService, BsModalRef  } from 'ngx-bootstrap/modal';
import { TicketCommentModal  } from './modal/ticket-comment-modal.component';


@Component({
    selector: "lib-c8y-ticketing-integration-alarms-widget",
    templateUrl: "./c8y-ticketing-integration-alarms-widget.component.html",
    styleUrls: ["./c8y-ticketing-integration-alarms-widget.component.css"],
})
export class CumulocityTicketingIntegrationAlarmsWidget implements OnInit {

    @Input() config;

    private deviceId: string = "";

    public alarms = [];

    private ticketModalRef: BsModalRef;

    constructor(private realtime: Realtime, private alarm: AlarmService, private fetchClient: FetchClient, private alertService: AlertService, private modalService: BsModalService) {
    }

    async ngOnInit(): Promise<void> {
        try {
           this.deviceId = this.config.device.id;
           await this.getAlarms();
           this.realtime.subscribe('/alarms/'+this.deviceId, (resp) => {
            if(resp.data.realtimeAction === "CREATE" && resp.data.data.status === AlarmStatus.ACTIVE) {
                this.alarms.push(resp.data.data);
            } 
           });
        } catch(e) {
            this.alertService.danger("Ticketing Integration Alarms Widget - ngOnInit()", e);
        }
    }

    private async getAlarms(): Promise<void> {
        let filter: object = {
            source: this.deviceId,
            status: AlarmStatus.ACTIVE,
            pageSize: 50
        };
        this.alarms = (await this.alarm.list(filter)).data;
    }

    public createTicket(alarmId: string) {
        let message = {
            'alarmId': alarmId
        };
        this.ticketModalRef = this.modalService.show(TicketCommentModal, { class: 'c8y-wizard', initialState: {message} });
        
        // On modal hidden
        this.ticketModalRef.onHidden.subscribe(() => {
            this.getAlarms();
        });
    }

    

}
