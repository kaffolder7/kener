// @ts-nocheck
class Telegram {
  baseUrl;
  botToken;
  chatId;
  headers;
  method;
  siteData;
  monitorData;

  constructor(botToken, chatId, siteData, monitorData) {
    const kenerHeader = {
      "Content-Type": "application/json",
      "User-Agent": "Kener"
    };

    this.baseUrl = `https://api.telegram.org/bot${botToken}`;
    this.chatId = chatId;
    this.headers = Object.assign(kenerHeader, {});
    this.method = "POST";
    this.siteData = siteData;
    this.monitorData = monitorData;
  }

  transformData(alert) {
    // Format timestamp
    const timestamp = new Date(alert.timestamp).toLocaleString();

    // Create message text using Telegram's supported HTML formatting
    const message = `
<b>${alert.alert_name}</b>

${alert.status === "TRIGGERED" ? "🔴 Triggered" : "🟢 Resolved"}

${alert.description}

<b>Source:</b> ${alert.source}
<b>Severity:</b> ${alert.severity}
<b>Status:</b> ${alert.status}

<b>Metric:</b> ${alert.details.metric}
<b>Current Value:</b> ${alert.details.current_value}
<b>Threshold:</b> ${alert.details.threshold}
<b>Timestamp:</b> ${timestamp}
`;

    return {
      chat_id: this.chatId,
      text: message,
      parse_mode: 'HTML',
      // If there are actions, add them as inline keyboard
      ...(alert.actions?.length > 0 && {
        reply_markup: {
          inline_keyboard: [
            alert.actions.map(action => ({
              text: action.text,
              url: action.url
            }))
          ]
        }
      })
    };
  }

  async send(data) {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.transformData(data))
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(`Telegram API Error: ${result.description}`);
      }
      
      return result;
    } catch (error) {
      console.error("Error sending Telegram message", error);
      return error;
    }
  }
}

export default Telegram;