import { client } from '../sanity/lib/client';

// Color mappings
const projectColorMap: Record<string, string> = {
  'Generative AI': '#A78BFA',
  'Enterprise Automation': '#F97316',
  'Security / DevSecOps': '#06B6D4',
};

const experienceColorMap: Record<string, string> = {
  work: '#14B8A6',
  education: '#0EA5E9',
};

const defaultPatentColor = '#8B5CF6';

async function migrateAccentColors() {
  console.log('🚀 Starting accent color migration...\n');

  try {
    // Migrate Projects
    console.log('📋 Migrating Projects...');
    const projects = await client.fetch('*[_type == "project"]');
    for (const project of projects) {
      if (!project.accentColor) {
        const color = projectColorMap[project.category] || '#3B82F6';
        await client
          .patch(project._id)
          .set({ accentColor: color })
          .commit();
        console.log(`  ✓ ${project.title} → ${color}`);
      }
    }

    // Migrate Experience
    console.log('\n📅 Migrating Experience...');
    const experiences = await client.fetch('*[_type == "experience"]');
    for (const exp of experiences) {
      if (!exp.accentColor) {
        const color = experienceColorMap[exp.type] || '#3B82F6';
        await client
          .patch(exp._id)
          .set({ accentColor: color })
          .commit();
        console.log(`  ✓ ${exp.role} at ${exp.company} → ${color}`);
      }
    }

    // Migrate Patents
    console.log('\n🏆 Migrating Patents...');
    const patents = await client.fetch('*[_type == "patent"]');
    for (const patent of patents) {
      if (!patent.accent) {
        await client
          .patch(patent._id)
          .set({ accent: defaultPatentColor })
          .commit();
        console.log(`  ✓ ${patent.title} → ${defaultPatentColor}`);
      }
    }

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateAccentColors();
