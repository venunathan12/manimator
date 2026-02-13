import Config from '$lib/config';

import fs from 'node:fs/promises';

// Create the working directory if it doesn't exist
fs.mkdir(Config.WORK_DIR, { recursive: true });
fs.mkdir(Config.PROJECTS_DIR, { recursive: true });
fs.mkdir(Config.CONFIG_DIR, { recursive: true });
