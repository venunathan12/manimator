import { Config } from '$lib/config';

import fs from 'node:fs/promises';

export async function listProjects()
{
    let workdir = Config.WORK_DIR;
    let existingProjs = await fs.readdir(workdir);

    return existingProjs;
}
