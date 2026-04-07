/**
 * Tests for app/api/health/route.ts
 */

jest.mock('@/sanity/lib/client', () => ({
  client: {
    fetch: jest.fn(),
  },
}));

// Dynamic import to avoid Request initialization issues
let GET: any;
let mockClient: any;

beforeAll(async () => {
  const healthModule = await import('@/app/api/health/route');
  GET = healthModule.GET;
  const { client } = await import('@/sanity/lib/client');
  mockClient = client;
});

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with status=ok when Sanity is accessible', async () => {
    mockClient.fetch.mockResolvedValueOnce('project_id_123');

    const res = await GET();
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.status).toBe('ok');
    expect(data.timestamp).toBeDefined();
  });

  it('should return 503 with status=error when Sanity fetch fails', async () => {
    mockClient.fetch.mockRejectedValueOnce(new Error('Network error'));

    const res = await GET();
    expect(res.status).toBe(503);

    const data = await res.json();
    expect(data.status).toBe('error');
    expect(data.message).toBeDefined();
    expect(data.timestamp).toBeDefined();
  });

  it('should call Sanity client with correct query', async () => {
    mockClient.fetch.mockResolvedValueOnce('project_id_123');

    await GET();

    expect(mockClient.fetch).toHaveBeenCalledWith('*[_type == "project"][0]._id');
  });
});
