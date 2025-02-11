
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Project {
  name: string;
  description: string;
  link: string;
}

interface ProjectsFormProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
  onPrevious: () => void;
}

const ProjectsForm = ({ data, onUpdate, onPrevious }: ProjectsFormProps) => {
  const [projects, setProjects] = useState<Project[]>(
    data.length ? data : [{ name: "", description: "", link: "" }]
  );

  const handleChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
    onUpdate(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { name: "", description: "", link: "" }]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    onUpdate(updatedProjects);
  };

  return (
    <form className="space-y-8">
      {projects.map((project, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg space-y-4 animate-slide-up-fade"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Project #{index + 1}</h3>
            {projects.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeProject(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div>
            <label className="form-input-label">Project Name</label>
            <Input
              value={project.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="e.g., E-commerce Website"
              required
            />
          </div>

          <div>
            <label className="form-input-label">Description</label>
            <Textarea
              value={project.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              placeholder="Brief description of the project..."
              className="h-32"
              required
            />
          </div>

          <div>
            <label className="form-input-label">Project Link</label>
            <Input
              value={project.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
              placeholder="https://..."
              type="url"
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addProject}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Project
      </Button>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
      </div>
    </form>
  );
};

export default ProjectsForm;

