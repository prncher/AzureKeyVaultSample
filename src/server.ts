/// <reference path="../azure.keyvault.typings/index.d.ts" />
'use strict';

import kvm = require('./keyVaultManage');
import express = require('express');
import http = require('http');
import fs = require('fs');
import jwt = require('jsonwebtoken');

var port = process.env.port || 8080;

var app = express();
var server = http.createServer(app);

app.get('/', (req: express.Request, res: express.Response) => {
    var initData = JSON.parse(fs.readFileSync('config.json', 'UTF-8'));
    var kvManager = new kvm.KeyVaultManager(initData.id, initData.key);

    kvManager.getSecret(initData.url + '/secrets/' + initData.tokenName + '/' + initData.tokenVersion,
        (result: any) => {
            var decoded = jwt.decode(result.value, {
                json: true
            });
            res.writeHead(200);
            res.end(JSON.stringify(decoded));

        });
});


server.listen(port, () => {
    console.warn('listening on *: ' + port);
});
