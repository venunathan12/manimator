import { PanelSelectionState } from "$lib/components/PanelSelectionState.svelte";

class LeftPanelProjectScenesState
{
    childPanelState: PanelSelectionState;

    constructor ()
    {
        this.childPanelState = new PanelSelectionState([]);
    }
}

export { LeftPanelProjectScenesState };
