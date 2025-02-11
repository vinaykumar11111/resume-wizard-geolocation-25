
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Education {
  degree: string;
  institution: string;
  graduationYear: string;
  achievements: string;
}

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const EducationForm = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
}: EducationFormProps) => {
  const [education, setEducation] = useState<Education[]>(
    data.length ? data : [{ degree: "", institution: "", graduationYear: "", achievements: "" }]
  );

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducation(updatedEducation);
    onUpdate(updatedEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { degree: "", institution: "", graduationYear: "", achievements: "" },
    ]);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
    onUpdate(updatedEducation);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {education.map((edu, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg space-y-4 animate-slide-up-fade"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Education #{index + 1}</h3>
            {education.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeEducation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div>
            <label className="form-input-label">Degree</label>
            <Input
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
              placeholder="Bachelor of Science in Computer Science"
              required
            />
          </div>

          <div>
            <label className="form-input-label">Institution</label>
            <Input
              value={edu.institution}
              onChange={(e) => handleChange(index, "institution", e.target.value)}
              placeholder="University Name"
              required
            />
          </div>

          <div>
            <label className="form-input-label">Graduation Year</label>
            <Input
              value={edu.graduationYear}
              onChange={(e) =>
                handleChange(index, "graduationYear", e.target.value)
              }
              placeholder="2023"
              required
            />
          </div>

          <div>
            <label className="form-input-label">Achievements</label>
            <Textarea
              value={edu.achievements}
              onChange={(e) => handleChange(index, "achievements", e.target.value)}
              placeholder="Notable achievements, GPA, honors..."
              className="h-24"
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addEducation}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Education
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

export default EducationForm;
