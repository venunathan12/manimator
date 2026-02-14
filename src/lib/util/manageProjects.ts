import Config from '$lib/config';

import fs from 'node:fs/promises';

async function listProjects()
{
    let projectdir = Config.PROJECTS_DIR;
    let existingProjs = await fs.readdir(projectdir);

    return existingProjs;
}

async function createProject(projectName: string): Promise<boolean>
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

    // TODO

    return true;
}

async function deleteProject(projectName: string): Promise<boolean>
{
    // TODO
    
    return true;
}

export { listProjects, createProject, deleteProject }
