<script>
  import CharacterCard from './lib/components/CharacterCard.svelte';
  import ReportForm from './lib/components/ReportForm.svelte';
  import ImageUploader from './lib/components/ImageUploader.svelte';
</script>

<header class="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-2 dark:bg-neutral-900 dark:border-neutral-700">
  <nav class="flex flex-nowrap basis-full items-center w-full lg:max-w-[90rem] mx-auto px-4 md:px-8">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a class="flex-none rounded-md focus:outline-hidden focus:opacity-80" href="/">
      <svg width="32" height="32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="black"/>
        <path d="M68.0282 96.7824H61.1668L83.7003 45.7935H100.776L73.5641 104H55.241L28.0292 45.7935H45.3387L68.0282 96.7824Z" fill="white"/>
        <path d="M45.8553 24.6063L37.8243 41.3698L36.9666 35.5491C38.63 35.5491 40.1374 35.9372 41.4889 36.7133C42.8404 37.4894 43.932 38.55 44.7637 39.8952C45.5434 41.2404 45.9332 42.715 45.9332 44.3189C45.9332 45.9746 45.5434 47.4491 44.7637 48.7426C43.932 50.0878 42.8404 51.1485 41.4889 51.9246C40.1374 52.7007 38.63 53.0887 36.9666 53.0887C35.2513 53.0887 33.7178 52.7007 32.3664 51.9246C31.0149 51.1485 29.9493 50.062 29.1696 48.665C28.3899 47.3198 28 45.7935 28 44.0861C28 42.5339 28.3899 40.8783 29.1696 39.1191C29.8973 37.36 31.1708 35.1094 32.9901 32.3672L38.1362 24.6063L45.8553 24.6063Z" fill="white"/>
        <path d="M83.1447 24L91.1757 40.7635L92.0334 34.9428C90.37 34.9428 88.8626 35.3309 87.5111 36.107C86.1596 36.883 85.068 37.9437 84.2363 39.2889C83.4566 40.6341 83.0668 42.1087 83.0668 43.7126C83.0668 45.3683 83.4566 46.8428 84.2363 48.1363C85.068 49.4815 86.1596 50.5422 87.5111 51.3183C88.8626 52.0943 90.37 52.4824 92.0334 52.4824C93.7487 52.4824 95.2822 52.0943 96.6336 51.3183C97.9851 50.5422 99.0507 49.4557 99.8304 48.0587C100.61 46.7135 101 45.1872 101 43.4798C101 41.9276 100.61 40.272 99.8304 38.5128C99.1027 36.7537 97.8292 34.503 96.0099 31.7609L90.8638 24L83.1447 24Z" fill="white"/>
        <path d="M64.1954 53.6756L56.5462 40.4882L71.8447 40.4882L64.1954 53.6756Z" fill="white"/>
        </svg>
        
    </a>
    
    <div class="flex items-center ms-auto md:w-full md:gap-x-3 md:order-3 md:ms-0">
      <div class="flex items-center relative z-10 ms-auto">
          <a
              class="inline-flex border border-gray-200 rounded-full p-1 px-2 shrink-0 justify-center items-center text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:outline-hidden"
              href="https://github.com/exhertz/villagerp-bp-generator"
              target="_blank"
              rel="noopener noreferrer"
          >
              <svg class="shrink-0 size-4 me-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span style="min-width: 36px;">Source</span>
              <span class="sr-only">Github</span>
          </a>
      </div>
  </div>
  </nav>
</header>

<main class="flex flex-col w-full lg:max-w-[90rem] mx-auto py-4 px-4 md:px-8">

  <CharacterCard />

  <ImageUploader />

  <ReportForm />
    
  <div class="max-w-[90rem] mx-auto text-gray-400">
  <p>Сделано при поддержке неравнодушных!</p>
  </div>
</main>
