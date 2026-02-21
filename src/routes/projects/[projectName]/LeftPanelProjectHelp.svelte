<script lang="ts">

    import { LeftPanelProjectHelpState } from "./LeftPanelProjectHelpState.svelte";

    let { globalState = $bindable(), localState = $bindable() }: { globalState: any, localState: LeftPanelProjectHelpState } = $props();

</script>

<div class="h-full w-full border-l overflow-auto">
    <div class="bg-blue-200 text-xl px-2 py-2 mr-10 my-2 rounded-full text-center">Help</div>
</div>
