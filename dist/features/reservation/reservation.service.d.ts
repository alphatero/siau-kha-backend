/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from 'mongoose';
import { Reservation, ReservationDocument, ReservationStatus } from 'src/core/models/reservation';
import { CreateReservationDto } from './dto/check-in-reservation.dto';
export declare class ReservationService {
    private readonly reservationModel;
    constructor(reservationModel: Model<ReservationDocument>);
    createReservation(dto: CreateReservationDto, userId: string): Promise<import("mongoose").Document<unknown, {}, ReservationDocument> & Omit<Reservation & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    getReservationWaitList(): Promise<(import("mongoose").Document<unknown, {}, ReservationDocument> & Omit<Reservation & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>)[]>;
    changeReservationStatus(id: string, action: ReservationStatus): Promise<void>;
}
