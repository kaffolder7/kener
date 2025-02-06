// @ts-nocheck
import Webhook from "./webhook.js";
import Discord from "./discord.js";
import Slack from "./slack.js";
import Telegram from "./telegram.js";
import Email from "./email.js";

class Notification {
	client;

	constructor(trigger, siteData, monitorData) {
		let trigger_meta = JSON.parse(trigger.trigger_meta);
		if (trigger.trigger_type === "webhook") {
			this.client = new Webhook(trigger_meta, "POST", siteData, monitorData);
		} else if (trigger.trigger_type === "discord") {
			this.client = new Discord(trigger_meta.url, siteData, monitorData);
		} else if (trigger.trigger_type === "slack") {
			this.client = new Slack(trigger_meta.url, siteData, monitorData);
		} else if (trigger.trigger_type === "telegram") {
			this.client = new Telegram(trigger_meta.botToken, trigger_meta.chatId, siteData, monitorData);
		} else if (trigger.trigger_type === "email") {
			this.client = new Email(trigger_meta, siteData, monitorData);
		} else {
			console.log("Invalid Notification");
			process.exit(1);
		}
	}

	async send(data) {
		return await this.client.send(data);
	}
}
export default Notification;
