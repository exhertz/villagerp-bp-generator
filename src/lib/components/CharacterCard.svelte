<script lang="ts">
    import { onMount } from 'svelte';
    import {
        nickname,
        experience,
        coins,
        selectedBonusKey,
        updateNickname,
        updateExperience,
        updateCoins,
        updateSelectedBonusKey,
    } from '../userStore.js';
    import { get } from 'svelte/store'; // Import get
    import bpBonuses from '../Bonuses.js';

    let isEditingNickname: boolean = false;
    let tempNickname: string = '';

    function startEditingNickname() {
        tempNickname = get(nickname);
        isEditingNickname = true;
    }

    function saveNickname() {
        updateNickname(tempNickname);
        isEditingNickname = false;
    }

    function cancelEditingNickname() {
        isEditingNickname = false;
    }

    function selectBonus(bonusKey: string) {
        updateSelectedBonusKey(bonusKey);
    }

    function handleKeyDownNickname(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            if (isEditingNickname) saveNickname();
        } else if (event.key === 'Escape') {
            if (isEditingNickname) cancelEditingNickname();
        }
    }

    onMount(() => {
        // Инициализация selectedBonusKey, если он не был установлен ранее
        if (!$selectedBonusKey && Object.keys(bpBonuses).length > 0) {
            updateSelectedBonusKey(Object.keys(bpBonuses)[0]);
        }
    });

    $: currentBonusText =
        $selectedBonusKey && bpBonuses[$selectedBonusKey]
            ? $selectedBonusKey.split('—')[0].trim()
            : 'Нет бонуса';
    $: currentBonusMultiplier =
        $selectedBonusKey && bpBonuses[$selectedBonusKey] ? bpBonuses[$selectedBonusKey].multiplier : 1.0;
</script>

<div class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl mb-4">
    <div class="p-4 md:p-7">
        <h3 class="text-lg font-bold text-gray-800 flex items-center mb-4">
            {#if isEditingNickname}
                <input
                    type="text"
                    bind:value={tempNickname}
                    class="flex-grow border rounded-md p-1 me-2 focus:ring-blue-500 focus:border-blue-500 mr-2"
                    on:blur={saveNickname}
                    on:keydown={handleKeyDownNickname}
                    autofocus
                />
                <button
                    type="button"
                    class="py-1 px-2 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none mr-2"
                    on:click={saveNickname}
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="py-1 px-2 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                    on:click={cancelEditingNickname}
                >
                    Отмена
                </button>
            {:else}
                <span class="flex-grow">{$nickname}</span>
                <button
                    type="button"
                    class="py-1 px-2 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                    on:click={startEditingNickname}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                    >
                        <path
                            fill="currentColor"
                            d="M27.87 7.863L23.024 4.82l-7.89 12.566l4.843 3.04zM14.395 21.25l-.107 2.855l2.527-1.337l2.35-1.24l-4.673-2.936zM29.163 3.24L26.63 1.647a1.364 1.364 0 0 0-1.88.43l-1 1.588l4.843 3.042l1-1.586c.4-.64.21-1.483-.43-1.883zm-3.965 23.82c0 .275-.225.5-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h13.244l1.884-3H5.698c-1.93 0-3.5 1.57-3.5 3.5v19c0 1.93 1.57 3.5 3.5 3.5h19c1.93 0 3.5-1.57 3.5-3.5V11.097l-3 4.776v11.19z"
                        /></svg
                    >
                    Изменить
                </button>
            {/if}
        </h3>

        <div class="hs-dropdown [--trigger:hover] relative inline-flex">
            <button
                id="hs-dropdown-hover-bonus"
                type="button"
                class="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
            >
                {currentBonusText}
                <svg
                    class="hs-dropdown-open:rotate-180 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m6 9 6 6 6-6" /></svg>
            </button>

            <div
                class="z-100 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-dropdown-hover-bonus"
            >
                <div class="p-1 space-y-0.5">
                    {#each Object.keys(bpBonuses) as bonusKey}
                        <button
                            class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 w-full text-left"
                            on:click={() => selectBonus(bonusKey)}
                        >
                            {bonusKey}
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <!-- <div class="flex items-center mt-2 text-gray-500 mb-2 gap-x-4">
            <p class="whitespace-nowrap">Опыт:</p>
            <input
                type="number"
                bind:value={$experience}
                class="py-2 px-4 block max-w-xs border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                on:change={handleExperienceChange}
                min="0"
            />
            {#if $selectedBonusKey}
                <span class="text-sm text-blue-600 font-semibold"
                    >(x{currentBonusMultiplier.toFixed(2)} =
                    {($experience * currentBonusMultiplier).toFixed(0)})</span
                >
                {#if currentBonusMultiplier === 1.0}
                    <span> (без бонуса)</span>
                {/if}
            {/if}
        </div>

        <div class="flex items-center mt-2 text-gray-500 mb-2 gap-x-4">
            <p class="whitespace-nowrap">Монеты:</p>
            <input
                type="number"
                bind:value={$coins}
                class="py-2 px-4 block max-w-xs border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                on:change={handleCoinsChange}
                min="0"
            />
        </div> -->
    </div>
</div>