<script lang='ts'>
    import { onMount } from 'svelte';
    import {
        nickname,
        selectedBonusKey,
        updateNickname,
        updateSelectedBonusKey,
    } from '../userStore.js';
    import { get } from 'svelte/store';
    import bpBonuses from '../Bonuses.js';
    import dailyTasks from '../DailyTasks.js';
    import globalTasks from '../GlobalTasks.js';

    let evidenceLink: string = '';
    let selectedTaskType: 'daily' | 'global' | '' = '';
    let searchTerm: string = '';
    let filteredTasks: { name: string; exp: number; coins: number }[] = [];
    let generatedMessage: string = '';
    let lastSelectedTask: { name: string; exp: number; coins: number } | null = null;
    let dailyTasksArray: { name: string; exp: number; coins: number }[] = [];
    let globalTasksArray: { name: string; exp: number; coins: number }[] = [];

    $: currentBonusMultiplier =
        $selectedBonusKey && bpBonuses[$selectedBonusKey] ? bpBonuses[$selectedBonusKey].multiplier : 1.0;

    onMount(() => {
        dailyTasksArray = Object.entries(dailyTasks).map(([name, data]) => ({ name, ...data }));
        globalTasksArray = Object.entries(globalTasks).map(([name, data]) => ({ name, ...data }));
    });

    $: {
        if (selectedTaskType === 'daily') {
            filteredTasks = dailyTasksArray.filter(task =>
                task.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (selectedTaskType === 'global') {
            filteredTasks = globalTasksArray.filter(task =>
                task.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            filteredTasks = [];
        }
    }

    $: {
        if (lastSelectedTask) {
            updateGeneratedMessage(lastSelectedTask.name, lastSelectedTask.exp, lastSelectedTask.coins);
        }
    }

    function selectTaskType(type: 'daily' | 'global') {
        selectedTaskType = type;
        searchTerm = '';
        generatedMessage = '';
        lastSelectedTask = null;
    }

    function handleTaskSelection(task: { name: string; exp: number; coins: number }) {
        console.log('Выбрано задание:', task.name);
        console.log('Опыт:', task.exp);
        console.log('Монеты:', task.coins);
        lastSelectedTask = task;
        updateGeneratedMessage(task.name, task.exp, task.coins);

        setTimeout(() => {
            const messageElement = document.getElementById('generated-message-section');
            if (messageElement) {
                messageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, 0);
    }

    function updateGeneratedMessage(taskName: string = '', taskExp: number = 0, taskCoins: number = 0) {
        if (taskName) {
            const finalExp = Math.round(taskExp * currentBonusMultiplier);
            const finalCoins = Math.round(taskCoins);

            let bonusDisplay = $selectedBonusKey;
            if ($selectedBonusKey === "Без бонуса") {
                bonusDisplay = "Нет";
            }

            generatedMessage = `1. Игровой ник: [COLOR=rgb(251, 160, 38)]${$nickname}[/COLOR]\n2. Полное название задания: [COLOR=rgb(251, 160, 38)]${taskName}[/COLOR]\n3. Наличие знаков отличия, если есть то какие: [COLOR=rgb(251, 160, 38)]${bonusDisplay}[/COLOR]\n4. Сколько очков опыта нужно начислить за задание (с учётом знаков отличия): [COLOR=rgb(251, 160, 38)]${finalExp}[/COLOR]\n5. Сколько монет нужно начислить за задание: [COLOR=rgb(251, 160, 38)]${finalCoins}[/COLOR]\n6. Скриншоты или видео с /time: ${evidenceLink}\n[RIGHT][SIZE=2][COLOR=rgb(119, 119, 119)]сгенерировано с помощью [URL='https://villagerp-bp-generator.define.su'][COLOR=rgb(130, 130, 130)]villagerp-bp-generator.define.su[/COLOR][/URL][/COLOR][/SIZE][/RIGHT]\n`;
        } else {
            generatedMessage = '';
        }
    }

    function handleNicknameChange(event: Event) {
        const input = event.target as HTMLInputElement;
        updateNickname(input.value);
    }

    function selectBonus(bonusKey: string) {
        updateSelectedBonusKey(bonusKey);
    }
</script>

<div class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl mb-4">
    <div class="p-4 md:p-7">
        <h3 class="text-lg font-bold text-gray-800 flex items-center mb-4">
            Сгенерировать сообщение о выполненном задании
        </h3>


        <div class="flex items-center mt-2 text-gray-500 mb-2 gap-x-4">
            <p class="whitespace-nowrap">Ссылки(а) на доказательства:</p>
            <input
                bind:value={evidenceLink}
                class="py-2 px-4 block border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full"
                placeholder="Вставьте ссылки через запятую"
                aria-label="Ссылка на доказательства"
            />
        </div>

        <div class="flex items-center mt-4">
            <div class="hs-dropdown [--auto-close:inside] relative inline-flex">
                <button
                    id="task-type-dropdown"
                    type="button"
                    class="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Тип задания"
                >
                    {selectedTaskType === 'daily' ? 'Ежедневное задание' : selectedTaskType === 'global'
                        ? 'Глобальное задание'
                        : 'Тип задания'}
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
                    ><path d="m6 9 6 6 6-6" /></svg>
                </button>

                <div
                    class="z-100 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="task-type-dropdown"
                >
                    <div class="p-1 space-y-0.5">
                        <a
                            class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                            href="#"
                            on:click|preventDefault={() => selectTaskType('daily')}
                        >
                            Ежедневное задание
                        </a>
                        <a
                            class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                            href="#"
                            on:click|preventDefault={() => selectTaskType('global')}
                        >
                            Глобальное задание
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {#if selectedTaskType}
            <div class="flex flex-col mt-4">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="border border-gray-200 rounded-lg divide-y divide-gray-200">
                            <div class="py-3 px-4">
                                <div class="relative max-w-xs">
                                    <label for="hs-table-search" class="sr-only">Search</label>
                                    <input
                                        type="text"
                                        name="hs-table-search"
                                        id="hs-table-search"
                                        class="py-1.5 sm:py-2 px-3 ps-9 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        placeholder="Поиск заданий"
                                        bind:value={searchTerm}
                                    />
                                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                        <svg
                                            class="size-4 text-gray-400"
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
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="overflow-hidden">
                                {#if filteredTasks.length > 0}
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Название задания
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Опыт
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Монеты
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Действие
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200">
                                            {#each filteredTasks as task (task.name)}
                                                <tr
                                                    class="hover:bg-gray-50 cursor-pointer"
                                                    on:click={() => handleTaskSelection(task)}
                                                >
                                                    <td class="px-6 py-4 whitespace-normal text-sm font-medium text-gray-800">
                                                        {task.name}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{task.exp}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{task.coins}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                        <button
                                                            type="button"
                                                            class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                                            on:click|stopPropagation={() => handleTaskSelection(task)}
                                                        >
                                                            Выбрать
                                                        </button>
                                                    </td>
                                                </tr>
                                            {/each}
                                        </tbody>
                                    </table>
                                {:else}
                                    <p class="p-4 text-center text-gray-500">
                                        Задания не найдены или не выбрана категория.
                                    </p>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        {#if generatedMessage}
            <div
                id="generated-message-section"
                class="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg"
            >
                <p class="font-semibold">Сгенерированное сообщение:</p>
                <p>
                    Чтобы скопировать: CTRL + A, CTRL + C
                </p>
                <div class="w-full space-y-3 mt-4">
                    <textarea
                        id="hs-clipboard-input"
                        rows="7"
                        class="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-600 resize-y"
                        bind:value={generatedMessage}
                    ></textarea>
                </div>
            </div>
        {/if}
    </div>
</div>