declare module 'azure-keyvault' {
    var azureKeyVault: azureKeyVault;

    export = azureKeyVault;
}

interface azureKeyVault {
    KeyVaultCredentials: KeyVaultCredentials;
    KeyVaultClient: KeyVaultClient;
}

interface KeyVaultCredentials {
    (authenticator: Function): void;
}

interface KeyVaultClient {
    (credentials: KeyVaultCredentials, options?: any): void;
    getKeys(vaultBaseUrl: string, options: any, callback: Function);
    getSecrets(vaultBaseUrl: string, options: any, callback: Function);
    getSecret(secretIdentifier: string, options: any, callback: Function);
    getSecret(secretIdentifier: string, callback: Function);
}