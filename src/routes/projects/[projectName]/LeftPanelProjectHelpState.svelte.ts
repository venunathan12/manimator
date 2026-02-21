import { PanelSelectionState } from "$lib/components/PanelSelectionState.svelte";

class LeftPanelProjectHelpState
{
    childPanelState: PanelSelectionState;

    constructor ()
    {
        this.childPanelState = new PanelSelectionState([]);
    }
}

export { LeftPanelProjectHelpState };
