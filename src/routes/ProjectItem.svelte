<script lang="ts">

    import openimg from '$lib/assets/buttons/home-open-project.svg';
    import delimg from '$lib/assets/buttons/home-delete-project.svg';

    let { projectName } = $props();

    let isHighlighted = $state(false);

    let OnItemHoverStart = async function ()
    {
        isHighlighted = true;
    }
    let OnItemHoverEnd = async function ()
    {
        isHighlighted = false;
    }

    async function OpenProject()
    {
        // TODO
    }

    async function DeleteProject()
    {
        // TODO
    }

</script>

<div role="listitem" onmouseenter={ OnItemHoverStart } onmouseleave={ OnItemHoverEnd } class="grid grid-cols-2 gap-x-10 items-center hover:bg-red-100">
    <div class="py-1 w-full text-right">{ projectName }</div>
    <div class="flex justify-start">
        <div class="grid grid-cols-2 gap-x-3">
            {#if isHighlighted }
                <button onclick={ OpenProject } class="py-1 px-1 rounded-full hover:bg-green-100"><img src={ openimg } alt="Open Project" title="Open Project" class="h-4"></button>
                <button onclick={ DeleteProject } class="py-1 px-1 rounded-full hover:bg-red-300"><img src={ delimg } alt="Delete Project" title="Delete Project" class="h-4"></button>
            {/if}
        </div>
    </div>
</div>