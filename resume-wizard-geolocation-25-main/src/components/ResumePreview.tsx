
import { ResumeData } from "./ResumeBuilder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface ResumePreviewProps {
  data: ResumeData;
}

const Template1 = ({ data }: ResumePreviewProps) => (
  <div className="space-y-6">
    {/* Personal Info */}
    <div className="text-center">
      <Avatar className="w-20 h-20 mx-auto mb-4">
        <AvatarImage src={data.personalInfo.profilePicture} />
        <AvatarFallback className="bg-muted">
          {data.personalInfo.fullName?.charAt(0) || "?"}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold">{data.personalInfo.fullName}</h2>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>{data.personalInfo.email}</p>
        <p>{data.personalInfo.phone}</p>
        <p>{data.personalInfo.location}</p>
      </div>
      {data.personalInfo.objective && (
        <p className="mt-4 text-sm">{data.personalInfo.objective}</p>
      )}
    </div>

    {/* Sections */}
    <div className="space-y-6">
      {data.experience.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="font-medium">{exp.position}</div>
              <div className="text-sm text-muted-foreground">
                {exp.company} | {exp.startDate} - {exp.endDate}
              </div>
              {exp.responsibilities && (
                <div className="text-sm mt-1">{exp.responsibilities}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="font-medium">{edu.degree}</div>
              <div className="text-sm text-muted-foreground">
                {edu.institution} - {edu.graduationYear}
              </div>
              {edu.achievements && (
                <div className="text-sm mt-1">{edu.achievements}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-primary/10 rounded-full text-sm"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Projects</h3>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="font-medium">{project.name}</div>
              <div className="text-sm mt-1">{project.description}</div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Template2 = ({ data }: ResumePreviewProps) => (
  <div className="grid grid-cols-3 gap-6">
    {/* Left Column */}
    <div className="col-span-1 bg-muted/30 p-4 rounded-lg">
      <div className="text-center mb-6">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={data.personalInfo.profilePicture} />
          <AvatarFallback className="bg-muted">
            {data.personalInfo.fullName?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{data.personalInfo.fullName}</h2>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      {data.skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-primary/10 rounded-full text-sm"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Right Column */}
    <div className="col-span-2 space-y-6">
      {data.personalInfo.objective && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
          <p className="text-sm">{data.personalInfo.objective}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="font-medium">{exp.position}</div>
              <div className="text-sm text-muted-foreground">
                {exp.company} | {exp.startDate} - {exp.endDate}
              </div>
              {exp.responsibilities && (
                <div className="text-sm mt-1">{exp.responsibilities}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Projects</h3>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="font-medium">{project.name}</div>
              <div className="text-sm mt-1">{project.description}</div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-3">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="font-medium">{edu.degree}</div>
              <div className="text-sm text-muted-foreground">
                {edu.institution} - {edu.graduationYear}
              </div>
              {edu.achievements && (
                <div className="text-sm mt-1">{edu.achievements}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Template3 = ({ data }: ResumePreviewProps) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center gap-6 pb-6 border-b">
      <Avatar className="w-32 h-32">
        <AvatarImage src={data.personalInfo.profilePicture} />
        <AvatarFallback className="bg-muted">
          {data.personalInfo.fullName?.charAt(0) || "?"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h2>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
        {data.personalInfo.objective && (
          <p className="mt-4 text-sm">{data.personalInfo.objective}</p>
        )}
      </div>
    </div>

    {/* Main Content */}
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-8">
        {data.experience.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Professional Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="font-medium text-lg">{exp.position}</div>
                  <div className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div className="text-primary font-medium mb-2">{exp.company}</div>
                {exp.responsibilities && (
                  <div className="text-sm">{exp.responsibilities}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="font-medium text-lg">{edu.degree}</div>
                <div className="text-primary font-medium">
                  {edu.institution} - {edu.graduationYear}
                </div>
                {edu.achievements && (
                  <div className="text-sm mt-2">{edu.achievements}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
            <div className="grid grid-cols-2 gap-3">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-3 bg-primary/5 rounded-lg text-sm font-medium"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Notable Projects</h3>
            {data.projects.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="font-medium text-lg mb-2">{project.name}</div>
                <div className="text-sm mb-2">{project.description}</div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-block"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const [template, setTemplate] = useState<"1" | "2" | "3">("1");

  const renderTemplate = () => {
    switch (template) {
      case "1":
        return <Template1 data={data} />;
      case "2":
        return <Template2 data={data} />;
      case "3":
        return <Template3 data={data} />;
      default:
        return <Template1 data={data} />;
    }
  };

  return (
    <div id="resume-preview" className="glass-card rounded-xl p-6 sticky top-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resume Preview</h2>
        <Select
          value={template}
          onValueChange={(value) => setTemplate(value as "1" | "2" | "3")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Simple Layout</SelectItem>
            <SelectItem value="2">Two Column</SelectItem>
            <SelectItem value="3">Comprehensive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
