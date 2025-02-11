
import { useState, useEffect } from "react";
import StepIndicator from "./StepIndicator";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import ResumePreview from "./ResumePreview";
import { generatePDF } from "@/utils/pdfGenerator";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { getLocationFromIP } from "@/utils/geolocation";

export type ResumeData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    objective: string;
    profilePicture?: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    graduationYear: string;
    achievements: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
  }>;
  skills: Array<{
    name: string;
    level: number;
  }>;
  projects: Array<{
    name: string;
    description: string;
    link: string;
  }>;
};

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    objective: "",
    profilePicture: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getLocationFromIP();
        if (location) {
          setResumeData(prev => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              location
            }
          }));
          toast({
            title: "Location detected",
            description: `Your location has been automatically set to: ${location}`,
          });
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        toast({
          title: "Location detection failed",
          description: "Could not automatically detect your location",
          variant: "destructive",
        });
      }
    };

    fetchLocation();
  }, []);

  const steps = [
    "Personal Info",
    "Education",
    "Experience",
    "Skills",
    "Projects",
  ];

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      await generatePDF('resume-preview');
      toast({
        title: "Success",
        description: "PDF generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onUpdate={(data) => updateResumeData("personalInfo", data)}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onUpdate={(data) => updateResumeData("education", data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onUpdate={(data) => updateResumeData("experience", data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <SkillsForm
            data={resumeData.skills}
            onUpdate={(data) => updateResumeData("skills", data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <ProjectsForm
            data={resumeData.projects}
            onUpdate={(data) => updateResumeData("projects", data)}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-down">
          <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
          <p className="text-muted-foreground">
            Create your professional resume in minutes
          </p>
        </div>

        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          className="mb-12"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="animate-fade-up">
            <div className="glass-card rounded-xl p-6">{renderForm()}</div>
          </div>
          <div className="animate-fade-up">
            <div id="resume-preview">
              <ResumePreview data={resumeData} />
            </div>
            <div className="mt-4">
              <Button 
                onClick={handleDownloadPDF}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
