import { PanelSelectionState } from "$lib/components/PanelSelectionState.svelte";

class LeftPanelProjectHomeState
{
    childPanelState: PanelSelectionState;

    constructor ()
    {
        this.childPanelState = new PanelSelectionState([]);
    }
}

export { LeftPanelProjectHomeState };
