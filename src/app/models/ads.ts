import { CarColor } from "./carColor";
import { CarTransmission } from "./carTransmission";
import { Category } from "./category";
import { City } from "./city";
import { EngineCapacity } from "./engineCapacity";
import { Furnishing } from "./furnishing";
import { Mawater } from "./mawater";
import { MawaterStatus } from "./mawaterStatus";
import { MawaterStructure } from "./mawaterStructure";
import { MawaterType } from "./mawaterType";
import { WheelMovement } from "./wheelMovement";
import { Year } from "./year";

export interface Ads {
    id : string
    adsDateTime : Date,
    adsId : string,
    adsUser : adsUser,
    carTransmition : CarTransmission,
    category : Category,
    city : City,
    color : CarColor,
    description : string,
    enginCapacity : EngineCapacity,
    fuelType : fuelType,
    furnishing : Furnishing,
    images : string[],
    isActive : boolean,
    mainImage : string,
    mawater : Mawater,
    mawaterStatus : MawaterStatus,
    mawaterStructure : MawaterStructure,
    mawaterType : MawaterType,
    numberOfSeats : number,
    packageId : string,
    price : number,
    subject : string,
    traveledDistance : string,
    wheelMovement : WheelMovement,
    year : Year,
    mainImagePath?:string ,
    status : number
}

export interface adsUser{
    userId : string,
    userName : string,
    userPhone : string,
    userType : number,
}

export interface fuelType{
    fuelArabicName : string,
    fuelId: string,
    fuelName: string
}
