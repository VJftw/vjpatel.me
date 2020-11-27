import ProjectPreview from './project-preview'

export default function AllProjects({ projects }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-1 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {projects.map((project) => (
          <ProjectPreview
            key={project.slug}
            title={project.title}
            date={project.date}
            slug={project.slug}
          />
        ))}
      </div>
    </section>
  )
}
