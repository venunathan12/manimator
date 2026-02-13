import { listProjects } from "$lib/util/manageProjects.js";
import { json } from "@sveltejs/kit";

export async function GET({ request })
{
    let existingProjs = await listProjects();

    return json(existingProjs);
}

export async function POST({ request })
{
    let data = await request.json();
    
    return data;
}
