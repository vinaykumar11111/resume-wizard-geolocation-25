
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ExperienceForm = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
}: ExperienceFormProps) => {
  const [experience, setExperience] = useState<Experience[]>(
    data.length
      ? data
      : [
          {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            responsibilities: "",
          },
        ]
  );

  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperience = experience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperience(updatedExperience);
    onUpdate(updatedExperience);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
    onUpdate(updatedExperience);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {experience.map((exp, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg space-y-4 animate-slide-up-fade"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Experience #{index + 1}</h3>
            {experience.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div>
            <label className="form-input-label">Company</label>
            <Input
              value={exp.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              placeholder="Company Name"
              required
            />
          </div>

          <div>
            <label className="form-input-label">Position</label>
            <Input
              value={exp.position}
              onChange={(e) => handleChange(index, "position", e.target.value)}
              placeholder="Job Title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-input-label">Start Date</label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-input-label">End Date</label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                placeholder="Present"
              />
            </div>
          </div>

          <div>
            <label className="form-input-label">Responsibilities</label>
            <Textarea
              value={exp.responsibilities}
              onChange={(e) =>
                handleChange(index, "responsibilities", e.target.value)
              }
              placeholder="Key responsibilities and achievements..."
              className="h-32"
              required
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addExperience}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Experience
      </Button>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default ExperienceForm;
