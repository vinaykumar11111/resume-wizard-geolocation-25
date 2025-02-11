
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Skill {
  name: string;
  level: number;
}

interface SkillsFormProps {
  data: Skill[];
  onUpdate: (data: Skill[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const SkillsForm = ({ data, onUpdate, onNext, onPrevious }: SkillsFormProps) => {
  const [skills, setSkills] = useState<Skill[]>(
    data.length ? data : [{ name: "", level: 3 }]
  );

  const handleChange = (index: number, field: keyof Skill, value: any) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 3 }]);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg space-y-4 animate-slide-up-fade"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Skill #{index + 1}</h3>
            {skills.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeSkill(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div>
            <label className="form-input-label">Skill Name</label>
            <Input
              value={skill.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="e.g., React.js, Project Management"
              required
            />
          </div>

          <div>
            <label className="form-input-label">Proficiency Level</label>
            <div className="flex items-center gap-4">
              <Slider
                value={[skill.level]}
                onValueChange={(value) => handleChange(index, "level", value[0])}
                max={5}
                step={1}
                className="flex-1"
              />
              <span className="w-8 text-center">{skill.level}/5</span>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addSkill}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Skill
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

export default SkillsForm;
