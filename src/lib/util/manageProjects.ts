import Config from '$lib/config';

import fs from 'node:fs/promises';

async function listProjects()
{
    let projectdir = Config.PROJECTS_DIR;
    let existingProjs = await fs.readdir(projectdir);

    return existingProjs;
}

async function createProject(projectName: string, starterPack: string): Promise<boolean>
{
    if (projectName.length == 0) return false;
    if (projectName !== projectName.trim()) return false;
    let chars = Array.from(projectName).map(x => x.charCodeAt(0));
    let charValidity = chars.map(x =>
        (x >= 'A'.charCodeAt(0) && x <= 'Z'.charCodeAt(0)) ||
        (x >= 'a'.charCodeAt(0) && x <= 'z'.charCodeAt(0)) ||
        (x >= '0'.charCodeAt(0) && x <= '9'.charCodeAt(0)) ||
        (x == ' '.charCodeAt(0))
    );
    if (charValidity.includes(false)) return false;
    if ((await listProjects()).includes(projectName)) return false;

    try
    {
        await fs.mkdir(`${ Config.PROJECTS_DIR }/${ projectName }`);

        let now = Date.now();
        let metadata = {
            name: projectName,
            version: 1,
            createdOn: now,
            updatedOn: now
        };

        await fs.writeFile(`${ Config.PROJECTS_DIR }/${ projectName }/mproject.json`, JSON.stringify(metadata, null, 4));
    }
    catch (e: any)
    {
        console.error(e);
        return false;
    }

    return true;
}

async function deleteProject(projectName: string): Promise<boolean>
{
    if (!(await listProjects()).includes(projectName)) return false;

    try
    {
        fs.rm(`${ Config.PROJECTS_DIR }/${ projectName }`, { recursive: true });
    }
    catch (e: any)
    {
        console.error(e);
        return false;
    }
    
    return true;
}

export { listProjects, createProject, deleteProject }
