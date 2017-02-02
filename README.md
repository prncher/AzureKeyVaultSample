# AzureKeyVaultSample
================

## Documentation

Follow the steps below to try AzureKeyVaultSample.

1. Create an application and register the application in Azure AD. (https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-app-registration)
2. Note down the "Display Name", "Application ID" and the "Application Secret". Enter Application ID and Application Secret in the id and key values in config.json
3. Create a KeyVault by providing a name, note down the name. Use the name to fill in the url in config.json - https://{key vault name}.vault.azure.net (https://docs.microsoft.com/en-us/azure/guidance/guidance-multitenant-identity-keyvault)
4. Add a principal in the key vault as the aplication. The application created in 1 is used here.

5. This sample uses only secrets. Add a secret by providing a key and value. Note down the key name and enter it as token name in config.json.

6. Click on the secret just created and look at the "Secret Identifier". The last 32 characters are the tokenVesrion. Copy this value in config.json.

7. Modify index.d.ts inside "azure.keyvault.typings" to support more funstions exposed by azurekeyvault javascript code. (At the time of developing this sample, no typedefs were avaialble from @types or typings.)

8. The token value in this sample is encoded. That is the reason it is decoded using jsonwebtoken. You may use regulat text and remove decode inside server.ts.
