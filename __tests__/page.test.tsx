/**
 * Tests for app/page.tsx (Home Server Component)
 * Tests the Sanity data fetching and error fallback behavior
 */

jest.mock('@/sanity/lib/client', () => ({
  client: {
    fetch: jest.fn(),
  },
}));

// Mock child components to simplify testing
jest.mock('@/components/Nav', () => {
  return function MockNav() {
    return <div data-testid="nav">Nav</div>;
  };
});

jest.mock('@/components/Hero', () => {
  return function MockHero() {
    return <div data-testid="hero">Hero</div>;
  };
});

jest.mock('@/components/About', () => {
  return function MockAbout() {
    return <div data-testid="about">About</div>;
  };
});

jest.mock('@/components/Skills', () => {
  return function MockSkills() {
    return <div data-testid="skills">Skills</div>;
  };
});

jest.mock('@/components/Projects', () => {
  return function MockProjects() {
    return <div data-testid="projects">Projects</div>;
  };
});

jest.mock('@/components/Experience', () => {
  return function MockExperience() {
    return <div data-testid="experience">Experience</div>;
  };
});

jest.mock('@/components/Patents', () => {
  return function MockPatents() {
    return <div data-testid="patents">Patents</div>;
  };
});

jest.mock('@/components/Contact', () => {
  return function MockContact() {
    return <div data-testid="contact">Contact</div>;
  };
});

jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

import Home from '@/app/page';
import { client } from '@/sanity/lib/client';

const mockClient = client as jest.Mocked<typeof client>;

describe('app/page.tsx (Home)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without error when all Sanity queries succeed', async () => {
    mockClient.fetch.mockResolvedValue([]);

    // Server components are async functions, call them directly
    const element = await Home();

    // If it doesn't throw, the test passes
    // We can't use traditional render for Server Components, but rendering without throwing is the key test
    expect(element).toBeTruthy();
  });

  it('should handle Sanity fetch failure gracefully (no crash)', async () => {
    // Mock all five fetch calls to fail
    mockClient.fetch.mockRejectedValue(new Error('Sanity connection failed'));

    // Should not throw
    const element = await Home();
    expect(element).toBeTruthy();
  });

  it('should render main element', async () => {
    mockClient.fetch.mockResolvedValue([]);

    const element = await Home();

    // Check that the main structure is present
    const mainElement = (element as any).props.children[1]; // main is second child
    expect(mainElement).toBeTruthy();
  });

  it('should call client.fetch with correct queries', async () => {
    mockClient.fetch.mockResolvedValue([]);

    await Home();

    expect(mockClient.fetch).toHaveBeenCalledWith(
      '*[_type == "project"] | order(order asc)[0...50]'
    );
    expect(mockClient.fetch).toHaveBeenCalledWith(
      '*[_type == "experience"] | order(order asc)[0...50]'
    );
    expect(mockClient.fetch).toHaveBeenCalledWith(
      '*[_type == "patent"] | order(order asc)[0...50]'
    );
    expect(mockClient.fetch).toHaveBeenCalledWith('*[_type == "skill"] | order(order asc)[0...50]');
    expect(mockClient.fetch).toHaveBeenCalledWith('*[_type == "about"][0]');
  });

  it('should fetch at most 50 items per collection query (pagination safety)', async () => {
    mockClient.fetch.mockResolvedValue([]);

    await Home();

    // Verify that collection queries include the [0...50] limit
    // Note: about query fetches [0] only (single item), so exclude it
    const callArgs = mockClient.fetch.mock.calls;
    callArgs.forEach((args) => {
      const query = args[0] as string;
      if (query.includes('| order')) {
        expect(query).toMatch(/\[0\.\.\.50\]/);
      }
    });
  });
});
