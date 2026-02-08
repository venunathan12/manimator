import { Config } from '$lib/config';

import fs from 'node:fs/promises';

// Create the working directory if it doesn't exist
try
{
    await fs.readdir(Config.WORK_DIR);
}
catch (e: any)
{
    if (e.code == 'ENOENT') await fs.mkdir(Config.WORK_DIR);
    else console.error(e);
}
