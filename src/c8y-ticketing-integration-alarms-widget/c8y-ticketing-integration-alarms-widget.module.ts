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

import { CoreModule, HOOK_COMPONENTS } from "@c8y/ngx-components";
import { ModalModule } from "ngx-bootstrap/modal";
import { CumulocityTicketingIntegrationAlarmsWidgetConfig } from "./c8y-ticketing-integration-alarms-widget.config.component";
import { CumulocityTicketingIntegrationAlarmsWidget } from "./c8y-ticketing-integration-alarms-widget.component";
import { NgModule } from "@angular/core";
import { TicketCommentModal } from "./modal/ticket-comment-modal.component";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TicketIdReplacementPipe } from "./pipe/TicketIdReplacementPipe";

@NgModule({
    imports: [
        CoreModule,
        ModalModule,
        CollapseModule
    ],
    declarations: [
        CumulocityTicketingIntegrationAlarmsWidget, 
        CumulocityTicketingIntegrationAlarmsWidgetConfig,
        TicketCommentModal,
        TicketIdReplacementPipe
    ],
    entryComponents: [
        CumulocityTicketingIntegrationAlarmsWidget, 
        CumulocityTicketingIntegrationAlarmsWidgetConfig,
        TicketCommentModal
    ],
    providers: [
        {
            provide: HOOK_COMPONENTS,
            multi: true,
            useValue: {
                id: "global.presales.c8y.ticketing.integration.alarms.widget",
                label: "Ticketing Integration Alarms",
                description: "Depends on Ticketing Integration microservice. Shows active alarms related to a device and and allows to create tickets.",
                component: CumulocityTicketingIntegrationAlarmsWidget,
                configComponent: CumulocityTicketingIntegrationAlarmsWidgetConfig,
                previewImage: require("@widget-assets/img-preview.png"),
                data: {
                    ng1: {
                        options: { noDeviceTarget: false, deviceTargetNotRequired: false },
                    },
                },
            },
        },
    ],
})
export class CumulocityTicketingIntegrationAlarmsWidgetModule { }
