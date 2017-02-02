//
// Copyright Prince Cheruvathur.
//
'use strict';

import azureKeyVault = require('azure-keyvault');
import adalNode = require('adal-node');

export class KeyVaultManager {
    id: string;
    key: string;
    credentials: KeyVaultCredentials;
    client: KeyVaultClient;
    constructor(id: string, key: string) {
        this.id = id;
        this.key = key;
        this.credentials = new azureKeyVault.KeyVaultCredentials(this.authContext);
        this.client = new azureKeyVault.KeyVaultClient(this.credentials);
    }

    getSecret = (secretIdentifier: string, callback: Function) => {
        console.warn('Getting the secret');
        if (this.client) {
            this.client.getSecret(secretIdentifier, function (err: Error, result: any) {
                if (err) {
                    throw err;
                }
                console.warn('Secret found' + JSON.stringify(result));
                callback(result);
            });
        } else {
            console.warn('Unable to get the Key Vault Client');
        }
    }

    authContext = (challenge: any, callback: any) => {
        // Create authentication context.   
        var context = new adalNode.AuthenticationContext(challenge.authorization);
        if (!context) {
            console.warn('Unable to get the Authentication Context');
            return null;
        }
        // Get token.   
        return context.acquireTokenWithClientCredentials(challenge.resource, this.id, this.key,
            (err: Error, tokenResponse: any) => {
                if (err) { throw err; }
                var authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;
                return callback(null, authorizationValue);
            });
    }
}
