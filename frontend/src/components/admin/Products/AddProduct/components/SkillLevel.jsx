import React from 'react';
import { Label } from "@/components/ui/label";

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Professional'];

const ACTIVE_COLORS = {
  Beginner: 'bg-green-500 text-white',
  Intermediate: 'bg-yellow-500 text-white',
  Professional: 'bg-red-500 text-white',
};

const DEFAULT_COLOR = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';

const SkillLevel = ({ formData, onChange }) => {
  return (
    <section className="space-y-6">
      <Label className="text-lg font-semibold">Skill Level</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SKILL_LEVELS.map((level) => (
          <label
            key={level}
            htmlFor={level}
            className={`flex items-center justify-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              formData.skillLevel === level
                ? ACTIVE_COLORS[level]
                : DEFAULT_COLOR
            }`}
          >
            <input
              type="radio"
              id={level}
              name="skillLevel"
              value={level}
              checked={formData.skillLevel === level}
              onChange={onChange}
              className="hidden"
            />
            <span className="text-sm font-medium">{level}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default SkillLevel;
