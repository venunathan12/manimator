<script lang="ts">

    let { selection = $bindable(), options, dock = 'left' } = $props();
    let highlighted: boolean = $state(false);

    function generateSelector(id: string)
    {
        return function ()
        {
            if (selection === id)
                selection = 'NULL';
            else
                selection = id;
        }
    }

</script>

<div class="flex flex-col invisible" onmouseenter={ () => { highlighted = true; } } onmouseleave={ () => { highlighted = false; } } role="listitem">
    {#if true }
        <div class="rounded-full flex flex-col visible">
            {#each options as option }
                <button onclick={ generateSelector(option.id) } class="border px-2 py-2 rounded-full { option.id === selection ? 'bg-blue-400' : 'bg-blue-100' } { option.id === selection ? 'hover:bg-blue-300' : 'hover:bg-blue-200' }">
                    <img src="/assets/icons/{ option.icon }.svg" alt="" title={ option.hint } class="h-6">
                </button>
            {/each}
        </div>
    {/if}
</div>
