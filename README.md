Create chat bot in telegram
1. Open telegram
2. find bot @BotFather (https://t.me/BotFather)
3. Enter /newbot and after then enter name. You receive token, eg `5568674047:AAG56xftwRL8JafP6o7LXtolEcMyAJnWqaw`
4. find bot @myidbot (https://t.me/myidbot)
5. enter /getid . You receive chatId (telegramId) 


##### Create project
1. git clone https://github.com/7vano7/bot 
2. npm init
3. npm install telegraf
4. npm install axios

Start project 
node index.js

how to use

every $timelimit time system check server list connection and send message to telegram bot by condition

show server detail list
```
/list
```

manual check server status
```
/domain/action
```

where
```
domain  - server domain     //eg. https://test.com
action - uri                //eg. /check status


```

