<script lang="ts">

    import Curtain from "./Curtain.svelte";

    let { icon, subject, actions, onaction, children } = $props();

    async function onAction(event: MouseEvent)
    {
        let element: any = event?.target;
        await onaction(element.textContent);
    }

</script>

<Curtain />
<div class="fixed h-screen w-screen top-0 left-0 z-40 flex items-center justify-center">
    <div class="bg-amber-200 min-h-1/3 min-w-1/3 max-h-3/4 max-w-3/4 rounded-3xl flex flex-col">
        <div class="bg-amber-100 my-1 mx-1 px-2 py-2 rounded-full flex items-center justify-start">
            <img src="/assets/icons/{ icon }.svg" alt="" class="h-6 px-1"><span class="mx-1 font-bold">{ subject }</span>
        </div>
        <div class="bg-amber-100 mx-1 px-2 py-2 rounded-3xl grow flex items-center justify-center min-h-0 overflow-auto">
            <div class="my-1">
                {@render children() }
            </div>
        </div>
        <div class="bg-amber-100 my-1 mx-1 px-2 py-2 rounded-full flex items-center justify-end">
            {#each actions as action }
                <button onclick={ onAction } disabled={ action.disabled === true } class="bg-{ action.color }-100 hover:bg-{ action.color }-300 disabled:bg-{ action.color }-300 disabled:text-{ action.color }-100 text-black font-bold py-2 px-4 rounded-full ml-4">{ action.text }</button>
            {/each}
        </div>
    </div>
</div>
