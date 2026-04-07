#!/usr/bin/env node

/**
 * Script to delete old portfolio projects from Sanity CMS
 * Usage: npx tsx scripts/delete-old-projects.ts
 */

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN");

const oldProjectNames = ["VerifAI", "SupplierIQ", "AskTPSRM", "SmartGate"];

interface SanityDoc {
  _id: string;
  title: string;
}

interface SanityQueryResponse {
  result: SanityDoc[];
}

interface SanityDeleteResponse {
  error?: { message: string };
}

async function deleteOldProjects() {
  try {
    console.log("🗑️  Finding old projects to delete...");

    // Query for old projects
    const queryUrl = `https://${projectId}.api.sanity.io/v2024-03-31/data/query/${dataset}`;
    const query = `*[_type == 'project' && title in [${oldProjectNames.map((name) => `"${name}"`).join(", ")}]] {_id, title}`;

    const queryRes = await fetch(`${queryUrl}?query=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const queryData = (await queryRes.json()) as SanityQueryResponse;

    if (!queryData.result || queryData.result.length === 0) {
      console.log("✓ No old projects found to delete");
      return;
    }

    console.log(`Found ${queryData.result.length} old projects to delete:`);
    queryData.result.forEach((doc) => {
      console.log(`   - ${doc.title}`);
    });

    // Delete the projects
    const deleteUrl = `https://${projectId}.api.sanity.io/v2024-03-31/data/mutate/${dataset}`;
    const mutations = queryData.result.map((doc) => ({
      delete: { id: doc._id },
    }));

    const deleteRes = await fetch(deleteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mutations }),
    });

    const deleteData = (await deleteRes.json()) as SanityDeleteResponse;

    if (deleteData.error) {
      console.error("❌ Error deleting projects:", deleteData.error.message);
      process.exit(1);
    }

    console.log("\n✅ Successfully deleted old projects!");
    console.log("🎉 Portfolio now has only the 6 new projects!\n");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Fatal error: ${errorMessage}`);
    process.exit(1);
  }
}

deleteOldProjects();
