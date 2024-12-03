import React from 'react';
import { Label } from "@/components/ui/label";

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Professional'];

const SkillLevel = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <Label>Skill Level</Label>
      <div className="flex items-center space-x-4">
        {SKILL_LEVELS.map((level) => (
          <div key={level} className="flex items-center space-x-2">
            <input 
              type="radio"
              id={level} 
              name="skillLevel"
              value={level}
              checked={formData.skillLevel === level}
              onChange={onChange}
              className="form-radio text-blue-600 h-4 w-4"
            />
            <Label htmlFor={level}>{level}</Label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillLevel;