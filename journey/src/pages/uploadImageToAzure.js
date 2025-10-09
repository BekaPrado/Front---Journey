// uploadImageToAzure.js

export async function uploadImageToAzure(uploadParams) {

    const { file, storageAccount, sasToken, containerName } = uploadParams;

    // Garante que o nome do arquivo seja único para evitar colisões no Blob Storage
    const blobName = `${Date.now()}-${file.name}`;

    // Constrói a URL base e a URL de uplaoad, anexando o SAS Token
    const baseUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${blobName}`;
    const uploadUrl = `${baseUrl}?${sasToken}`;

    const options = {
      method: "PUT",
      headers: {
        // Obrigatório para o Azure Blob Storage
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type || "application/octet-stream",
      },
      // O corpo da requisição é o próprio objeto File
      body: file,
    }

    const response = await fetch(uploadUrl, options);

    if (response.ok) {
      // Retorna a URL pública do blob
      return baseUrl;
    }else {
      // Retorna false ou o status/texto do erro para tratamento no chamador
      console.error("Erro no upload para Azure Blob Storage:", response.status, response.statusText);
      // Você pode retornar o `response.ok` que é `false` ou lançar um erro mais detalhado
      throw new Error(`Falha no upload (Status: ${response.status}).`);
    }
}