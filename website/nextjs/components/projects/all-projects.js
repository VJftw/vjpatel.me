import ProjectPreview from './project-preview'

export default function AllProjects({ projects }) {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-gap-16 xl:col-gap-32 row-gap-20 lg:row-gap-32">
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
