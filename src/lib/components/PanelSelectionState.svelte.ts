type PanelSelectionOption = {
    id: string,
    hint: string,
    icon: string
};

class PanelSelectionState
{
    selection: string;
    options: any;

    constructor(options: PanelSelectionOption[])
    {
        this.selection = $state('NULL');
        this.options = options;
    }
};

export { PanelSelectionState };
