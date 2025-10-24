<script>
    let file;
    let uploadResult;
    let errorMessage;
    let uploadedImages = []; // Массив для хранения информации о загруженных изображениях
  
    async function uploadFile() {
      if (!file) {
        errorMessage = "Please select a file";
        return;
      }
  
      errorMessage = null;
  
      const timestamp = Date.now();
      const authToken = "399f1f07d3c41201ab920a0ba5819efb8f572b7a"; // ?
      const expiration = "P1M";
  
      const formData = new FormData();
      formData.append("source", file);
      formData.append("type", "file");
      formData.append("action", "upload");
      formData.append("timestamp", timestamp);
      formData.append("auth_token", authToken);
      formData.append("expiration", expiration);
  
      try {
        const response = await fetch("https://imgbb.com/json", {
          method: "POST",
          headers: {
            "Origin": "https://imgbb.com",
            "Referer": "https://imgbb.com/",
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        uploadResult = await response.json();
        console.log("Upload result:", uploadResult);
  
        if (uploadResult.status_code !== 200) {
          errorMessage = `Upload failed: ${uploadResult.status_txt}`;
        } else {
          uploadedImages = [...uploadedImages, {
            name: uploadResult.image.filename,
            url: uploadResult.image.url,
          }];
  
          file = null;
        }
      } catch (error) {
        console.error("Upload error:", error);
        errorMessage = `Upload failed: ${error.message}`;
      }
    }
  
    function handleFileSelect(event) {
      file = event.target.files[0];
    }
  </script>
  
  <div class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl mb-4">
    <div class="p-4 md:p-7">
      <h3 class="text-lg font-bold text-gray-800 flex items-center mb-4">
        Загрузить изображение на imgbb
      </h3>
      <p class="mb-2">Загружаемое изображение будет удалено через 1 месяц.</p>
      <div class="flex items-center justify-start space-x-2 mb-4">
        <label
          for="file-upload"
          class="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
        >
          Choose a file
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          on:change={handleFileSelect}
          class="sr-only"
          bind:this={fileInput}
        />
  
        <button
          type="button"
          class="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          on:click={uploadFile}
          disabled={!file}
        >
          Upload
        </button>
      </div>
  
      {#if errorMessage}
        <p class="mt-2 text-red-500">{errorMessage}</p>
      {/if}
  
      {#if uploadedImages.length > 0}
        <div class="overflow-x-auto mt-4">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead class="bg-gray-50 dark:bg-neutral-800">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                >
                  Filename
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                >
                  URL
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:bg-neutral-900 dark:divide-neutral-700">
              {#each uploadedImages as image (image.url)}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {image.name}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-500 hover:text-blue-700"
                    >
                      {image.url}
                    </a>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>