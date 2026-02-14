<script lang="ts">

    import { onMount } from "svelte";

    import ProjectItem from "./ProjectItem.svelte";
    import ModalDialog from "$lib/components/ModalDialog.svelte";
    
    let newProjName: string = $state('');
    let existingProjs: string[] | null = $state(null);
    let isWaitingForProjectCreation: boolean = $state(false);

    function validateNewProjectName()
    {
        if (existingProjs == null) return { valid: false, message: 'Please wait while we scan your existing projects.' };

        if (newProjName.length == 0) return { valid: false, message: '' };

        let chars = Array.from(newProjName).map(x => x.charCodeAt(0));
        let charValidity = chars.map(x =>
            (x >= 'A'.charCodeAt(0) && x <= 'Z'.charCodeAt(0)) ||
            (x >= 'a'.charCodeAt(0) && x <= 'z'.charCodeAt(0)) ||
            (x >= '0'.charCodeAt(0) && x <= '9'.charCodeAt(0)) ||
            (x == ' '.charCodeAt(0))
        );
        if (charValidity.includes(false)) return { valid: false, message: 'Only ASCII alphabets, number and spaces, please.' };

        if (newProjName != newProjName.trim()) return { valid: false, message: 'No leading or trailing spaces, please.' };

        if (existingProjs.includes(newProjName)) return { valid: false, message: 'A project with this name already exists. You may open it from the section below.' };
        
        return { valid: true, message: '' };
    }

    let newProjValidity = $derived(validateNewProjectName());
    let newProjAllowed = $derived(newProjValidity.valid);

    onMount(
        async function ()
        {
            let resphead = await fetch('/api/projects');
            if (resphead.status == 200)
                existingProjs = await resphead.json();
        }
    );

    let isPendingCreateDialog: boolean = $state(false);
    let isProjectCreationFailed: boolean = $state(false);
    let modalDialogBox: any = $state(null);

    async function CreateProject()
    {
        isWaitingForProjectCreation = true;

        let createProjDialogPromise = Promise.withResolvers();
        modalDialogBox = {
            icon: 'common-dialog-create-project',
            subject: 'Create Project',
            actions: [
                { text: 'Create', color: 'green' },
                { text: 'Cancel', color: 'red' }
            ],
            onaction: createProjDialogPromise.resolve
        };
        isPendingCreateDialog = true;
        let createProjDialogResult = await createProjDialogPromise.promise;
        isPendingCreateDialog = false;

        if (createProjDialogResult === 'Cancel')
        {
            newProjName = '';
            isWaitingForProjectCreation = false;
            return;
        }

        let resphead = await fetch(
            '/api/projects',
            {
                method: 'POST',
                body: JSON.stringify({ projectName: newProjName })
            }
        );
        if (resphead.status == 201)
            location.href = `/projects/${ encodeURI(newProjName) }`;
        else
            isProjectCreationFailed = true;
    }

</script>

<div class="bg-blue-100 h-screen">
    <div class="bg-green-100 h-1/10 grid grid-cols-1 content-center">
        <p class="text-6xl text-center">manimator</p>
    </div>
    <div class="h-3/10 grid grid-cols-1 content-center place-items-center">
        <div class="grid grid-cols-2 gap-x-20 gap-y-5 content-center place-items-center">
            <input type="text" bind:value={ newProjName } class="shadow rounded-full w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"/>
            {#if isProjectCreationFailed }
                <span class="text-red-600 row-span-2 max-w-50">{ 'Unable to create your project. Please refresh the page and try again.' }</span>
            {:else if isWaitingForProjectCreation }
                <span class="text-green-700 row-span-2 max-w-50">{ isPendingCreateDialog ? '' : 'Please wait. Your new project is being created.' }</span>
            {:else}
                <span class="text-red-600 row-span-2 max-w-50">{ newProjValidity.message }</span>
            {/if}
            <button onclick={ CreateProject } disabled={ isWaitingForProjectCreation || !newProjAllowed } class="bg-green-100 hover:bg-green-300 { isWaitingForProjectCreation ? 'disabled:bg-green-300 disabled:text-green-100' : 'disabled:bg-red-300 disabled:text-red-100' } text-black font-bold py-2 px-4 rounded-full">Create New Project</button>
        </div>
    </div>
    <div class="bg-red-50 h-6/10 flex items-center">
        <div class="w-full grid grid-cols-1">
            {#if existingProjs != null && existingProjs.length > 0 }
                <div class="bg-red-100 py-4 mb-3 text-center">
                    <div class="grid grid-cols-2 gap-x-3">
                        <div class="w-full text-right">Your Projects:</div>
                        <div class="flex justify-start">
                            <div class="grid grid-cols-2 gap-x-3">
                            </div>
                        </div>
                    </div>
                </div>    
                <div class="w-full max-h-[50cqh] overflow-y-auto">
                    <div class="grid grid-cols-1">
                        {#each existingProjs as projectName }
                            <ProjectItem { projectName } />
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
{#if isPendingCreateDialog }
    <ModalDialog icon={ modalDialogBox.icon } subject={ modalDialogBox.subject } actions={ modalDialogBox.actions } onaction={ modalDialogBox.onaction }>
        <div>TODO</div>
    </ModalDialog>
{/if}
