/**
 * TippsBackend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface MatchDto { 
    id: number;
    readonly dateString: string;
    groupName: string;
    matchNr: number;
    goalsShot: number;
    goalsReceived: number;
    team1Id: number;
    team2Id: number;
    team1Name: string;
    team2Name: string;
}

