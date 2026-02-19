import { describe, it, expect } from 'vitest';

export const formatName = (fullName: string) => {
  if (!fullName) return '';
  const parts = fullName.split(' ');
  return parts.length > 2 
    ? `${parts[1]}, ${parts[0]}, (${parts[2]})`
    : `${parts[1]}, ${parts[0]}`;
};

describe("formatName", () => {
  it("works", () => {
    expect(formatName("John Doe")).toBe("Doe, John");
  });
});