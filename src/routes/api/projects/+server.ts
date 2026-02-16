import { listProjects, createProject, deleteProject } from "$lib/util/manageProjects.js";
import { json } from "@sveltejs/kit";

export async function GET({})
{
    let existingProjs = await listProjects();

    return json(existingProjs);
}

export async function POST({ request })
{
    let { projectName, starterPack } = await request.json();
    if (projectName == null || typeof projectName !== 'string') return json({}, { status: 400 });
    if (!['NULL', 'EXAMPLE_1', 'EXAMPLE_2', 'EXAMPLE_3'].includes(starterPack)) return json({}, { status: 400 });

    let projectCreationStatus = await createProject(projectName, starterPack);
    
    return json({}, { status: projectCreationStatus ? 201 : 400 });
}

export async function DELETE({ request })
{
    let { projectName } = await request.json();
    if (projectName == null || typeof projectName !== 'string') return json({}, { status: 400 });

    let projectDeletionStatus = await deleteProject(projectName);
    
    return json({}, { status: projectDeletionStatus ? 201 : 400 });
}
