# Deepeyes Workflows

## How to.

### Create your Github Secrets.

You need to create secrets for your Azure credentials, resource group, and subscriptions.

- In GitHub, browse your repository.

- Select Settings > Secrets > New secret.

- Paste the entire JSON output from the Azure CLI command into the secret's value field. Give the secret the name AZURE_CREDENTIALS.

- Create another secret named AZURE_RG. Add the name of your resource group to the secret's value field (example: myResourceGroup).

- Create an additional secret named AZURE_SUBSCRIPTION. Add your subscription ID to the secret's value field (example: 90fd3f9d-4c61-432d-99ba-1273f236afa2).

## Run the workflow

Go to you reposity in Action, select the workflow called "Deploy ARM Template" and click on Run workflow.

Let's the magic begin! This workflow will deploy all the stucture you need for your project on Azure.




![MIC Belgique](https://cdn.discordapp.com/attachments/988803921634021466/997492237783007292/Capture_decran_2022-04-26_135503.png)

## Authors

- [@Antoine Smet](https://github.com/AntoineSmet/)
- [@Lloyd Colart](https://github.com/Lloydcol/)
- [@Victor Santelé](https://github.com/WolfVic/)
