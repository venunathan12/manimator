<script lang="ts">

    import { page } from "$app/state";

    import VPanelSelector from "$lib/components/VPanelSelector.svelte";
    import { PanelSelectionState } from "$lib/components/PanelSelectionState.svelte";    
    import LeftPanelProjectHome from "./LeftPanelProjectHome.svelte";
    import { LeftPanelProjectHomeState } from "./LeftPanelProjectHomeState.svelte";
    import LeftPanelProjectScenes from "./LeftPanelProjectScenes.svelte";
    import { LeftPanelProjectScenesState } from "./LeftPanelProjectScenesState.svelte";
    import LeftPanelProjectBlueprints from "./LeftPanelProjectBlueprints.svelte";
    import { LeftPanelProjectBlueprintsState } from "./LeftPanelProjectBlueprintsState.svelte";
    import LeftPanelProjectObjects from "./LeftPanelProjectObjects.svelte";
    import { LeftPanelProjectObjectsState } from "./LeftPanelProjectObjectsState.svelte";
    import LeftPanelProjectHelp from "./LeftPanelProjectHelp.svelte";
    import { LeftPanelProjectHelpState } from "./LeftPanelProjectHelpState.svelte";

    let { projectName } = page.data;

    let leftPanelState = new PanelSelectionState(
        [
            {
                id: 'PROJECT_HOME',
                hint: 'Project Home',
                icon: 'project-lefttab-projecthome'
            },
            {
                id: 'SCENES',
                hint: 'Scenes',
                icon: 'project-lefttab-scenes'
            },
            {
                id: 'BLUEPRINTS',
                hint: 'Blueprints',
                icon: 'project-lefttab-blueprints'
            },
            {
                id: 'OBJECTS',
                hint: 'Objects',
                icon: 'project-lefttab-objects'
            },
            {
                id: 'HELP',
                hint: 'Help',
                icon: 'project-lefttab-help'
            }
        ]
    );

    let globalState: any = $state({ projectName });
    let leftPanelProjectHomeState = $state(new LeftPanelProjectHomeState());
    let leftPanelProjectScenesState = $state(new LeftPanelProjectScenesState());
    let leftPanelProjectBlueprintsState = $state(new LeftPanelProjectBlueprintsState());
    let leftPanelProjectObjectsState = $state(new LeftPanelProjectObjectsState());
    let leftPanelProjectHelpState = $state(new LeftPanelProjectHelpState());

    let leftTabManagers: {[key: string]: LeftPanelProjectHomeState} = $derived({
        PROJECT_HOME: leftPanelProjectHomeState,
        SCENES: leftPanelProjectScenesState,
        BLUEPRINTS: leftPanelProjectBlueprintsState,
        OBJECTS: leftPanelProjectObjectsState,
        HELP: leftPanelProjectHelpState
    });

</script>

<div
    style:--left-panel-width={ leftPanelState.selection != 'NULL' ? '250px' : '0px' }
    style:--right-panel-width={ leftPanelState.selection != 'NULL' && leftTabManagers[leftPanelState.selection].childPanelState.selection != 'NULL' ? '250px' : '0px' }
    style:--bottom-panel-height={ '200px' }
>
    <div class="flex h-screen w-screen">
        <div class="bg-blue-100 h-full flex">
            <div class="h-full invisible absolute left-0 flex items-center">
                <VPanelSelector bind:selection={ leftPanelState.selection } options={ leftPanelState.options } />
            </div>
            <div class="x-left-panel h-full">
                <div class="h-full ml-10">
                    {#if leftPanelState.selection == 'PROJECT_HOME' }
                        <LeftPanelProjectHome bind:globalState bind:localState={ leftPanelProjectHomeState } />
                    {:else if leftPanelState.selection == 'SCENES' }
                        <LeftPanelProjectScenes bind:globalState bind:localState={ leftPanelProjectScenesState } />
                    {:else if leftPanelState.selection == 'BLUEPRINTS' }
                        <LeftPanelProjectBlueprints bind:globalState bind:localState={ leftPanelProjectBlueprintsState } />
                    {:else if leftPanelState.selection == 'OBJECTS' }
                        <LeftPanelProjectObjects bind:globalState bind:localState={ leftPanelProjectObjectsState } />
                    {:else if leftPanelState.selection == 'HELP' }
                        <LeftPanelProjectHelp bind:globalState bind:localState={ leftPanelProjectHelpState } />
                    {/if}
                </div>
            </div>
        </div>
        <div class="x-middle-panel bg-red-50 h-full flex flex-col">
            <div class="x-middle-top-panel">
                <svg class="bg-white h-full w-full" viewBox="-8 -4.5 16 9">
                    {#each [] as item }
                        
                    {/each}
                    <rect x="-8" y="-4.5" width="16" height="9" fill="none" stroke="black" stroke-width="0.05" />
                </svg>
            </div>
            <div class="x-middle-bottom-panel bg-green-100">
                <div></div>
            </div>
        </div>
        <div class="bg-blue-100 h-full flex">
            <div class="x-right-panel h-full">
                <div class="h-full mr-10">
                    {#if leftPanelState.selection !== 'NULL' }

                    {/if}
                </div>
            </div>
            {#if leftPanelState.selection != 'NULL' }
                <div class="h-full invisible absolute right-0 flex items-center">
                    <VPanelSelector bind:selection={ leftTabManagers[leftPanelState.selection].childPanelState.selection } options={ leftTabManagers[leftPanelState.selection].childPanelState.options } dock='right' />
                </div>
            {/if}
        </div>
    </div>
</div>


<style>

    .x-left-panel {
        width: var(--left-panel-width);
    }
    .x-middle-panel {
        width: calc(100vw - (var(--left-panel-width) + var(--right-panel-width)));
    }
    .x-right-panel {
        width: var(--right-panel-width);
    }
    .x-middle-top-panel {
        height: calc(100vh - var(--bottom-panel-height));
    }
    .x-middle-bottom-panel {
        height: var(--bottom-panel-height);
    }

</style>
