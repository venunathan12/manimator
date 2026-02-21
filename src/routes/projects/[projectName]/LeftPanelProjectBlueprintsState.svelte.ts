import { PanelSelectionState } from "$lib/components/PanelSelectionState.svelte";

class LeftPanelProjectBlueprintsState
{
    childPanelState: PanelSelectionState;

    constructor ()
    {
        this.childPanelState = new PanelSelectionState([]);
    }
}

export { LeftPanelProjectBlueprintsState };
