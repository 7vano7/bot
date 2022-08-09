const {Telegraf} = require('telegraf');
const https = require('https');
const axios = require('axios');

const bot = new Telegraf('5568674047:AAG56xftwRL8JafP6o7LXtolEcMyAJnWqaw')

const chatId = '372747249';

const serverList = [
    {
        'domain': 'https://google.com',
        'action': '/test',
        'method': 'get',
        'data': '',
    },
    {
        'domain': 'https://ezrust.com',
        'action': '/login',
        'method': 'get',
        'data': '',
    }
];

const list = '/list';


setInterval(parseSites, 10000);

function parseSites() {
    // bot.telegram.sendMessage(chartId, 'sfsdf');
    serverList.forEach(function (key, obj) {
        axios({
            method: obj.method,
            url: toString(obj.domain + obj.action),
            data: obj.data
        }).then(res => {
            // console.log(res.data);

            // check something condition

            //send message to chat
            bot.telegram.sendMessage(chatId, res.data);

        })
            .catch(error => {
                console.error(error)
            });
    });
}

bot.start(ctx => ctx.reply(`"Hello!"`))
bot.on('text', async (ctx) => {
    try {
        const text = ctx.message.text;
        serverList.forEach(function (obj, key) {
            if(text == list) {
                let {domain, action, method, data} = obj;
                let format = `
                    domain: ${domain},
                    action: ${action},
                    method: ${method},
                    data: ${data},
                `;
                ctx.reply(format);
            }
            else if (text == toString(obj.domain + obj.action)) {
                axios({
                    method: obj.method,
                    url: toString(obj.domain + obj.action),
                    data: obj.data
                }).then(res => {
                    // console.log(res.data);
                    ctx.reply(res.status);

                })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    } catch
        (e) {
        ctx.reply("Error");
    }
})
bot.launch()