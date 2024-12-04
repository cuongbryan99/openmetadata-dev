/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 *  Copyright 2021 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

 /**
 * Exasol Database Connection Config
 */
export interface ExasolConnection {
    connectionArguments?: { [key: string]: any };
    connectionOptions?:   { [key: string]: string };
    /**
     * Host and port of the source service.
     */
    hostPort: string;
    /**
     * Password to connect to Exasol.
     */
    password: string;
    /**
     * SQLAlchemy driver scheme options.
     */
    scheme?:                     ExasolScheme;
    supportsMetadataExtraction?: boolean;
    /**
     * Client SSL/TLS settings.
     */
    tls?: SSLTLSSettings;
    /**
     * Service Type
     */
    type?: ExasolType;
    /**
     * Username to connect to Exasol. This user should have privileges to read all the metadata
     * in Exasol.
     */
    username: string;
}

/**
 * SQLAlchemy driver scheme options.
 */
export enum ExasolScheme {
    ExaWebsocket = "exa+websocket",
}

/**
 * Client SSL/TLS settings.
 */
export enum SSLTLSSettings {
    DisableTLS = "disable-tls",
    IgnoreCertificate = "ignore-certificate",
    ValidateCertificate = "validate-certificate",
}

/**
 * Service Type
 *
 * Service type.
 */
export enum ExasolType {
    Exasol = "Exasol",
}
