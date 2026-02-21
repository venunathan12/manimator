<script lang="ts">

    import { LeftPanelProjectBlueprintsState } from "./LeftPanelProjectBlueprintsState.svelte";

    let { globalState = $bindable(), localState = $bindable() }: { globalState: any, localState: LeftPanelProjectBlueprintsState } = $props();

</script>

<div class="h-full w-full border-l overflow-auto">
    <div class="bg-blue-200 text-xl px-2 py-2 mr-10 my-2 rounded-full text-center">Blueprints</div>
</div>
