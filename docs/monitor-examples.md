---
title: Monitor Examples | Kener
description: Here are some exhaustive examples for monitors
---

# Monitor Examples

Here are some exhaustive examples for monitors

## Simple GET Monitor

Below example will call https://www.google.com/webhp. If the status code is 200 then it will be UP else DOWN.

```yaml
- name: Google Search
  tag: "google-search"
  api:
  	method: GET
  	url: https://www.google.com/webhp
```

## Simple GET Monitor Without Hyperlink

Below example will call https://www.google.com/webhp. If the status code is 200 then it will be UP else DOWN. It will not show the GET hyperlink in the monitor description.

```yaml
- name: Google Search
  tag: "google-search"
  api:
  	method: GET
  	url: https://www.google.com/webhp
	hideURLForGet: true
```

## Monitor with HTML description

Below example will call https://www.google.com/webhp. If the status code is 200 then it will be UP else DOWN. It will show the description in HTML format.

```yaml
- name: Google Search
  tag: "google-search"
  description: "Hello <b>world</b>"
  api:
  	method: GET
  	url: https://www.google.com/webhp
```

## Monitor with image

google.png is in the static folder

```yaml
- name: Google Search
  tag: "google-search"
  image: "/google.png"
  api:
  	method: GET
  	url: https://www.google.com/webhp
```

## Get Monitor 15 Minute

Below example will call https://www.google.com/webhp every 15 minutes. If the status code is 200 then it will be UP else DOWN.

```yaml
- name: Google Search
  description: Search the world's information, including webpages, images, videos and more.
  tag: "google-search"
  cron: "*/15 * * * *"
  api:
  	method: GET
  	url: https://www.google.com/webhp
```

## POST Monitor With Body

Below example will call https://www.google.com/webhp with body. If the status code is 200 then it will be UP else DOWN.

```yaml
- name: Google Search
  description: Google Search
  tag: "google-search-post"
  api:
  	method: POST
  	url: https://www.google.com/webhp
  	headers:
    	Content-Type: application/json
  	body: '{"order_amount":22222.1,"order_currency":"INR"}'
```

## Secrets in Header

You can set ENV variables in your machine and use them in your monitors. Example below has `GH_TOKEN` as an environment variable. It uses process.env.GH_TOKEN.

```
export GH_TOKEN=some.token.for.github
```

> **_NOTE:_** DO NOT forget the `$` sign in your monitor secret, otherwise it will not be picked up.

```yaml
- name: Github Issues
  description: Github Issues Fetch
  tag: "gh-search-issue"
  api:
  	method: GET
  	url: https://api.github.com/repos/rajnandan1/kener/issues
  	headers:
		Authorization: Bearer $GH_TOKEN
```

## Secrets in Body

Assuming `ORDER_ID` is present in env

```yaml
- name: Github Issues
  description: Github Issues Fetch
  tag: "gh-search-issue"
  api:
  	method: POST
  	url: https://api.github.com/repos/rajnandan1/kener/issues
  	headers:
		Content-Type: application/json
  	body: '{"order_amount":22222.1,"order_currency":"INR", "order_id": "$ORDER_ID"}'
```

## Eval Body

Read more about [eval](https://kener.ing/docs/monitors#eval)

Below example will call https://api.github.com/repos/rajnandan1/kener/issues. If the status code is 200 then it will be UP else DOWN. It will also check if the response time is greater than 2000ms then it will be DEGRADED.

```yaml
- name: Github Issues
  description: Github Issues Fetch
  tag: "gh-search-issue"
  api:
  	method: GET
  	url: https://api.github.com/repos/rajnandan1/kener/issues
  	eval: |
		(function(statusCode, responseTime, responseDataBase64){
		const resp = JSON.parse(atob(responseDataBase64));
		let status = 'DOWN'
		if(statusCode == 200) status = 'UP';
		if(Object.keys(resp).length == 0) status = 'DOWN';
		if(statusCode == 200 && responseTime > 2000) status = 'DEGRADED';
		return {
			status: status,
			latency: responseTime,
		}
		})
```

## With default_status UP

Each minute it will set the status as UP

```yaml
- name: Earth
  description: Our Planet
  tag: "earth"
  default_status: UP
```

## With Category

Add this monitor to the API category instead of the default home category

```yaml
- name: Earth
  description: Our Planent
  tag: "earth"
  category: API
```

## Ping Monitor

This will ping the hosts. It will be up if the ping is successful for all the hosts present in the list of ip4 and ip6.

```yaml
- name: Earth
  description: Our Planent
  tag: "earth"
  ping:
      hostsV4:
          - www.frogment.com
          - 52.84.205.24
      hostsV6:
          - ipv6.google.com
```

If both ping and api monitors are present then API data will overwrite ping data

## Custom Thresholds

The below monitor will show DEGRADED if 3 or more degraded status in a day and DOWN if 2 or more down status in a day. It will also include degraded in downtime calculation.

```yaml
- name: Earth
  description: Our blue planet
  tag: "earth"
  default_status: "UP"
  day_degraded_minimum_count: 3
  day_down_minimum_count: 2
  include_degraded_in_downtime: true
```

## Monitor with Alerts

Make sure you have set up triggers in `server.yaml`. Read more about [alerts](/docs/alerting).

The below example will trigger an alert if the monitor is DOWN for 10 consecutive times. It will also create an incident in Github and send alerts to Webhook, Discord, Slack, and Telegram. It will also trigger an alert if the monitor is DEGRADED for 5 consecutive times. It will not create an incident in Github and send alerts to Webhook, Discord, Slack, and Telegram.

```yaml
- name: Earth
  description: Our blue planet
  tag: "earth"
  default_status: "UP"
  include_degraded_in_downtime: true
  alerts:
      DOWN:
          failureThreshold: 10
          successThreshold: 5
          createIncident: true
          description: "🚨 So much panic in the world and kener tells you about it"
          triggers:
              - Webhook MyWebhook
              - Discord Test
              - Slack Test
              - Telegram Test
      DEGRADED:
          failureThreshold: 5
          successThreshold: 2
          createIncident: false
          description: "⚠️ To degrade is human, to alert is kener"
          triggers:
              - Webhook MyWebhook
              - Discord Test
              - Slack Test
              - Telegram Test
```
