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
import { FileDto } from './fileDto';


export interface GetFilesResponse { 
    success: boolean;
    message?: string;
    error?: object;
    statusCode?: number;
    errorGuid?: string;
    token?: string;
    filteredResults: object;
    files: Array<FileDto>;
}

