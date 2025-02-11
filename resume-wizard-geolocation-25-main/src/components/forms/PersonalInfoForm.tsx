
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

interface PersonalInfoFormProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    objective: string;
    profilePicture?: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const PersonalInfoForm = ({ data, onUpdate, onNext }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    onUpdate({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          profilePicture: base64String,
        }));
        onUpdate({ ...formData, profilePicture: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={formData.profilePicture} />
          <AvatarFallback className="bg-muted">
            {formData.fullName?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="mt-4">
          <label htmlFor="profile-picture" className="cursor-pointer">
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Upload className="w-4 h-4" />
              Upload Photo
            </div>
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="fullName" className="form-input-label">
          Full Name
        </label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="form-input-label">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="form-input-label">
          Phone
        </label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (123) 456-7890"
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="form-input-label">
          Location
        </label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City, Country"
          required
        />
      </div>

      <div>
        <label htmlFor="objective" className="form-input-label">
          Professional Objective
        </label>
        <Textarea
          id="objective"
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          placeholder="Brief description of your career goals..."
          required
          className="h-32"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
