console.log('\033c');

'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const telegraf = require('telegraf');

const bot = new telegraf('670274540:AAEI6tdhQww2IsWzrphITbXUSXCX6vYBQFg', {
	username: 'MabelGleefulBot'	
});
const fs = require('fs');
bot.on('text', async(ctx) => {
	console.log()
	const msg = `${ctx.from.first_name} says: ${ctx.message.text}`
	console.log(msg)
	await request({
		url: 'https://tensorflow-bot.herokuapp.com/prediction',
		method: 'POST',
		body: {message: ctx.message.text},
		headers: {'User-Agent': 'request'},
		json: true 
	}, async (error, response, body)  => {
		ctx.reply(body)
		fs.appendFile('msg.txt', msg + '\n', (err) => {
			if(err) return console.log(err);
			console.log("written");		
		});
	})
});
console.log('[INFO] Bot Running');
bot.startPolling();
bot.startPolling();