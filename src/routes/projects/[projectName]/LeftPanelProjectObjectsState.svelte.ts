import { PanelSelectionState } from "$lib/components/PanelSelectionState.svelte";

class LeftPanelProjectObjectsState
{
    childPanelState: PanelSelectionState;

    constructor ()
    {
        this.childPanelState = new PanelSelectionState([]);
    }
}

export { LeftPanelProjectObjectsState };
