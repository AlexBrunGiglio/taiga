/**
 * API template
 * API template description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface FileDto { 
    id?: string;
    creationDate?: Date;
    modifDate?: Date;
    archived: boolean;
    name: string;
    type: string;
    originalname: string;
    path: string;
    userId?: string;
}

