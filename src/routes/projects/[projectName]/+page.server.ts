import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { listProjects } from '$lib/util/manageProjects';

export const load: PageServerLoad = async function ({ params })
{
    let projectName = decodeURIComponent(params.projectName);

    let allProjects = await listProjects();

    if (allProjects.includes(projectName))
        return { projectName };
    else
        error(404, `Project ${ projectName } does not exist.`);
};
