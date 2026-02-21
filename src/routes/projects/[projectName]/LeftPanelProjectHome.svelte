<script lang="ts">

    import { LeftPanelProjectHomeState } from "./LeftPanelProjectHomeState.svelte";

    let { globalState = $bindable(), localState = $bindable() }: { globalState: any, localState: LeftPanelProjectHomeState } = $props();

</script>

<div class="h-full w-full border-l overflow-auto">
    <div class="bg-blue-200 text-xl px-2 py-2 mr-10 my-2 rounded-full text-center">Project Home</div>
</div>
