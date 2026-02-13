import Config from '$lib/config';

import fs from 'node:fs/promises';

async function listProjects()
{
    let projectdir = Config.PROJECTS_DIR;
    let existingProjs = await fs.readdir(projectdir);

    return existingProjs;
}

export { listProjects }
