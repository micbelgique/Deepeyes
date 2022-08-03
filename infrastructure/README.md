# Deepeyes Infrastructure

## How to



## Get your Credentials

You can create a service principal with the az ad sp create-for-rbac command in the Azure CLI. Run this command with Azure Cloud Shell in the Azure portal or in your PowerShell with the CLI.

Create a resource group if you do not already have one.

```az group create -n {MyResourceGroup} -l {location}```

Replace the placeholder myApp with the name of your application.

```az ad sp create-for-rbac --name {myApp} --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/{MyResourceGroup} --sdk-auth```

In the example above, replace the placeholders with your subscription ID and resource group name. The output is a JSON object with the role assignment credentials that provide access to your App Service app similar to below. Copy this JSON object for later. You will only need the sections with the clientId, clientSecret, subscriptionId, and tenantId values.

```
{
    "clientId": "<GUID>",
    "clientSecret": "<GUID>",
    "subscriptionId": "<GUID>",
    "tenantId": "<GUID>",
    (...)
  }
```

![MIC Belgique](https://cdn.discordapp.com/attachments/988803921634021466/997492237783007292/Capture_decran_2022-04-26_135503.png)

## Authors

- [@Antoine Smet](https://github.com/AntoineSmet/)
- [@Lloyd Colart](https://github.com/Lloydcol/)
- [@Victor Santelé](https://github.com/WolfVic/)