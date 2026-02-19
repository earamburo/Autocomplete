import { describe, it, expect } from 'vitest';

describe("formatName", () => {
  const formatName = (fullName: string) => {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    const firstName = parts[0];
    const lastName = parts[1];
    const suffix = parts[2];
    return suffix ? `${lastName}, ${firstName}, (${suffix})` : `${lastName}, ${firstName}`;
  };

  it("formats two-part name", () => {
    expect(formatName("John Doe")).toBe("Doe, John");
  });

  it("formats three-part name with suffix", () => {
    expect(formatName("John Doe Jr")).toBe("Doe, John, (Jr)");
  });
});