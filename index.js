const { Telegraf } = require('telegraf');
const https = require('https');
const axios = require('axios');

const bot = new Telegraf('5568674047:AAG56xftwRL8JafP6o7LXtolEcMyAJnWqaw')

const chartId = '372747249';

let serverList = [
    {
        'server':'https//:google.com',
        'action': '/test',
        'method':'get',
        'data':'',
    },
    {
        'server':'https//:ezrust.com',
        'action': '/login',
        'method':'get',
        'data':'',
    }
];

let serverListCheck = [
    {
        'server':'https//:google.com',
    },
    {
        'server':'https//:ezrust.com',
    }
];

let actions = [
    '/get-status',
    '/get-eth-status'
];


setInterval(parseSites, 10000);

function parseSites() {
    // bot.telegram.sendMessage(chartId, 'sfsdf');
    serverList.forEach(function (key, obj) {
        axios({
            method: obj.method,
            url: obj.server+obj.action,
            data: obj.data
        }).then(res => {
            // console.log(res.data);

            // check something condition

            //send message to chart
            bot.telegram.sendMessage(chartId, res.data);

        })
            .catch(error => {
                console.error(error)
            });
    });
}

bot.start( ctx => ctx.reply(`"Hello!"`))
bot.on('text', async (ctx) => {
    try {
        const text = ctx.message.text;
        if(actions.includes(text)) {
            serverListCheck.forEach(function (key, obj) {
                axios({
                    method: 'get',
                    url: obj.server+text,
                    // data: data
                }).then(res => {
                    // console.log(res.data);
                    ctx.reply(res.status);

                })
                    .catch(error => {
                        console.error(error);
                    });
            });
        }

    } catch(e) {
        ctx.reply("Error");
    }
})
bot.launch()