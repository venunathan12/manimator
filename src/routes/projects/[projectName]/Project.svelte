<script lang="ts">

    import { onMount } from "svelte";
    import { page } from "$app/state";

    import VPanelSelector from "$lib/components/VPanelSelector.svelte";
    import { PanelSelectionState } from "$lib/components/PanelSelectionState.svelte";    

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

    let rightPanelStates: any = {
        PROJECT_HOME: new PanelSelectionState(
            []
        ),
        SCENES: new PanelSelectionState(
            []
        ),
        OBJECTS: new PanelSelectionState(
            []
        ),
        BLUEPRINTS: new PanelSelectionState(
            []
        ),
        HELP: new PanelSelectionState(
            []
        )
    };

</script>

<div
    style:--left-panel-width={ leftPanelState.selection != 'NULL' ? '250px' : '0px' }
    style:--right-panel-width={ leftPanelState.selection != 'NULL' && rightPanelStates[leftPanelState.selection].selection != 'NULL' ? '200px' : '0px' }
    style:--bottom-panel-height={ '200px' }
>
    <div class="flex h-screen w-screen">
        <div class="bg-blue-100 h-full flex">
            <div class="h-full invisible absolute left-0 flex items-center">
                <VPanelSelector bind:selection={ leftPanelState.selection } options={ leftPanelState.options } />
            </div>
            <div class="x-left-panel h-full">

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
                {#if leftPanelState.selection !== 'NULL' }
                    {#if rightPanelStates[leftPanelState.selection].selection != 'NULL' }
                        <div>{ rightPanelStates[leftPanelState.selection].selection }</div>
                    {/if}
                {/if}
            </div>
            {#if leftPanelState.selection != 'NULL' }
                <div class="h-full invisible absolute right-0 flex items-center">
                    <VPanelSelector bind:selection={ rightPanelStates[leftPanelState.selection].selection } options={ rightPanelStates[leftPanelState.selection].options } dock='right' />
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
