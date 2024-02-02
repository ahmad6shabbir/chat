import { GetApiData } from "../utils/http-client";

export const notificationsPush = function (id,data) {
    return GetApiData(`/prices/${id}`, 'PUT', data, true );
}