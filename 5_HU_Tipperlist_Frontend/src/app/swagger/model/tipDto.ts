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
import { SingleTipDto } from './singleTipDto';


export interface TipDto { 
    tipperId: number;
    tipperName: string;
    points: number;
    nrTipsExact: number;
    nrTips12X: number;
    tips: Array<SingleTipDto>;
}
