<script lang="ts">
    
    let newProjName: String = $state('');

    function validateProjectName(projName: String)
    {
        // Project Name cannot be empty
        if (projName.length == 0) return { valid: false, message: '' };

        // Only ASCII alphabets, number and spaces are allowed
        let chars = Array.from(projName).map(x => x.charCodeAt(0));
        let charValidity = chars.map(x =>
            (x >= 'A'.charCodeAt(0) && x <= 'Z'.charCodeAt(0)) ||
            (x >= 'a'.charCodeAt(0) && x <= 'z'.charCodeAt(0)) ||
            (x >= '0'.charCodeAt(0) && x <= '9'.charCodeAt(0)) ||
            (x == ' '.charCodeAt(0))
        );
        if (charValidity.includes(false)) return { valid: false, message: 'Only ASCII alphabets, number and spaces, please.' };

        // Leading or trailing spaces are not allowed
        if (projName != projName.trim()) return { valid: false, message: 'No leading or trailing spaces, please.' };
        
        return { valid: true, message: '' };
    }

    let newProjValidity = $derived(validateProjectName(newProjName));
    let newProjAllowed = $derived(newProjValidity.valid);

</script>

<div class="bg-blue-100 h-screen">
    <div class="bg-green-100 h-1/10 grid grid-cols-1 content-center">
        <p class="text-6xl text-center">manimator</p>
    </div>
    <div class="h-3/10 grid grid-cols-1 content-center place-items-center">
        <div class="grid grid-cols-2 gap-x-20 gap-y-5 content-center place-items-center">
            <input type="text" bind:value={ newProjName } class="shadow rounded-full w-full py-2 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"/>
            <span class="text-red-600 row-span-2 max-w-50">{ newProjValidity.message }</span>
            <button disabled={ !newProjAllowed } class="bg-green-50 hover:bg-green-300 disabled:bg-red-300 disabled:text-red-100 text-black font-bold py-2 px-4 rounded-full">Create New Project</button>
        </div>
    </div>
    <div class="bg-red-50 h-6/10">
        
    </div>
</div>