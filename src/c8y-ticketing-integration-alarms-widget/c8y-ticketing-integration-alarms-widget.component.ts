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
import { AlarmStatus, IAlarm, IResultList, Severity } from '@c8y/client';
import { AlertService, Status } from '@c8y/ngx-components';
import { AlarmService, FetchClient, Realtime } from '@c8y/ngx-components/api';
import * as _ from 'lodash';


@Component({
    selector: "lib-c8y-ticketing-integration-alarms-widget",
    templateUrl: "./c8y-ticketing-integration-alarms-widget.component.html",
    styleUrls: ["./c8y-ticketing-integration-alarms-widget.component.css"],
})
export class CumulocityTicketingIntegrationAlarmsWidget implements OnInit {

    @Input() config;

    public alarms = [];

    constructor(private realtime: Realtime, private alarm: AlarmService) {
    }

    async ngOnInit(): Promise<void> {
        try {
           let deviceId = this.config.device.id;
           this.alarms = (await this.getAlarms(deviceId)).data;
           this.realtime.subscribe('/alarms/'+deviceId, (resp) => {
            if(resp.data.realtimeAction === "CREATE" && resp.data.data.status === AlarmStatus.ACTIVE) {
                this.alarms.push(resp.data.data);
            } 
           });
        } catch(e) {
            console.log("Ticketing Integration Alarms Widget - ngOnInit() "+e);
        }
    }

    private getAlarms(deviceId: string): Promise<IResultList<IAlarm>> {
        let filter: object = {
            source: deviceId,
            status: AlarmStatus.ACTIVE,
            pageSize: 50
        };
        return this.alarm.list(filter);
    }

}
