<script lang="ts">

    import ModalDialog from "$lib/components/ModalDialog.svelte";    

    let { projectName } = $props();

    let isHighlighted = $state(false);

    let OnItemHoverStart = async function ()
    {
        isHighlighted = true;
    }
    let OnItemHoverEnd = async function ()
    {
        isHighlighted = false;
    }

    let isPendingDeleteDialog: boolean = $state(false);
    let modalDialogBox: any = $state(null);

    async function OpenProject()
    {
        location.href = `/projects/${ encodeURI(projectName) }`;
    }

    async function DeleteProject()
    {
        let deleteProjDialogPromise = Promise.withResolvers();
        modalDialogBox = {
            icon: 'common-dialog-warning',
            subject: 'Delete Project',
            actions: [
                { text: 'Yes', color: 'red' },
                { text: 'No', color: 'red' }
            ],
            onaction: deleteProjDialogPromise.resolve
        };
        isPendingDeleteDialog = true;
        let createProjDialogResult = await deleteProjDialogPromise.promise;
        isPendingDeleteDialog = false;

        if (createProjDialogResult === 'No')
            return;

        let resphead = await fetch(
            '/api/projects',
            {
                method: 'DELETE',
                body: JSON.stringify({ projectName: projectName })
            }
        );
        location.reload();
    }

</script>

<div role="listitem" onmouseenter={ OnItemHoverStart } onmouseleave={ OnItemHoverEnd } class="grid grid-cols-2 gap-x-10 items-center hover:bg-red-100">
    <div class="py-1 w-full text-right">{ projectName }</div>
    <div class="flex justify-start">
        <div class="grid grid-cols-2 gap-x-3">
            {#if isHighlighted }
                <button onclick={ OpenProject } class="py-1 px-1 rounded-full hover:bg-green-100"><img src="/assets/icons/home-open-project.svg" alt="Open Project" title="Open Project" class="h-4"></button>
                <button onclick={ DeleteProject } class="py-1 px-1 rounded-full hover:bg-red-300"><img src="/assets/icons/home-delete-project.svg" alt="Delete Project" title="Delete Project" class="h-4"></button>
            {/if}
        </div>
    </div>
</div>
{#if isPendingDeleteDialog }
    <ModalDialog icon={ modalDialogBox.icon } subject={ modalDialogBox.subject } actions={ modalDialogBox.actions } onaction={ modalDialogBox.onaction }>
        <div>You have chosen to delete the following project:</div>
        <pre>{ projectName }</pre><br>
        <div>Are you sure you wish to continue?</div>
    </ModalDialog>
{/if}
