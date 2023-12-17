// @ts-nocheck
import { MONITOR, SITE } from "./constants.js";
import axios from "axios";
import moment from "moment";

const GH_TOKEN = process.env.GH_TOKEN;
const IsValidURL = function (url) {
    return /^(http|https):\/\/[^ "]+$/.test(url);
};
const IsValidHTTPMethod = function (method) {
    return /^(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH)$/.test(method);
};
function generateRandomColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
    //random color will be freshly served
}
const LoadMonitorsPath = function () {
    const argv = process.argv;

    if (!!process.env.MONITOR_YAML_PATH) {
        return process.env.MONITOR_YAML_PATH;
    }

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === "--monitors") {
            return argv[i + 1];
        }
    }

    return MONITOR;
};
const LoadSitePath = function () {
    const argv = process.argv;

    if (!!process.env.SITE_YAML_PATH) {
        return process.env.SITE_YAML_PATH;
    }

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === "--site") {
            return argv[i + 1];
        }
    }

    return SITE;
};
//return given timestamp in UTC
const GetNowTimestampUTC = function () {
    //use js date instead of moment
    const now = new Date();
    const timestamp = now.getTime();
    return Math.floor(timestamp / 1000);
};
//return given timestamp minute start timestamp in UTC
const GetMinuteStartTimestampUTC = function (timestamp) {
    //use js date instead of moment
    const now = new Date(timestamp * 1000);
    const minuteStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0, 0);
    const minuteStartTimestamp = minuteStart.getTime();
    return Math.floor(minuteStartTimestamp / 1000);
};
//return current timestamp minute start timestamp in UTC
const GetMinuteStartNowTimestampUTC = function () {
    //use js date instead of moment
    const now = new Date();
    const minuteStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0, 0);
    const minuteStartTimestamp = minuteStart.getTime();
    return Math.floor(minuteStartTimestamp / 1000);
};
//return given timestamp day start timestamp in UTC
const GetDayStartTimestampUTC = function (timestamp) {
    //use js date instead of moment
    const now = new Date(timestamp * 1000);
    const dayStart = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
    const dayStartTimestamp = dayStart.getTime();
    return Math.floor(dayStartTimestamp / 1000);
};
const DurationInMinutes = function (start, end) {
	return Math.floor((end - start) / 60);
}
export {
    IsValidURL,
    IsValidHTTPMethod,
    LoadMonitorsPath,
    LoadSitePath,
    GetMinuteStartTimestampUTC,
    GetNowTimestampUTC,
    GetDayStartTimestampUTC,
    GetMinuteStartNowTimestampUTC,
    DurationInMinutes,
};
